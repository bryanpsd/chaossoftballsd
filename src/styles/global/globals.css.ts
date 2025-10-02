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

// Apply base font to all elements to override reset
globalStyle("*", {
	fontFamily: fontFamily.base,
});

globalStyle("body", {
	color: "#000000",
	margin: 0,
	fontSize: 16,
});

globalStyle(".sr-only", {
	position: "absolute",
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0,0,0,0)",
	border: 0,
});
