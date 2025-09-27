import { style } from "@vanilla-extract/css";
import { tokens } from "../../styles/tokens/designTokens.css";

export const mainNavList = style([
	tokens({
		display: { "xs-min": "none", "lg-min": "flex" },
		height: "col-12",
	}),
	{
		gap: 8,
	},
]);

export const mainNavItem = style([
	tokens({
		display: "flex",
		verticalAlign: "middle",
		position: "relative",
	}),
	{
		alignItems: "center",
		border: "none",
	},
]);
