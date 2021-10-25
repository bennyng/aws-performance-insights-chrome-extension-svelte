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
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
