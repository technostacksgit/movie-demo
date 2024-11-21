import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				'bottom-pattern': "url('/assets/images/wave.png')",
			},
			fontFamily: {
				sans: ['var(--font-montserrat)', 'Arial', 'Helvetica', 'sans-serif']
			},
			colors: {
				foreground: 'var(--foreground)',
				'text-primary-foreground': 'var(--foreground)',
				background: 'var(--background)',
				primary: {
					DEFAULT: 'var(--primary)',
					foreground: 'hsl(var(--primary-foreground))'
				},
				error: 'var(--error)',
				input: 'var(--input)',
				card: {
					DEFAULT: 'var(--card)',
					foreground: 'hsl(var(--card-foreground))',
					hover: 'var(--card-hover)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			spacing: {
				2: '2px',
				4: '4px',
				8: '8px',
				12: '12px',
				16: '16px',
				24: '24px',
				32: '32px',
				40: '40px',
				48: '48px',
				64: '64px',
				80: '80px',
				120: '120px',
				160: '160px',
			},
			fontSize: {
				'input': '14px',
				'base': '16px',
			  },
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
