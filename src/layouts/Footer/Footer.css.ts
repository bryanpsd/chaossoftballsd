import { style } from "@vanilla-extract/css";
import { contentPadding, pageMaxWidth } from "../../styles/common.css";
import { tokens } from "../../styles/designTokens.css";
import { fontFamily } from "../../styles/typography";

export const footerWrapper = style([
	tokens({
		display: "flex",
		justifyContent: "center",
		width: "col-12",
		marginBottom: 32,
	}),

	contentPadding,
	pageMaxWidth,
]);

export const footerCopyright = style({
	fontFamily: fontFamily.base + " !important",
});
