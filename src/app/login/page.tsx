"use client";
import InputComponent from "@/components/form/input";
import React, { useState } from "react";
import { Checkbox } from "flowbite-react";
import AppButton from "@/components/form/button";
import { validateEmail } from "@/helpers";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginScreen: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorState, setErrorState] = useState({
        email: "",
        password: "",
    });
    function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name as "email" | "password";
        setFormData({ ...formData, [name]: event.target.value });
        setErrorState({ ...errorState, [name]: "" });
    }

    async function handleFormSubmit() {
        const { email, password } = formData;
        const newErrorState: Partial<typeof errorState> = {};
        if (!email || !validateEmail(email)) {
            newErrorState.email = "Please enter a valid email";
        }
        if (password.length < 6) {
            newErrorState.password =
                "Password must be at-least 6 characters long";
        }
        if (Object.keys(newErrorState).length === 0) {
            const resp = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (resp?.ok) {
                router.push("/");
            }
        } else {
            setErrorState({ ...errorState, ...newErrorState });
        }
    }

    return (
        <div className="flex justify-center items-center my-auto">
            <div className="min-w-[300px] flex flex-col items-center justify-center gap-2">
                <h1 className="text-white text-h1 mb-4 font-semibold">
                    Sign In
                </h1>
                <InputComponent
                    value={formData.email}
                    name="email"
                    placeholder="Email"
                    onChange={handleFormChange}
                    error={errorState.email}
                />
                <InputComponent
                    placeholder="Password"
                    value={formData.password}
                    name="password"
                    type="password"
                    onChange={handleFormChange}
                    error={errorState.password}
                />
                <div className="flex gap-2 justify-center items-center">
                    <Checkbox
                        className="focus:ring-inputColor text-inputColor outline-none ring-0 focus:ring-0 ring-offset-0"
                        id="rememberMe"
                    />
                    <label
                        htmlFor="rememberMe"
                        className="text-white text-bodySmall">
                        Remember Me
                    </label>
                </div>
                <AppButton onClick={handleFormSubmit} className="mt-4">
                    Login
                </AppButton>
            </div>
        </div>
    );
};

export default LoginScreen;
