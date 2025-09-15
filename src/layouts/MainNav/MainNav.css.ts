import { style } from "@vanilla-extract/css";
import { color } from "../../styles/colors";
import { tokens } from "../../styles/designTokens.css";

export const navLink = style([
	tokens({}),
	{
		background: color.brand.purple,
		border: "none",
		color: color.brand.white,
		padding: "0.5em 1em",
		borderRadius: "6px",
		textDecoration: "none",
	},
]);
