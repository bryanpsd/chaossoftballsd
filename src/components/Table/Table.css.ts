import { style } from "@vanilla-extract/css";
import { color } from "../../styles/tokens/colors";
import { tokens } from "../../styles/tokens/designTokens.css";
import { fontSize } from "../../styles/tokens/typography";

export const table = style([
	tokens({
		width: "col-12",
		marginBottom: 10,
	}),
	{
		fontSize: fontSize.sizeFont4,
		tableLayout: "auto",
	},
]);

export const thead = style({
	color: color.brand.white,
	backgroundColor: color.brand.purple,
	fontWeight: 600,
});

export const th = style([
	tokens({
		paddingY: 8,
		paddingX: 4,
		textAlign: "left",
	}),
	{
		selectors: {
			"&:nth-child(2)": {
				textAlign: "center",
			},
		},
	},
]);

export const tr = style({
	borderBottom: `1px solid ${color.tableBorder}`,
	selectors: {
		"&:hover": {
			backgroundColor: color.brand.gray,
		},
	},
});

export const td = style([
	tokens({
		paddingY: 8,
		paddingX: 4,
		textAlign: "center",
	}),
	{
		borderLeft: `1px solid ${color.tableBorder}`,
	},
]);

export const tfoot = style({
	color: color.brand.white,
	backgroundColor: color.brand.purple,
	fontWeight: 600,
});
