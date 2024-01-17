"use client";
import React, { useEffect, useState } from "react";
interface Props {
    message?: string;
    time?: number;
    setMessage?: React.Dispatch<React.SetStateAction<string>>;
}
const Alert: React.FC<Props> = ({
    message,
    time = 2000,
    setMessage = () => {},
}) => {
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        if (message) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                setMessage("");
            }, time);
        }
    }, [message]);
    return (
        <div
            className={`p-4 mb-4 text-sm text-white rounded-lg bg-red-500   fixed top-2 left-1/2 -translate-x-1/2 ${
                !showAlert && "hidden"
            }`}
            role="alert">
            {message}
        </div>
    );
};

export default Alert;
