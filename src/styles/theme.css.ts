import { createGlobalTheme } from "@vanilla-extract/css";
import { breakpoints } from "./breakpoints";
import { color } from "./colors";
import { duration } from "./duration";
import { space } from "./spacing";
import { fontFamily, fontSize, fontWeight, lineHeight } from "./typography";

import "./globals.css";

export const vars = createGlobalTheme(":root", {
	color,
	fontFamily,
	fontSize,
	lineHeight,
	fontWeight,
	breakpoints,
	space,
	duration,
});
