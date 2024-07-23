import preprocess from 'svelte-preprocess';
// import adapter from '@sveltejs/adapter-node'
// import adapter from '@sveltejs/adapter-static';
import adapter from 'amplify-adapter';


import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex'
import { createHighlighter } from 'shiki'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await createHighlighter({
				themes: ['poimandres'],
				langs: ['javascript', 'typescript', 'sh']
			})
			await highlighter.loadLanguage('javascript', 'typescript')
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'poimandres' }))
			return `{@html \`${html}\` }`
		}
	},
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex(mdsvexOptions),
		preprocess({
			// postcss make use of tailwind
			// we ensure it get processed, see postcss.config.cjs
			postcss: true,
		}),
	],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			// alias for web-config
			'web-config': './src/web-config.json',
			// to do : remove
			'mailgun-config': './src/mailgun-config.json',
		},
		// to do: should we ignore ?
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
			  console.log(path, referrer, message)
			},
			handleMissingId: 'ignore',
		},
	}
};

export default config;
