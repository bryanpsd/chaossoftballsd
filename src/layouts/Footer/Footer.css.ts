import { style } from "@vanilla-extract/css";
import { color } from "../../styles/tokens/colors";
import { tokens } from "../../styles/tokens/designTokens.css";
import { fontFamily } from "../../styles/tokens/typography";
import {
	contentPadding,
	pageMaxWidth,
} from "../../styles/utilities/common.css";

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
