import type { Config } from 'tailwindcss'
import type { PluginUtils } from "tailwindcss/types/config";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: ({ theme }: PluginUtils) => ({
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
        primary: "#9c0e0e",
        primaryDark: "#7d0b0b",
        secondary: "#c27803",
        secondaryDark: "#9f580a",
        textPrimary: "#030712",
        success: "#22c55e",
        successDark: "#228B22",
        error: "#e02424",
        appBg: "#f9fafc",
        appBgDark: "#f9faf9",
      }),
      backgroundColor: ({ theme }: PluginUtils) => ({
        primary: theme("colors.primary"),
        secondary: theme("colors.secondary"),
        success: theme("colors.success"),
        error: theme("colors.error"),
      }),
      borderColor: ({ theme }: PluginUtils) => ({
        primary: theme("colors.primary"),
        secondary: theme("colors.secondary"),
        success: theme("colors.success"),
        error: theme("colors.error"),
      }),
      fontFamily: ({ theme }: PluginUtils) => ({
        montserrat: ["Montserrat", "sans-serif"],
      }),
    },
  },
  plugins: [require("flowbite/plugin")],
}
export default config
