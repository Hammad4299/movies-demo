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
        primary: "#2bd17e",
        success: "#22c55e",
        successDark: "#228B22",
        error: "#eb5757",
        appBg: "#093545",
        appBg2: "#224957", // input color
        cardColor: "#092c39"
      }),
      backgroundColor: ({ theme }: PluginUtils) => ({
        primary: theme("colors.appBg"),
        secondary: theme("colors.appBg2"),
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
