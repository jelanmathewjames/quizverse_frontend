/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {
      animation:{
        blob:" blob 7s infinite"
      },
      keyframes:{
        blob:{
          "0%":{transform:" translate(0px,0px) scale(1)"},
          "33%":{transform:"translate(30px,-50px) scale(1.1)"},
          "66%":{transform:" translate(-20px,20px)scale(0.9)"},
          "100%":{transform:" translate(0px,0px) scale(1)"}
        }
      }
    },
  },
  plugins:  [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
}
