import { createGlobalTheme } from "@vanilla-extract/css";
import { breakpoints } from "../tokens/breakpoints";
import { color } from "../tokens/colors";
import { space } from "../tokens/spacing";
import { fontFamily, fontSize, fontWeight, lineHeight } from "../tokens/typography";
import { border } from "../utilities/borders";
import { duration } from "../utilities/duration";

import "./globals.css";

export const vars = createGlobalTheme(":root", {
	color,
	fontFamily,
	fontSize,
	lineHeight,
	fontWeight,
	breakpoints,
	border,
	space,
	duration,
});
