import { style } from "@vanilla-extract/css";
import { color } from "../../styles/tokens/colors";
import { tokens } from "../../styles/tokens/designTokens.css";

export const mobileNav = style([
	tokens({
		display: { "xs-min": "block", "lg-min": "none" },
	}),
]);

export const mobileNavBackdrop = style([
	tokens({
		position: "fixed",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	}),
	{
		height: "100vh",
		width: "80vw",
		maxWidth: 320,
		zIndex: 1099,
		color: color.brand.white,
		background: color.brand.purple,
		top: 0,
		right: 0,
		transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
	},
]);

export const mobileNavOverlay = style([
	tokens({
		position: "fixed",
	}),
	{
		zIndex: 1098,
		inset: 0,
		transition: "background 0.3s",
	},
]);

export const mobileNavHamburgerWrapper = style([
	tokens({
		position: "absolute",
		cursor: "pointer",
	}),
	{
		top: 20,
		right: 20,
	},
]);

export const mobileNavList = style([
	tokens({
		padding: 0,
		margin: 0,
	}),
]);

export const mobileNavListItem = style([
	tokens({
		marginX: 0,
		marginY: 16,
	}),
]);

export const mobileNavLink = style([
	tokens({
		fontSize: 24,
		display: "flex",
		alignItems: "center",
		gap: 8,
	}),
	{
		color: color.brand.white,
	},
]);
