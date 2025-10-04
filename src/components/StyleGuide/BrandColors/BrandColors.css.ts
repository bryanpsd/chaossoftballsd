import { style } from "@vanilla-extract/css";
import { color } from "../../../styles/tokens/colors";
import { tokens } from "../../../styles/tokens/designTokens.css";

export const palette = style([
	tokens({
		display: "flex",
		flexWrap: "wrap",
		gap: 32,
		marginY: 32,
	}),
	{
		justifyContent: "flex-start",
		alignItems: "flex-start",
		rowGap: 32,
		columnGap: 32,
	},
]);

export const swatch = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		minWidth: 80,
	}),
]);

export const colorBox = style([
	tokens({
		width: 48,
		height: 48,
		borderRadius: "round",
		marginBottom: 8,
	}),
	{
		border: `2px solid ${color.grayscale.gray200}`,
		boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
	},
]);

export const label = style([
	tokens({
		textAlign: "center",
		fontSize: 14,
		display: "flex",
		gap: 4,
	}),
	{
		color: color.grayscale.gray800,
	},
]);
