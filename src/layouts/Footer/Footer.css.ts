import { style } from "@vanilla-extract/css";
import { color } from "../../styles/colors";
import { contentPadding, pageMaxWidth } from "../../styles/common.css";
import { tokens } from "../../styles/designTokens.css";
import { fontFamily } from "../../styles/typography";

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
	contentPadding,
	pageMaxWidth,
]);

export const footerNav = style({
	display: "flex",
	gap: 8,
	fontSize: "16px",
});

export const footerNavLink = style({
	color: color.brand.purple,
	fontFamily: fontFamily.base,
	textDecoration: "none",
	transition: "color 0.2s",
	selectors: {
		"&:hover, &:focus": {
			textDecoration: "underline",
		},
	},
});

export const footerCopyright = style({
	fontFamily: fontFamily.base,
	textAlign: "center",
	fontSize: "16px",
});
