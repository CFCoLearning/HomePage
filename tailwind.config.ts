import type { Config } from "tailwindcss";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        retro: {
          mint: "#8BA89B",
          sand: "#E2D5C3",
          pink: "#FFB5B5",
          teal: "#9DCDC3",
          sage: "#A8B5A5",
          orange: "#E8A87C", // Added warm orange
          peach: "#FFD4B8", // Added soft peach
        },
        grayscale: {
          50: "hsl(0, 0%, 94.10%)",
          100: "hsl(0, 0%, 90.60%)",
          200: "hsl(0, 0%, 88.20%)",
          300: "hsl(0, 0%, 80.40%)",
          400: "hsl(0, 0%, 68.20%)",
          500: "hsl(0, 0%, 56.90%)",
          600: "hsl(0, 0%, 46.30%)",
          700: "hsl(0, 0%, 36.90%)",
          800: "hsl(0, 0%, 29.40%)",
          900: "hsl(0, 0%, 23.90%)",
          950: "hsl(0, 0%, 13.30%)",
        },
        MutedLavender: {
          50: "hsl(240, 19.70%, 95.00%)",
          100: "hsl(240, 19.70%, 92.00%)",
          200: "hsl(240, 19.70%, 90.33%)",
          300: "hsl(240, 19.70%, 83.15%)",
          400: "hsl(240, 19.70%, 72.97%)",
          500: "hsl(240, 19.70%, 63.14%)",
          600: "hsl(240, 19.70%, 53.84%)",
          700: "hsl(240, 19.70%, 44.00%)",
          800: "hsl(240, 19.70%, 34.91%)",
          900: "hsl(240, 19.70%, 28.66%)",
          950: "hsl(240, 19.70%, 16.00%)",
        },
        DustyMauve: {
          50: "hsl(300, 19.50%, 94.58%)",
          100: "hsl(300, 19.50%, 91.63%)",
          200: "hsl(300, 19.50%, 89.33%)",
          300: "hsl(300, 19.50%, 82.00%)",
          400: "hsl(300, 19.50%, 70.62%)",
          500: "hsl(300, 19.50%, 59.81%)",
          600: "hsl(300, 19.50%, 49.38%)",
          700: "hsl(300, 19.50%, 39.54%)",
          800: "hsl(300, 19.50%, 31.42%)",
          900: "hsl(300, 19.50%, 25.76%)",
          950: "hsl(300, 19.50%, 14.60%)",
        },
        SoftRosewood: {
          50: "hsl(0, 19.50%, 94.88%)",
          100: "hsl(0, 19.50%, 91.95%)",
          200: "hsl(0, 19.50%, 89.66%)",
          300: "hsl(0, 19.50%, 82.44%)",
          400: "hsl(0, 19.50%, 71.50%)",
          500: "hsl(0, 19.50%, 61.00%)",
          600: "hsl(0, 19.50%, 50.93%)",
          700: "hsl(0, 19.50%, 40.85%)",
          800: "hsl(0, 19.50%, 32.39%)",
          900: "hsl(0, 19.50%, 26.74%)",
          950: "hsl(0, 19.50%, 14.93%)",
        },
        OliveGray: {
          50: "hsl(60, 19.40%, 92.94%)",
          100: "hsl(60, 19.40%, 89.00%)",
          200: "hsl(60, 19.40%, 86.13%)",
          300: "hsl(60, 19.40%, 76.51%)",
          400: "hsl(60, 19.40%, 62.00%)",
          500: "hsl(60, 19.40%, 48.77%)",
          600: "hsl(60, 19.40%, 39.57%)",
          700: "hsl(60, 19.40%, 31.38%)",
          800: "hsl(60, 19.40%, 25.12%)",
          900: "hsl(60, 19.40%, 20.67%)",
          950: "hsl(60, 19.40%, 11.65%)",
        },
        MutedSage: {
          50: "hsl(120, 19.60%, 93.60%)",
          100: "hsl(120, 19.60%, 90.00%)",
          200: "hsl(120, 19.60%, 87.37%)",
          300: "hsl(120, 19.60%, 78.52%)",
          400: "hsl(120, 19.60%, 65.12%)",
          500: "hsl(120, 19.60%, 51.96%)",
          600: "hsl(120, 19.60%, 42.00%)",
          700: "hsl(120, 19.60%, 33.60%)",
          800: "hsl(120, 19.60%, 26.72%)",
          900: "hsl(120, 19.60%, 22.00%)",
          950: "hsl(120, 19.60%, 12.00%)",
        },
        PaleTeal: {
          50: "hsl(180, 20.00%, 93.38%)",
          100: "hsl(180, 20.00%, 89.70%)",
          200: "hsl(180, 20.00%, 87.00%)",
          300: "hsl(180, 20.00%, 77.94%)",
          400: "hsl(180, 20.00%, 63.97%)",
          500: "hsl(180, 20.00%, 50.73%)",
          600: "hsl(180, 20.00%, 41.00%)",
          700: "hsl(180, 20.00%, 32.59%)",
          800: "hsl(180, 20.00%, 25.98%)",
          900: "hsl(180, 20.00%, 21.40%)",
          950: "hsl(180, 20.00%, 12.00%)",
        },
        CoolPeriwinkle: {
          50: "hsl(240, 20.50%, 95.00%)",
          100: "hsl(240, 20.50%, 92.35%)",
          200: "hsl(240, 20.50%, 90.38%)",
          300: "hsl(240, 20.50%, 83.47%)",
          400: "hsl(240, 20.50%, 73.15%)",
          500: "hsl(240, 20.50%, 63.25%)",
          600: "hsl(240, 20.50%, 53.95%)",
          700: "hsl(240, 20.50%, 44.42%)",
          800: "hsl(240, 20.50%, 35.00%)",
          900: "hsl(240, 20.50%, 29.00%)",
          950: "hsl(240, 20.50%, 16.10%)",
        },
        PaleBlush: {
          50: "hsl(322, 14.30%, 94.49%)",
          100: "hsl(322, 14.30%, 91.53%)",
          200: "hsl(322, 14.30%, 89.00%)",
          300: "hsl(322, 14.30%, 81.85%)",
          400: "hsl(322, 14.30%, 70.44%)",
          500: "hsl(322, 14.30%, 59.50%)",
          600: "hsl(322, 14.30%, 49.00%)",
          700: "hsl(322, 14.30%, 39.28%)",
          800: "hsl(322, 14.30%, 31.16%)",
          900: "hsl(322, 14.30%, 25.56%)",
          950: "hsl(322, 14.30%, 14.41%)",
        },
        SlateBlue: {
          50: "hsl(221, 23.70%, 94.76%)",
          100: "hsl(221, 23.70%, 91.59%)",
          200: "hsl(221, 23.70%, 89.37%)",
          300: "hsl(221, 23.70%, 82.14%)",
          400: "hsl(221, 23.70%, 70.99%)",
          500: "hsl(221, 23.70%, 60.53%)",
          600: "hsl(221, 23.70%, 50.40%)",
          700: "hsl(221, 23.70%, 40.42%)",
          800: "hsl(221, 23.70%, 32.00%)",
          900: "hsl(221, 23.70%, 26.46%)",
          950: "hsl(221, 23.70%, 14.81%)",
        },
        RoyalBlue: {
          50: "hsl(216, 46.70%, 94.79%)",
          100: "hsl(216, 46.70%, 91.93%)",
          200: "hsl(216, 46.70%, 89.77%)",
          300: "hsl(216, 46.70%, 82.70%)",
          400: "hsl(216, 46.70%, 71.84%)",
          500: "hsl(216, 46.70%, 61.10%)",
          600: "hsl(216, 46.70%, 51.00%)",
          700: "hsl(216, 46.70%, 40.87%)",
          800: "hsl(216, 46.70%, 32.65%)",
          900: "hsl(216, 46.70%, 26.85%)",
          950: "hsl(216, 46.70%, 15.00%)",
        },
        DeepCharcoal: {
          50: "hsl(211, 17.00%, 94.34%)",
          100: "hsl(211, 17.00%, 91.00%)",
          200: "hsl(211, 17.00%, 88.77%)",
          300: "hsl(211, 17.00%, 81.08%)",
          400: "hsl(211, 17.00%, 69.33%)",
          500: "hsl(211, 17.00%, 58.00%)",
          600: "hsl(211, 17.00%, 47.42%)",
          700: "hsl(211, 17.00%, 37.70%)",
          800: "hsl(211, 17.00%, 30.00%)",
          900: "hsl(211, 17.00%, 24.64%)",
          950: "hsl(211, 17.00%, 13.93%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 8px)",
        xxs: "calc(var(--radius) - 10px)",
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 10s ease-in-out infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      fontFamily: {
        mono: ["'Space Mono'", "monospace"],
        retro: ["'VT323'", "monospace"],
      },
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.zinc.700"),
            "--tw-prose-headings": theme("colors.zinc.900"),
            "--tw-prose-links": theme("colors.secondary.DEFAULT"),
            "--tw-prose-bold": theme("colors.zinc.900"),
            "--tw-prose-counters": theme("colors.zinc.500"),
            "--tw-prose-bullets": theme("colors.zinc.300"),
            "--tw-prose-hr": theme("colors.zinc.200"),
            "--tw-prose-quotes": theme("colors.zinc.900"),
            "--tw-prose-quote-borders": theme("colors.zinc.200"),
            "--tw-prose-captions": theme("colors.zinc.500"),
            "--tw-prose-code": theme("colors.zinc.900"),
            "--tw-prose-pre-code": theme("colors.zinc.200"),
            "--tw-prose-pre-bg": theme("colors.zinc.800"),
            "--tw-prose-th-borders": theme("colors.zinc.300"),
            "--tw-prose-td-borders": theme("colors.zinc.200"),

            // Base
            maxWidth: "none",
            margin: "0",

            // Headings
            "h1, h2, h3, h4, h5, h6": {
              scrollMarginTop: theme("spacing.20"),
            },

            // Code
            code: {
              borderRadius: theme("borderRadius.md"),
              padding: theme("spacing.1"),
              fontSize: theme("fontSize.sm")[0],
              fontWeight: "400",
              "&::before": {
                content: "none",
              },
              "&::after": {
                content: "none",
              },
            },
            pre: {
              borderRadius: theme("borderRadius.md"),
              border: "1px solid",
              borderColor: "var(--tw-prose-td-borders)",
              backgroundColor: "var(--tw-prose-pre-bg)",
              padding: theme("spacing.4"),
              overflow: "auto",
            },

            // Lists
            "ul > li": {
              paddingLeft: "0",
              "&::marker": {
                color: "var(--tw-prose-bullets)",
              },
            },

            // Tables
            table: {
              width: "100%",
              marginTop: theme("spacing.6"),
              marginBottom: theme("spacing.6"),
              borderCollapse: "collapse",
              overflow: "auto",
              display: "block",
            },
            thead: {
              borderBottomWidth: "1px",
              borderBottomColor: "var(--tw-prose-th-borders)",
              backgroundColor: theme("colors.zinc.50"),
              position: "sticky",
              top: "0",
            },
            th: {
              color: "var(--tw-prose-headings)",
              fontWeight: theme("fontWeight.medium"),
              textAlign: "left",
              padding: theme("spacing.3"),
              backgroundColor: theme("colors.zinc.50"),
              whiteSpace: "nowrap",
              borderRight: "1px solid var(--tw-prose-td-borders)",
              "&:last-child": {
                borderRight: "none",
              },
            },
            td: {
              padding: theme("spacing.3"),
              borderBottom: "1px solid var(--tw-prose-td-borders)",
              borderRight: "1px solid var(--tw-prose-td-borders)",
              whiteSpace: "nowrap",
              "&:last-child": {
                borderRight: "none",
              },
            },
            "tr:last-child td": {
              borderBottom: "none",
            },
          },
        },
        // Dark mode overrides
        invert: {
          css: {
            "--tw-prose-body": theme("colors.zinc.300"),
            "--tw-prose-headings": theme("colors.zinc.200"),
            // "--tw-prose-links": theme("colors.secondary.light"),
            "--tw-prose-bold": theme("colors.zinc.200"),
            "--tw-prose-counters": theme("colors.zinc.400"),
            "--tw-prose-bullets": theme("colors.zinc.600"),
            "--tw-prose-hr": theme("colors.zinc.700"),
            "--tw-prose-quotes": theme("colors.zinc.200"),
            "--tw-prose-quote-borders": theme("colors.zinc.700"),
            "--tw-prose-captions": theme("colors.zinc.400"),
            "--tw-prose-code": theme("colors.zinc.200"),
            "--tw-prose-pre-code": theme("colors.zinc.200"),
            "--tw-prose-pre-bg": theme("colors.zinc.900"),
            "--tw-prose-th-borders": theme("colors.zinc.700"),
            "--tw-prose-td-borders": theme("colors.zinc.800"),
          },
        },
      }),
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    addVariablesForColors,
  ],
} satisfies Config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
