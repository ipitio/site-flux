import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import node from '@astrojs/node';
import icon from "astro-icon";

function raiseWatcherListenerLimit() {
    return {
        configureServer(server) {
            server.watcher.setMaxListeners(30);
        },
        name: "raise-watcher-listener-limit",
    };
}

export default defineConfig({
    site: 'https://fluxaz.org',
    integrations: [svelte(), tailwind(), sitemap(), icon()],
    output: 'server',
    adapter: node({
        mode: 'standalone',
    }),
    vite: {
        plugins: [raiseWatcherListenerLimit()],
    },
});
