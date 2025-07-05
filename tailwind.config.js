/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins"],
      },
      colors: {
        primary: "#6B46C1",
        secondary: "#2D3748",
        tertiary: "#E2E8F0",
        background: "#F7FAFC",
        white: "#FFFFFF",
        success: "#38A169",
        error: "#E53E3E",
        "amarillo-sazon": "#f3c332",
        "negro-sazon": "#0a0a0a",
        "amarillo-favoritos": "#FFD314",
      },
      backgroundImage: {
        frontImage:
          "url(https://images.pexels.com/photos/8844888/pexels-photo-8844888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
