/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", 'Georgia', 'serif'],
        sans:    ["'Plus Jakarta Sans'", 'system-ui', 'sans-serif'],
      },
      colors: {
        primary:     '#C4622A',
        'primary-light': '#E8845A',
        gold:        '#C49A2A',
        background:  '#FAF7F2',
        foreground:  '#1A1714',
        card:        '#FFFFFF',
        muted:       '#F0E8DF',
        'muted-foreground': '#8A7868',
        border:      '#E5D6C8',
        secondary:   '#6B5A4A',
        accent:      '#F5EDE3',
        warm:        '#FAF7F2',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'warm-sm': '0 1px 3px 0 rgb(60 30 10 / 0.08), 0 1px 2px -1px rgb(60 30 10 / 0.05)',
        'warm':    '0 4px 16px 0 rgb(60 30 10 / 0.10), 0 2px 6px -2px rgb(60 30 10 / 0.06)',
        'warm-lg': '0 10px 40px 0 rgb(60 30 10 / 0.14), 0 4px 16px -4px rgb(60 30 10 / 0.08)',
        'warm-xl': '0 20px 60px 0 rgb(60 30 10 / 0.18)',
      },
    },
  },
  plugins: [],
}
