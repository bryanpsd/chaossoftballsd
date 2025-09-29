import { style } from "@vanilla-extract/css";
import { color } from "../../styles/tokens/colors";
import { tokens } from "../../styles/tokens/designTokens.css";

export const hero = style([
	tokens({
		position: "relative",
		width: "col-12",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		gap: 8,
		overflow: "hidden",
		textAlign: "center",
		marginBottom: 24,
		justifyContent: "center",
	}),
	{
		minHeight: "60vh",
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
	},
]);

export const background = style([
	tokens({
		position: "absolute",
		width: "col-12",
		height: "col-12",
	}),
	{
		top: 0,
		left: 0,
		objectFit: "cover",
		zIndex: -1,
		pointerEvents: "none",
		userSelect: "none",
	},
]);

export const heroContainer = style([
	tokens({
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		gap: 4,
		textAlign: "center",
		width: "col-12",
		position: "relative",
	}),
	{
		zIndex: 2,
	},
]);

export const heroHeading = style({
	color: color.brand.white,
	fontFamily: '"Anton", sans-serif',
});

export const heroSVG = style([
	tokens({
		position: "absolute",
		flexDirection: "column",
		justifyContent: "flex-end",
		alignItems: "center",
		display: "flex",
		width: "col-12",
		height: "col-12",
	}),
	{
		left: 0,
		bottom: 0,
		zIndex: 1,
	},
]);

export const heroCTAWrapper = style([
	tokens({
		position: "absolute",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	}),
	{
		zIndex: 2,
		bottom: 10,
		left: "50%",
		transform: "translateX(-50%)",
		width: "max-content",
	},
]);

export const heroHeadingSmall = style({
	flex: 1,
	textAlign: "left",
	color: color.brand.white,
});

export const heroButton = style({
	margin: "0 auto",
});
