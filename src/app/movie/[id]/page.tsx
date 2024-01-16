import AppButton from "@/components/form/button";
import CreateEditMovie from "@/components/views/CreateEditMovie";
import { myFnSingle } from "@/temp-methods/my-fn";
import Link from "next/link";
import React from "react";

export const EditMoviePage: React.FC = async () => {
    const data = await myFnSingle(1);

    if (!data) {
        return (
            <div className="flex items-center justify-center flex-col">
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
