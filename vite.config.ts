import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Unfonts from 'unplugin-fonts/vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
    plugins: [
        sveltekit(),
        Unfonts({
            google: {
                families: ['Lato', 'Material+Icons']
            }
        }),
        Icons({
            compiler: 'svelte'
        })
    ]
});
