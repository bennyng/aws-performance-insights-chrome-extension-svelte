module.exports = {
	mode: 'jit',
	purge: {
		content: ['./src/**/*.svelte']
	},
	theme: {
		extend: {
			colors: {
				awesome: {
					DEFAULT: '#459cf8'
				}
			},
			spacing: {
				100: '22rem'
			},
			minWidth: {
				100: '12rem'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [require('@tailwindcss/forms')]
};
