import { style } from "@vanilla-extract/css";
import { color } from "../../styles/tokens/colors";
import { tokens } from "../../styles/tokens/designTokens.css";

export const body = style([
	{
		maxWidth: "none",
		marginBottom: "1.5em",
		lineHeight: 1.3,
	},
]);

export const heading = style({
	marginBottom: "18px",
});

export const hr = style({
	marginBottom: "18px",
});

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

export const blockquote = style({
	borderLeft: "4px solid #e0e0e0",
	background: "#fafafa",
	padding: "12px 20px",
	margin: "18px 0",
	fontStyle: "italic",
	color: "#444",
});

export const blockquoteParagraph = style({
	marginBottom: 0,
});
