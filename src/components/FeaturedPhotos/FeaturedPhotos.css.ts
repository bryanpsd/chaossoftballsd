import { style } from "@vanilla-extract/css";
import { color } from "../../styles/tokens/colors";
import { tokens } from "../../styles/tokens/designTokens.css";

export const featuredPhotos = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		gap: 4,
		marginBottom: 16,
	}),
]);

export const featuredPhotosRow = style({
	columns: 1,
	columnGap: "1rem",
	"@media": {
		"screen and (min-width: 600px)": {
			columns: 2,
		},
		"screen and (min-width: 900px)": {
			columns: 3,
		},
		"screen and (min-width: 1200px)": {
			columns: 4,
		},
	},
});

export const featuredPhotosItem = style({
	breakInside: "avoid",
	marginBottom: "1rem",
	background: "#fff",
	borderRadius: 8,
	overflow: "hidden",
	boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
	textAlign: "center",
	display: "block",
});

export const featuredPhotosImg = style({
	width: "100%",
	height: "auto",
	maxWidth: "100%",
	display: "block",
	objectFit: "cover",
});

// ...existing code...

export const featuredPhotosFigcaption = style({
	fontSize: "0.95rem",
	color: "#555",
	padding: "0.5rem",
});

export const featuredPhotosLinksWrapper = style([
	tokens({
		display: "flex",
		justifyContent: "space-between",
		flexDirection: { "xs-min": "column", "md-min": "row" },
		gap: 4,
	}),
]);

export const featuredPhotosLink = style({
	color: color.brand.purple,
});
