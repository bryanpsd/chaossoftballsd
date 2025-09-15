import { style } from "@vanilla-extract/css";
import { color } from "../../styles/colors";

export const accordionRoot = style({
	width: "100%",
});

export const accordionItem = style({
	borderBottom: `1px solid ${color.brand.gray}`,
	width: "100%",
	selectors: {
		"&:last-child": {
			borderBottom: "none",
		},
	},
});

export const accordionTrigger = style({
	background: color.brand.black,
	color: color.brand.white,
	fontWeight: 600,
	fontSize: 18,
	padding: "12px 16px",
	border: "none",
	cursor: "pointer",
	width: "100%",
	textAlign: "left",
	transition: "background 0.2s, color 0.2s",
});

export const accordionContent = style({
	background: color.brand.gray,
	color: color.brand.black,
	padding: "16px",
	borderRadius: "0 0 8px 8px",
	fontSize: 16,
});
