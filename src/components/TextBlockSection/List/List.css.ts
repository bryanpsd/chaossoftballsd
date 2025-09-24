import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "../../../styles/tokens/designTokens.css";

export const list = recipe({
	base: [
		tokens({
			fontSize: "inherit",
			marginTop: 24,
			paddingLeft: 20,
			marginBottom: 24,
		}),
		{
			listStyleType: "disc",
			":first-child": {
				marginTop: 0,
			},
		},
	],
	variants: {
		ordered: {
			true: {
				listStyleType: "decimal",
			},
		},
	},
});

export const listItem = style({
	selectors: {
		"&:not(:first-child)": {
			marginTop: 10,
		},
	},
});

globalStyle(`${listItem} p`, {
	marginBottom: 0,
});
