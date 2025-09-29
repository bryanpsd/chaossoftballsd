import { style } from "@vanilla-extract/css";
import { color } from "../../styles/tokens/colors";
import { tokens } from "../../styles/tokens/designTokens.css";

export const galleryWrapper = style([
	tokens({
		width: "col-12",
		paddingY: 10,
		paddingX: 0,
	}),
	{
		columnCount: 3,
		columnGap: "1.5rem",
		"@media": {
			"(max-width: 900px)": { columnCount: 2 },
			"(max-width: 600px)": { columnCount: 1 },
		},
	},
]);

export const galleryItem = style([
	tokens({
		overflow: "hidden",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	}),
	{
		borderRadius: "8px",
		marginBottom: "1.5rem",
		breakInside: "avoid",
	},
]);

export const buttonWrapper = style([
	tokens({
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	}),
	{
		gap: "1rem",
		margin: "2rem 0",
	},
]);

export const video = style([
	tokens({
		width: "col-12",
	}),
]);

export const loading = style([
	tokens({
		textAlign: "center",
		display: "flex",
		alignItems: "center",
		gap: 12,
		justifyContent: "center",
		paddingY: 32,
	}),
	{
		color: color.brand.purple,
		fontSize: "2rem",
	},
]);

export const empty = style([
	tokens({
		textAlign: "center",
		paddingY: 32,
	}),
	{
		color: color.brand.gray,
		fontSize: "1.2rem",
	},
]);

export const fadeIn = style({
	opacity: 1,
	transition: "opacity 0.25s",
});

export const fadeOut = style({
	opacity: 0,
	transition: "opacity 0.25s",
});
