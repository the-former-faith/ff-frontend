import adapter from '@sveltejs/adapter-netlify'

const config = {
	// options passed to svelte.compile (https://svelte.dev/docs#svelte_compile)
	//compilerOptions: null,

	// an array of file extensions that should be treated as Svelte components
	extensions: ['.svelte'],

	kit: {
		adapter:  adapter(),
		amp: false,
		//appDir: '_app',
		files: {
			assets: 'static',
			//lib: 'src/lib',
			routes: 'src/routes',
			serviceWorker: 'src/service-worker',
			template: 'src/app.html'
		},
		serviceWorker: {
			exclude: []
		},
		floc: false,
		//host: null,
		//hostHeader: null,
		hydrate: true,
		paths: {
			assets: '',
			base: ''
		},
		prerender: {
			crawl: true,
			enabled: true,
			pages: ['*']
		},
		router: true,
		//ssr: true,
		//target: null,
		trailingSlash: 'never',
		vite: {
			optimizeDeps: {
				include: ['@sanity/block-content-to-hyperscript/internals','fastq']
			}
		}
	},

	// options passed to svelte.preprocess (https://svelte.dev/docs#svelte_preprocess)
	//preprocess: null
};

export default config;