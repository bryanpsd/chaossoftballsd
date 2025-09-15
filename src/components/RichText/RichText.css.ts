import { style } from "@vanilla-extract/css";
import { tokens } from "../../styles/designTokens.css";

export const body = style([
	{
		fontSize: "18px",
		maxWidth: "none",
		marginBottom: "1.5em",
		lineHeight: 1.3,
	},
	tokens({ marginBottom: "col-6" }),
]);

export const textBlock = style([
	tokens({
		marginX: "auto",
	}),
]);

export const image = style({
	display: "block",
	width: "100%",
	height: "auto",
});
