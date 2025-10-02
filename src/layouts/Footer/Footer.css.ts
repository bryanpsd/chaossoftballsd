import { style } from "@vanilla-extract/css";
import { color } from "../../styles/tokens/colors";
import { tokens } from "../../styles/tokens/designTokens.css";
import { fontFamily, fontSize } from "../../styles/tokens/typography";
import { contentPadding, pageMaxWidth } from "../../styles/utilities/common.css";

export const footerWrapper = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "col-12",
		marginBottom: 32,
		gap: 16,
	}),
	{
		fontFamily: fontFamily.base,
		fontSize: fontSize.sizeFont6,
	},
	contentPadding,
	pageMaxWidth,
]);

export const footerNav = style([
	tokens({
		display: "flex",
		gap: 12,
	}),
]);

export const footerNavLink = style({
	color: color.link,
	textDecoration: "none",
	selectors: {
		"&:hover, &:focus": {
			textDecoration: "underline",
		},
	},
});

export const footerCopyright = style({
	textAlign: "center",
});
