const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          main: "#BE6AE3",
          secondary: "#D8CCF6",
        },
        black: {
          main: "#000",
          off: "#696969",
          faded: "#A998B1",
        },
        white: {
          main: "#fff",
          off: "#E7DCEC",
        },
        green: "#0B4A23",
        gray: "#C3BFBF",
        success: "#60D256",
      },
      fontFamily: {
        Just: ["JUST", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
