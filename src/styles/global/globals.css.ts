import { globalFontFace, globalStyle } from "@vanilla-extract/css";
import { fontFamily } from "../tokens/typography";

globalFontFace(fontFamily.base, {
	sizeAdjust: "105%",
	src: "local(arial)",
});

globalStyle("html", {
	fontSize: 16,
	boxSizing: "border-box",
	WebkitFontSmoothing: "antialiased",
	MozOsxFontSmoothing: "grayscale",
});

globalStyle("strong, b", {
	fontWeight: 700,
});

// Apply base font to all elements to override reset
globalStyle("*", {
	fontFamily: fontFamily.base,
});

globalStyle("body", {
	color: "#000000",
	margin: 0,
	fontSize: "16px",
});

globalStyle(".sr-only", {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: 0,
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0,0,0,0)",
	border: 0,
});
