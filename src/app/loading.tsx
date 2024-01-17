import Image from "next/image";
import React from "react";
import SpinnerImg from "@/../public/img/spinner.svg";

const Loading: React.FC = () => {
    return (
        <div className="h-full w-full fixed top-0 left-0 flex items-center justify-center">
            <Image
                alt="LOADING..."
                width="200"
                height="200"
                src={SpinnerImg}
                className="w-[20vw] h-[20vw] animate-spin"
            />
        </div>
    );
};

export default Loading;
