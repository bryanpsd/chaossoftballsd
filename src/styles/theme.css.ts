import { createGlobalTheme } from "@vanilla-extract/css";
import { breakpoints } from "./breakpoints";
import { color } from "./colors";
import { space } from "./spacing";

import "./globals.css";

export const vars = createGlobalTheme(":root", {
	color,
	breakpoints,
	space,
});
