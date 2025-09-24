import { style } from "@vanilla-extract/css";
import { color } from "../../styles/tokens/colors";
import { tokens } from "../../styles/tokens/designTokens.css";

export const body = style([
	tokens({
		marginBottom: 10,
	}),
]);

export const heading = style([
	tokens({
		marginBottom: 10,
	}),
]);

export const hr = style([
	tokens({
		marginBottom: 10,
	}),
]);

export const italic = style({
	fontStyle: "italic",
});

export const bold = style({
	fontWeight: 600,
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

export const image = style([
	tokens({
		display: "block",
		width: "col-12",
		height: "auto",
	}),
]);

export const blockquote = style([
	tokens({
		display: "block",
		width: "col-12",
		height: "auto",
		paddingX: 20,
		paddingY: 12,
		marginY: 18,
	}),
	{
		borderLeft: `4px solid ${color.brand.purple}`,
		background: color.brand.gray,
		fontStyle: "italic",
	},
]);
