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
		fontSize: "1.5rem",
		boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
	},
]);
