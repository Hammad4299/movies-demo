import { getMovie } from "@/app/actions";
import AppButton from "@/components/form/button";
import CreateEditMovie from "@/components/views/CreateEditMovie";
import Link from "next/link";
import React from "react";
interface Props {
    params: {
        id: string;
    };
}
const EditMoviePage: React.FC<Props> = async ({ params }) => {
    const data = await getMovie(Number(params.id));

    if (!data) {
        return (
            <div className="flex items-center justify-center flex-col absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-center text-h1 font-bold">
                    404 Not Found...
                </h1>
                <div>
                    <Link href="/">
                        <AppButton variant="secondary">
                            Return to home page
                        </AppButton>
                    </Link>
                </div>
            </div>
        );
    }
    return <CreateEditMovie data={data} />;
};

export default EditMoviePage;
