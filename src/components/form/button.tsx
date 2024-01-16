import React, { useMemo } from "react";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}
export const AppButton: React.FC<Props> = ({
    children,
    variant = "primary",
    className,
    ...props
}) => {
    const variantClasses = useMemo(() => {
        if (variant === "primary") {
            return "bg-primary";
        }
        return "bg-transparent border-2 border-white border-solid";
    }, [variant]);
    return (
        <button
            className={`font-bold rounded-[10px] text-white outline-none w-full py-3 px-6 ${variantClasses} ${className}`}
            {...props}>
            {children}
        </button>
    );
};
export default AppButton;
