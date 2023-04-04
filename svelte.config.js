import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: [sveltePreprocess({
        defaults: {
            style: 'postcss'
        },
        postcss: true
    }),
    vitePreprocess()
    ],

    kit: {
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: '200.html'
        })
    }
};

export default config;
