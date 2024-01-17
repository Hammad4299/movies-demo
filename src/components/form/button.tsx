import Image from "next/image";
import React, { useMemo } from "react";
import spinner from "@/../public/img/spinner.svg";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    loading?: boolean;
}
export const AppButton: React.FC<Props> = ({
    children,
    variant = "primary",
    className,
    disabled,
    loading = false,
    ...props
}) => {
    const variantClasses = useMemo(() => {
        let classes = "";
        if (variant === "primary") {
            classes = "bg-primary ";
        } else {
            classes = "bg-transparent border-2 border-white border-solid ";
        }
        if (disabled) {
            classes += " !cursor-not-allowed opacity-60 ";
        }
        if (loading) {
            classes += " bg-opacity-70 !cursor-default ";
        }
        return classes;
    }, [variant, disabled, loading]);
    return (
        <button
            disabled={disabled}
            className={`duration-300 relative font-bold rounded-[10px] text-white outline-none w-full py-3 px-6 ${variantClasses} ${className} `}
            {...props}>
            <span className={loading ? "opacity-0" : ""}>{children}</span>
            <span
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
                    !loading && "hidden"
                }`}>
                <Image
                    className="animate-spin"
                    src={spinner}
                    alt="loading"
                    width="20"
                    height="20"
                />
            </span>
        </button>
    );
};
export default AppButton;
