import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./node_modules/flowbite-react/lib/**/*.js",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: () => ({
                appColor: "#092C39",
                primary: "#2BD17E",
                error: "#EB5757",
                appBg: "#093545",
                appBgDark: "#093545",
                inputColor: "#224957",
            }),

            fontSize: () => ({
                h1: "80px",
                h2: "48px",
                h5: "20px",
                regular: "16px",
                bodySmall: "14px",
            }),
        },
    },
    plugins: [require("flowbite/plugin")],
};
export default config;
