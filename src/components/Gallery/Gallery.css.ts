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

export const galleryItemWrapper = style([
	tokens({
		overflow: "hidden",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	}),
	{
		marginBottom: "1.5rem",
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
	}),
	{
		aspectRatio: "16/9",
		minHeight: "180px",
		background: "#f6f6f6",
		overflow: "hidden",
		width: "100%",
		height: "auto",
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
		minHeight: "180px",
		background: "#f6f6f6",
		overflow: "hidden",
		width: "100%",
		height: "auto",
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

export const lightboxOverlay = style({
	background: "rgba(0,0,0,0.7)",
	position: "fixed",
	inset: 0,
	zIndex: 1000,
	animation: "fadeIn 0.2s",
});

export const lightboxContent = style({
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	background: "#fff",
	borderRadius: 12,
	boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
	zIndex: 1001,
	padding: 0,
	outline: "none",
	maxWidth: "95vw",
	maxHeight: "90vh",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	overflow: "auto",
});

export const lightboxCloseBtn = style({
	position: "absolute",
	top: 12,
	right: 12,
	background: "rgba(0,0,0,0.5)",
	color: "#fff",
	border: "none",
	borderRadius: "50%",
	width: 40,
	height: 40,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	zIndex: 1002,
	transition: "background 0.2s",
	":hover": { background: "rgba(0,0,0,0.7)" },
});

export const lightboxMediaWrapper = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	height: "100%",
	boxSizing: "border-box",
});

export const lightboxMedia = style({
	maxWidth: "90vw",
	maxHeight: "80vh",
	borderRadius: 8,
	boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
	background: "#000",
	marginBottom: 12,
});

export const lightboxCaption = style({
	color: "#222",
	fontSize: "1.1rem",
	marginTop: 8,
	textAlign: "center",
	maxWidth: "90vw",
	wordBreak: "break-word",
});
