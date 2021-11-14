module.exports = {
	mode: 'jit',
	purge: {
		content: ['./src/**/*.svelte']
	},
	theme: {
		extend: {
			colors: {
				awesome: {
					DEFAULT: '#f72585'
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
