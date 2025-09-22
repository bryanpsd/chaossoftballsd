import { style } from "@vanilla-extract/css";
import { color } from "../../styles/tokens/colors";
import { tokens } from "../../styles/tokens/designTokens.css";

export const accordionRoot = style([
	tokens({
		width: "col-12",
	}),
]);

export const accordionItem = style([
	tokens({
		width: "col-12",
	}),
	{
		borderBottom: `1px solid ${color.brand.gray}`,
		selectors: {
			"&:last-child": {
				borderBottom: "none",
			},
		},
	},
]);

export const accordionTrigger = style([
	tokens({
		cursor: "pointer",
		width: "col-12",
		textAlign: "left",
		paddingY: 12,
		paddingX: 16,
		gap: 8,
	}),
	{
		background: color.brand.black,
		color: color.brand.white,
		fontWeight: 600,
		border: "none",
		transition: "background 0.2s, color 0.2s",
	},
]);
export const plusIcon = style({
	selectors: {
		[`${accordionTrigger}[data-state="open"] &`]: { display: "none" },
		[`${accordionTrigger}[data-state="closed"] &`]: { display: "inline" },
	},
});

export const minusIcon = style({
	selectors: {
		[`${accordionTrigger}[data-state="open"] &`]: { display: "inline" },
		[`${accordionTrigger}[data-state="closed"] &`]: { display: "none" },
	},
});

export const accordionIcon = style({
	display: "flex",
	alignItems: "center",
	marginLeft: "0.5em",
	minWidth: "18px",
	minHeight: "18px",
	width: "18px",
	height: "18px",
});

export const accordionContent = style([
	tokens({
		padding: 16,
	}),
	{
		background: color.brand.gray,
		color: color.brand.black,
	},
]);
