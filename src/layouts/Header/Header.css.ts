import { style } from "@vanilla-extract/css";
import { tokens } from "../../styles/tokens/designTokens.css";
import {
	contentPadding,
	pageMaxWidth,
} from "../../styles/utilities/common.css";

export const headerWrapper = style([
	tokens({
		display: "flex",
		justifyContent: "center",
		width: "col-12",
	}),
	{
		height: 90,
		backgroundColor: "white",
	},
]);

export const header = style([
	tokens({
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		position: "relative",
		width: "col-12",
		flexDirection: "row",
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
