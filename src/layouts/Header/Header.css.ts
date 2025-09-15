import { style } from "@vanilla-extract/css";
import { contentPadding, pageMaxWidth } from "../../styles/common.css";
import { tokens } from "../../styles/designTokens.css";

export const headerWrapper = style([
	tokens({
		display: "flex",
		justifyContent: "center",
		width: "col-12",
	}),
	{
		height: 84,
	},
]);

export const header = style([
	tokens({
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		position: "relative",
		width: "col-12",
	}),
	pageMaxWidth,
	contentPadding,
]);

export const logoWrapper = style([
	tokens({
		display: "flex",
	}),
]);

export const mainContentJumpLink = style({
	selectors: {
		".sr-only&:focus": {
			height: "auto",
			width: "auto",
			overflow: "visible",
			clip: "unset",
			position: "static",
		},
	},
});
