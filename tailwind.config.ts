import type { Config } from "tailwindcss";
import type { PluginUtils } from "tailwindcss/types/config";

const config: Config = {
    content: [
        "./node_modules/flowbite-react/lib/**/*.js",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: () => ({
                appColor: {
                    100: "#ebcfcf",
                    200: "#d79f9f",
                    300: "#c46e6e",
                    400: "#b03e3e",
                    500: "#9c0e0e",
                    600: "#7d0b0b",
                    700: "#5e0808",
                    800: "#3e0606",
                    900: "#1f0303",
                },
                primary: "#2BD17E",
                primaryDark: "#7d0b0b",
                secondary: "#c27803",
                secondaryDark: "#9f580a",
                textPrimary: "#030712",
                success: "#22c55e",
                successDark: "#228B22",
                error: "#EB5757",
                appBg: "#093545",
                appBgDark: "#093545",
                inputColor: "#224957",
            }),
            backgroundColor: ({ theme }) => ({
                primary: theme("colors.primary"),
                secondary: theme("colors.secondary"),
                success: theme("colors.success"),
                error: theme("colors.error"),
            }),
            borderColor: ({ theme }) => ({
                primary: theme("colors.primary"),
                secondary: theme("colors.secondary"),
                success: theme("colors.success"),
                error: theme("colors.error"),
            }),
            fontFamily: () => ({
                montserrat: ["Montserrat", "sans-serif"],
            }),
            fontSize: () => ({
                h1: "80px",
                h2: "48px",
                regular: "14px",
            }),
        },
    },
    plugins: [require("flowbite/plugin")],
};
export default config;
