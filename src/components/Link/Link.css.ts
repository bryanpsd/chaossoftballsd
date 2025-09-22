import { style } from "@vanilla-extract/css";
import { color } from "../../styles/tokens/colors";
import { tokens } from "../../styles/tokens/designTokens.css";

export const link = style([
	tokens({ textDecoration: "none" }),
	{
		":hover": {
			textDecoration: "underline",
		},
	},
]);

export const jumpLink = style([
	tokens({ textDecoration: "underline", cursor: "pointer" }),
	{
		color: color.brand.purple,
	},
]);
