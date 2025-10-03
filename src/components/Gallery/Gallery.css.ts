import { style } from "@vanilla-extract/css";
import { color } from "../../styles/tokens/colors";
import { tokens } from "../../styles/tokens/designTokens.css";

export const galleryWrapper = style([
	tokens({
		width: "col-12",
		paddingY: 10,
		paddingX: 0,
		display: "block",
	}),
	{
		columnCount: 3,
		columnGap: "1.5rem",
		"@media": {
			"(max-width: 1280px)": { columnCount: 3 },
			"(max-width: 1024px)": { columnCount: 2 },
			"(max-width: 768px)": { columnCount: 1 },
		},
	},
]);

export const galleryItemWrapper = style([
	tokens({
		overflow: "hidden",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginBottom: 15,
	}),
	{
		breakInside: "avoid",
	},
]);

export const galleryItemLandscape = style([
	tokens({
		maxWidth: "col-12",
		position: "relative",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "auto",
	}),
	{
		aspectRatio: "16/9",
		minHeight: 180,
		background: color.surface.secondary,
		overflow: "hidden",
		width: "100%",
		borderRadius: 8,
	},
]);

export const galleryItemPortrait = style([
	tokens({
		maxWidth: "col-12",
		position: "relative",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	}),
	{
		aspectRatio: "3/4",
		minHeight: 180,
		background: color.surface.secondary,
		overflow: "hidden",
		width: "100%",
		height: "auto",
		borderRadius: 8,
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

export const videoLoaded = style({
	opacity: 1,
	transition: "opacity 0.4s",
	pointerEvents: "auto",
	width: "100%",
	height: "100%",
	objectFit: "cover",
	display: "block",
});

export const videoNotLoaded = style({
	opacity: 0,
	transition: "opacity 0.4s",
	pointerEvents: "auto",
	width: "100%",
	height: "100%",
	objectFit: "cover",
	display: "block",
});
export const galleryImageLoaded = style({
	opacity: 1,
	transition: "opacity 0.4s",
	pointerEvents: "auto",
	width: "100%",
	height: "100%",
	objectFit: "cover",
	display: "block",
});
export const galleryImageNotLoaded = style({
	opacity: 0,
	transition: "opacity 0.4s",
	pointerEvents: "auto",
	width: "100%",
	height: "100%",
	objectFit: "cover",
	display: "block",
});

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
