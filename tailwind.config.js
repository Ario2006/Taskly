/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'status-working': '#F0BC36',
          'status-done': '#66BB44',
          'status-stuck': '#0070F3',
          'status-review': '#38bdf8',
        },
      },
    }, // if Magic UI depends on animation
  };