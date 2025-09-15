import { style } from "@vanilla-extract/css";
import { color } from "../../styles/colors";
import { tokens } from "../../styles/designTokens.css";

export const mainNavList = style([
	tokens({
		display: "flex",
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

export const navLink = style([
	tokens({}),
	{
		background: color.brand.purple,
		border: "none",
		color: color.brand.white,
		padding: "0.5em 1em",
		borderRadius: "6px",
		textDecoration: "none",
		fontFamily:
			'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
		transition: "background 0.2s, color 0.2s",
		selectors: {
			"&:hover, &:focus": {
				background: "#2d1457",
			},
		},
	},
]);
