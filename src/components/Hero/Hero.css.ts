import { globalStyle, style } from "@vanilla-extract/css";

export const hero = style({
	position: "relative",
	width: "100%",
	display: "flex",
	alignItems: "center",
	flexDirection: "column",
	justifyContent: "center",
	padding: 16,
	minHeight: "60vh",
	overflow: "hidden",
	textAlign: "center",
	marginBottom: 24,
	selectors: {
		"&#hero::before": {
			content: "''",
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			background: "black",
			opacity: 0.7,
			zIndex: 0,
			pointerEvents: "none",
		},
	},
});

globalStyle(`#hero > *:not(#background)`, {
	position: "relative",
	zIndex: 1,
});

export const background = style({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	objectFit: "cover",
	zIndex: -1,
	pointerEvents: "none",
	userSelect: "none",
});

export const heroContainer = style({
	display: "flex",
	alignItems: "center",
	flexDirection: "column",
	justifyContent: "center",
	textAlign: "center",
});

globalStyle(`#faqs`, {
	marginTop: "2rem",
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
});
