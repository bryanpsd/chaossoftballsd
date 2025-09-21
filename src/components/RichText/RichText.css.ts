import { style } from "@vanilla-extract/css";
import { color } from "../../styles/tokens/colors";
import { tokens } from "../../styles/tokens/designTokens.css";

export const body = style([
	{
		fontSize: "16px",
		maxWidth: "none",
		marginBottom: "1.5em",
		lineHeight: 1.3,
	},
	tokens({ marginBottom: "col-6" }),
]);

export const italic = style({
	fontStyle: "italic",
});

export const bold = style({
	fontWeight: "bold",
});

export const textBlock = style([
	tokens({
		marginX: "auto",
	}),
]);

export const link = style({
	color: color.brand.purple,
	textDecoration: "underline",
	textUnderlineOffset: "2px",
});

export const image = style({
	display: "block",
	width: "100%",
	height: "auto",
});
