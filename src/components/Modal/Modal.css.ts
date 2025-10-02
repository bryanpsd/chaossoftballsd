import { style } from "@vanilla-extract/css";
import { tokens } from "../../styles/tokens/designTokens.css";

export const ModalOverlay = style({
	background: "rgba(0,0,0,0.7)",
	position: "fixed",
	inset: 0,
	zIndex: 1000,
	animation: "fadeIn 0.2s",
});

export const ModalContent = style([
	tokens({
		position: "fixed",
	}),
	{
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		background: "transparent",
		borderRadius: 12,
		boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
		zIndex: 1001,
		padding: 0,
		outline: "none",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		overflow: "auto",
		width: "90%",
		maxWidth: "100vw",
		"@media": {
			"(min-width: 728px)": {
				maxWidth: 900,
			},
		},
		maxHeight: "90vh",
	},
]);

export const ModalCloseBtn = style({
	position: "absolute",
	top: 12,
	right: 12,
	background: "rgba(0,0,0,0.5)",
	color: "#fff",
	border: "none",
	borderRadius: "50%",
	width: 40,
	height: 40,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	zIndex: 1002,
	transition: "background 0.2s",
	":hover": { background: "rgba(0,0,0,0.7)" },
});

export const ModalMediaWrapper = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	height: "100%",
	boxSizing: "border-box",
});

export const ModalMedia = style({
	borderRadius: 8,
	boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
	background: "#000",
	display: "block",
	width: "100%",
	height: "auto",
	maxWidth: "100%",
	maxHeight: "80vh",
});

export const ModalCaption = style({
	color: "#222",
	fontSize: "1.1rem",
	marginTop: 8,
	textAlign: "center",
	wordBreak: "break-word",
});
