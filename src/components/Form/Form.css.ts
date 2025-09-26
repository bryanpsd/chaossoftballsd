import { style } from "@vanilla-extract/css";
import { color } from "../../styles/tokens/colors";
import { tokens } from "../../styles/tokens/designTokens.css";

export const formWrapper = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		width: { "xs-min": "col-12", "md-min": "col-8" },
		gap: 16,
	}),
]);

export const formField = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		width: "col-12",
		gap: 6,
		boxSizing: "border-box",
		flexWrap: "wrap",
	}),
]);

export const label = style([
	tokens({
		fontWeight: "fontWeight700",
	}),
]);

export const inputWrapper = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		width: "col-12",
		boxSizing: "border-box",
	}),
]);

export const input = style([
	tokens({
		padding: 10,
		outline: "none",
		borderRadius: "xxl",
	}),
	{
		border: "1px solid #ccc",
		transition: "border-color 0.2s",
		boxSizing: "border-box",
		selectors: {
			"&:focus": {
				borderColor: color.brand.purple,
			},
			"&.valid": {
				borderColor: color.brand.green,
			},
			"&.invalid": {
				borderColor: color.brand.red,
			},
		},
	},
]);

export const textarea = style([
	tokens({
		padding: 10,
		minHeight: 80,
		outline: "none",
		borderRadius: "xxl",
	}),
	{
		border: "1px solid #ccc",
		transition: "border-color 0.2s",
		selectors: {
			"&:focus": {
				borderColor: color.brand.purple,
			},
			"&.valid": {
				borderColor: color.brand.green,
			},
			"&.invalid": {
				borderColor: color.brand.red,
			},
		},
	},
]);

export const submitButton = style([
	tokens({
		paddingX: 20,
	}),
]);

export const error = style({
	color: color.brand.red,
});
