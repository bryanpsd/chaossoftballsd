import { style } from "@vanilla-extract/css";
import { color } from "../../styles/tokens/colors";
import { tokens } from "../../styles/tokens/designTokens.css";
import { contentPadding } from "../../styles/utilities/common.css";

export const bannerWrapper = style([
	tokens({
		paddingTop: 12,
		paddingBottom: 12,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 16,
	}),
	contentPadding,
	{
		color: color.brand.white,
		backgroundColor: color.brand.purple,
	},
]);

export const bannerLink = style({
	color: color.brand.white,
	textDecoration: "underline !important",
});
