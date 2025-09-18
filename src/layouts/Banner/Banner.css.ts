import { style } from "@vanilla-extract/css";
import { color } from "../../styles/colors";
import { contentPadding } from "../../styles/common.css";

export const bannerWrapper = style([
	contentPadding,
	{
		paddingTop: 24,
		paddingBottom: 24,
		backgroundColor: color.brand.purple,
		color: color.brand.white,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 16,
	},
]);

export const bannerLink = style({
	color: color.brand.white,
	textDecoration: "underline !important",
});
