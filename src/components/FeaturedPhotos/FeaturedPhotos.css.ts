import { style } from "@vanilla-extract/css";

export const featuredPhotos = style({
	margin: "2rem 0",
});

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
	borderRadius: "8px",
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
