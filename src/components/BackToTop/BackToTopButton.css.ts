import { style } from "@vanilla-extract/css";
import { tokens } from "../../styles/tokens/designTokens.css";

export const backToTopButton = style([
	tokens({
		position: "fixed",
		borderRadius: "round",
		width: 32,
		height: 32,
	}),
	{
		bottom: "2rem",
		right: "2rem",
		zIndex: 1000,
	},
]);

export const backToTopButtonIcon = style([
	tokens({
		display: "block",
	}),
]);
