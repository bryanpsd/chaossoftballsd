// @ts-check

import netlify from "@astrojs/netlify";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "astro/config";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
	site: "https://chaossoftballsd.netlify.app",
	output: "server",
	integrations: [
		react(),
		partytown({ config: { forward: ["dataLayer.push"] } }),
		sitemap(),
		robotsTxt(),
	],
	adapter: netlify(),
	devToolbar: {
		enabled: false,
	},
	vite: {
		plugins: [vanillaExtractPlugin()],
	},
});
