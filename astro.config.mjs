import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import node from '@astrojs/node';
import icon from "astro-icon";

export default defineConfig({
    site: 'https://fluxaz.org',
    integrations: [svelte(), tailwind(), mdx(), icon()],
    output: 'server',
    adapter: node({
        mode: 'standalone',
    }),
});
