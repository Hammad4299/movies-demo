import React from "react";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}
export const InputComponent: React.FC<Props> = ({
    className,
    error,
    ...props
}) => {
    return (
        <div className="w-full ">
            <input
                className={`mb-1 text-white rounded-[10px] px-3 py-2 bg-inputColor text-bodySmall font-normal w-full border-inputColor placeholder-[rgba(255,255,255,0.8)] focus:bg-white focus:text-inputColor focus:placeholder-inputColor focus:border-inputColor border-solid border-[2px] duration-300 ${
                    error && `!border-error !text-error !placeholder-error`
                } ${className} ${
                    props.type == "password" && "font-['Verdana'] tracking-wide"
                }`}
                {...props}
            />
            <div className={`px-2 h-4 w-full text-[12px] text-error`}>
                {error}
            </div>
        </div>
    );
};

export default InputComponent;
