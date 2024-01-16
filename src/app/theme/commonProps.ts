import { FlowbiteTextInputColors } from "flowbite-react";

export type CommonPropsClassKeys =
    | "bgPrimary"
    | "bgSecondary"
    | "bgSuccess"
    | "bgError"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "light"
    | "dark"
    | "sm"
    | "md"
    | "lg";

export type AppVariant =
    | "primary"
    | "secondary"
    | "success"
    | "failure"
    | "white";
export type ThemeVariant = "light" | "dark";

export type AppSize = "sm" | "md" | "lg";

export type AppColor =
    | "primary"
    | "secondary"
    | "success"
    | "successDark"
    | "failure"
    | "light"
    | "dark"
    | keyof FlowbiteTextInputColors;

export type AppBg = "primary" | "secondary" | "success" | "danger";
