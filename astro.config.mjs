import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
	site: "https://chaossoftballsd.org",
	output: "server",
	adapter: netlify(),
	integrations: [
		react(),
		sitemap(),
		robotsTxt(),
		icon(),
	],
	vite: {
		plugins: [vanillaExtractPlugin()],
	},
});
