import { style } from "@vanilla-extract/css";
import { tokens } from "../tokens/designTokens.css";

export const mainWrapper = style([
	tokens({
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "center",
		width: "col-12",
	}),
	{
		height: "100%",
		marginBottom: "2rem",
	},
]);

export const pageMaxWidth = style([
	tokens({ width: "col-12", marginLeft: "auto", marginRight: "auto" }),
	{
		maxWidth: 1280,
	},
]);

export const contentPadding = style([
	tokens({
		paddingX: { "xs-min": 16, "md-min": 24, "lg-min": 48 },
		display: "flex",
		gap: 16,
	}),
]);

export const section = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		gap: 16,
		marginBottom: 12,
	}),
	pageMaxWidth,
	contentPadding,
]);

export const subPageWrapper = style([
	tokens({
		marginY: 12,
		display: "flex",
		flexDirection: "column",
		gap: 8,
	}),
	pageMaxWidth,
	contentPadding,
]);

export const image = style({
	maxWidth: "100%",
	height: "auto",
	display: "block",
});
