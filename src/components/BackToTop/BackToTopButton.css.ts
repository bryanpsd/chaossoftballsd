import { style } from "@vanilla-extract/css";

export const backToTopButton = style([
	{
		position: "fixed",
		bottom: "2rem",
		right: "2rem",
		zIndex: 1000,
		borderRadius: "50%",
		width: "48px",
		height: "48px",
		minWidth: "48px",
		padding: 0,
		fontSize: "1.5rem",
		boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
	},
]);
