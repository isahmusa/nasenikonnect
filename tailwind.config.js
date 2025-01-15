/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
		
  	}
  },
  plugins: [require("tailwindcss-animate")],

  
};

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Add this to ensure your classes are recognized
	theme: {
	  extend: {
		colors: {
		  'navy-blue': '#001f3f', // Define the navy blue color
		},
		animation: {
		  'fade-in': 'fadeIn 1s ease-out forwards', // Add forwards to persist opacity
		  'background-fade': 'bgFade 2s ease-in-out forwards',
		},
		keyframes: {
		  fadeIn: {
			'0%': { opacity: 0 },
			'100%': { opacity: 1 },
		  },
		  bgFade: {
			'0%': { backgroundColor: 'transparent' },
			'100%': { backgroundColor: '#001f54' },
		  },
		},
	  },
	},
	plugins: [],
  };
  
