/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        jacarta: "#3A345B",          // deep purple
        queenPink: "#F3C8DD",        // soft pink
        middlePurple: "#D183A9",
        oldLavender: "#71557A",
        brownChocolate: "#4B1535",
      },
    },
  },
  plugins: [],
};
