/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"], // Updated to include all .ejs files in the views folder
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        redBlack: {
          // Custom theme name
          primary: "#ff0000", // Red
          secondary: "#000000", // Black
          accent: "#a3a3a3", // Light gray accent
          neutral: "#1f1f1f", // Darker gray for neutral backgrounds
          "base-100": "#000000", // Black as base background color
          "base-200": "#2c2c2c", // Slightly lighter gray for card backgrounds
          "base-content": "#ffffff", // White text color for readability
          info: "#ff4d4d", // Light red for info
          success: "#4caf50", // Green for success
          warning: "#ff9800", // Orange for warnings
          error: "#f44336", // Dark red for errors
        },
      },
    ],
  },
};
