/** @type {import('tailwindcss').Config} */

const stripUnit = (value) => parseInt(value, 10);
const media = (resolution, mobileFirst = true) => {
  if (mobileFirst) {
    return `@media (min-width: ${stripUnit(resolution)}px)`;
  }

  return `@media (max-width: ${stripUnit(resolution) - 1}px)`;
};

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        xs: "375px",
        sm: "520px",
        md: "768px",
        lg: "1024px",
        laptop: "1280px",
        xl: "1366px",
        "2xl": "1440px",
        fhd: "1920px",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.5" }],
        lg: ["1.125rem", { lineHeight: "1.5" }],
        xl: ["1.5rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.625rem", { lineHeight: "1.5" }],
        "3xl": ["2rem", { lineHeight: "1.5" }],
        "4xl": ["2.5rem", { lineHeight: "1.3" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
      },
      colors: {
        yellow: "#FFBB56",
        purple: "#8D65FF",
        green: "#45E3BE",
        blue: {
          100: "#ACAAC0",
          200: "#2FBDEA",
          DEFAULT: "#1F2B48",
        },
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        gray: {
          100: "#FFFDF5",
          DEFAULT: "#C9C5D3",
        },
      },
      fontFamily: {
        primary: ["Work Sans", "sans-serif"],
        secondary: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [
    ({ addComponents, theme, addBase }) => {
      addBase({
        html: {
          marginTop: "0 !important",
          scrollBehavior: "initial",
          overscrollBehavior: "none",

          [media(theme("screens.2xl"))]: {
            fontSize: `${1600 / stripUnit(theme("screens.2xl"))}vw`,
          },
        },

        "html, body": {
          width: "100vw",
          overflowX: "hidden",
        },

        body: {
          color: theme("colors.gray"),
          backgroundColor: theme("colors.white"),
          fontFamily: theme("fontFamily.primary"),
          fontWeight: theme("fontWeight.normal"),
          "-webkit-font-smoothing": "antialiased",
        },
      });

      addComponents({
        ".bars-block": {
          transition: "opacity 0.3s ease-out, transform 0.5s ease-in-out",
          opacity: 0,
          transform: "translateY(10%)",

          "&.is-loaded": {
            opacity: 1,
            transform: "none",
          },
        },

        "[data-animated-bar]": {
          picture: {
            position: "relative",

            [media(theme("screens.laptop"))]: {
              transform: `translateY(var(--offset)) translateY(calc(var(--progress) * var(--offset) * -1))`,
            },
          },

          "[data-bar-rect]": {
            transition: "opacity 0.5s ease-in-out",
          },

          ".group:hover &": {
            "[data-floating-label]": {
              "&.is-active": {
                opacity: 1,
              },
            },

            "[data-bar-rect]": {
              opacity: 0.3,

              "&.is-active": {
                opacity: 1,
              },
            },
          },
        },
      });
    },
  ],
  experimental: {
    optimizeUniversalDefaults: true,
  },
};
