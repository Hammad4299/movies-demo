"use client";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import InputComponent from "../form/input";
import AppButton from "../form/button";
import { Movie, MovieCreatePayload } from "@/models";
import { validateMoviePayload } from "@/helpers";
import { useRouter } from "next/navigation";
import { addMovie, updateMovie } from "@/app/actions";

interface Props {
    data?: Movie;
}

export const CreateEditMovie: React.FC<Props> = ({ data }) => {
    const [movieData, setFormData] = useState<MovieCreatePayload | Movie>(
        data || {
            poster: "",
            title: "",
            year: NaN,
        }
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const [image, setImage] = useState<File | null>(null);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (movieData.poster) {
            try {
                URL.revokeObjectURL(movieData.poster);
                setFormData({ ...movieData, poster: "" });
            } catch (e) {
                console.error(e);
            }
        }
        if (file) {
            setImage(file);
            const url = URL.createObjectURL(file);
            setFormData({ ...movieData, poster: url });
        }
    }
    function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name as keyof MovieCreatePayload;
        let value = event.target.value;
        if (name === "year") {
            if (value.length > 4) {
                value = value.substring(0, 4);
            }
        }
        setFormData({ ...movieData, [name]: value });
    }

    const isFormValid = useMemo(
        () => validateMoviePayload(movieData),
        [movieData]
    );

    const submitForm = async () => {
        const formData = new FormData();
        formData.append("title", movieData.title);
        formData.append("year", movieData.year.toString());
        if (image) {
            formData.append("file", image);
        }
        setIsSubmitting(true);
        if ("id" in movieData) {
            formData.append("id", movieData.id.toString());
            const res = await updateMovie(formData);
        } else {
            await addMovie(formData);
        }
        setIsSubmitting(false);

        router.push("/?refresh=true");
    };
    function handleFileDrop(e: React.DragEvent<HTMLLabelElement>) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (movieData.poster) {
            try {
                URL.revokeObjectURL(movieData.poster);
                setFormData({ ...movieData, poster: "" });
            } catch (e) {
                console.error(e);
            }
        }
        if (file) {
            setImage(file);
            const url = URL.createObjectURL(file);
            setFormData({ ...movieData, poster: url });
        }
    }
    return (
        <div className="pt-20 p-6 md:p-0 container mx-auto">
            <h2 className="text-h2 font-semibold mb-12">
                {data ? "Edit" : "Create a new movie"}
            </h2>
            <div className="md:grid flex flex-col-reverse md:grid-cols-2 grid-cols-1 items-center md:gap-8">
                <div className="md:hidden flex gap-4 w-full mt-6">
                    <AppButton
                        onClick={() => router.push("/")}
                        variant="secondary"
                        className="grow">
                        Cancel
                    </AppButton>
                    <AppButton
                        onClick={() => submitForm()}
                        loading={isSubmitting}
                        disabled={!isFormValid}
                        className="grow">
                        Submit
                    </AppButton>
                </div>
                <label
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    htmlFor="file-input"
                    style={{ aspectRatio: "1/1" }}
                    className="border-2 w-full lg:w-3/4 border-white cursor-pointer border-dotted bg-inputColor rounded-[10px] flex items-center justify-center flex-col">
                    <input
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                        id="file-input"
                        type="file"
                    />
                    {movieData.poster ? (
                        <React.Fragment>
                            <img
                                src={movieData.poster}
                                style={{ aspectRatio: "1/1" }}
                                alt="Img here"
                                className="min-h-full min-w-full object-cover rounded-[10px]"
                            />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Image
                                src="/img/download.png"
                                alt="download-img"
                                width="20"
                                height="20"
                            />
                            <p className="text-bodySmall font-normal">
                                Drop an image here
                            </p>
                        </React.Fragment>
                    )}
                </label>
                <div className="h-full w-full">
                    <div className="md:mb-8">
                        <InputComponent
                            name="title"
                            className="lg:!w-[50%] "
                            placeholder="Title"
                            value={movieData.title}
                            onChange={handleFormChange}
                        />
                        <InputComponent
                            name="year"
                            className="md:!w-[50%] lg:!w-[30%]"
                            placeholder="Publishing year"
                            type="number"
                            value={movieData.year}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="hidden md:flex gap-4 w-[60%]">
                        <AppButton
                            onClick={() => router.push("/")}
                            variant="secondary">
                            Cancel
                        </AppButton>
                        <AppButton
                            onClick={() => submitForm()}
                            loading={isSubmitting}
                            disabled={!isFormValid}>
                            Submit
                        </AppButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEditMovie;
