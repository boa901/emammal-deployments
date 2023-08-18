/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './next/app/**/*.{js,ts,jsx,tsx,mdx}',
    './next/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './next/modules/**/components/*.{js,ts,jsx,tsx,mdx}',
    './next/modules/**/utils/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [import('flowbite/plugin')],
};
