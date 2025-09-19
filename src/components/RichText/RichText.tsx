import type { Options } from "@contentful/rich-text-react-renderer";

import type { Document } from "@contentful/rich-text-types";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

import { ResponsiveHeadline } from "../../components/ResponsiveHeadline";
import { TextBlockSection } from "../../components/TextBlockSection";
import { List } from "../../components/TextBlockSection/List";
import type { TypographyProps } from "../../components/Typography";
import { Typography } from "../../components/Typography";

import * as styles from "./RichText.css";

const BODY_TYPOGRAPHY_VARIANT: TypographyProps["variant"] = "bodyMd";

const options: Options = {
	renderNode: {
		[BLOCKS.HEADING_2]: (_node, children) => (
			<ResponsiveHeadline size={2} as="h2" style={{ marginBottom: "18px" }}>
				{children}
			</ResponsiveHeadline>
		),

		[BLOCKS.PARAGRAPH]: (_node, children) => (
			<Typography variant={BODY_TYPOGRAPHY_VARIANT} className={styles.body}>
				{children}
			</Typography>
		),

		[BLOCKS.UL_LIST]: (_node, children) => (
			<List variant={BODY_TYPOGRAPHY_VARIANT}>{children}</List>
		),

		[BLOCKS.OL_LIST]: (_node, children) => (
			<List variant={BODY_TYPOGRAPHY_VARIANT} ordered>
				{children}
			</List>
		),
		[INLINES.HYPERLINK]: (node, children) => {
			const uri = node.data.uri;
			if (uri.startsWith("https://")) {
				return (
					<a
						className={styles.link}
						target="_blank"
						rel="noopener noreferrer"
						href={uri}
					>
						{children}
					</a>
				);
			}
			if (uri.startsWith("mailto:")) {
				return (
					<a className={styles.link} href={uri}>
						{children}
					</a>
				);
			}
		},
	},
};

interface RichTextProps {
	richText?: Document;
}

export const RichText = ({ richText }: RichTextProps) => {
	return (
		<TextBlockSection
			className={styles.textBlock}
			text={richText}
			options={options}
		/>
	);
};
