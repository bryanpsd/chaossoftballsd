import type { Options } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import { BLOCKS } from "@contentful/rich-text-types";

import * as styles from "./RichText.css";

const options: Options = {
	renderNode: {
		[BLOCKS.HEADING_2]: (_node, children) => (
			<h2 style={{ fontSize: 28, margin: "0 0 1em" }}>{children}</h2>
		),
		[BLOCKS.PARAGRAPH]: (_node, children) => (
			<div className={styles.body}>{children}</div>
		),
	},
};

interface RichTextProps {
	richText?: Document;
}

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const RichText = ({ richText }: RichTextProps) => {
	return (
		<div className={styles.textBlock}>
			{richText ? documentToReactComponents(richText, options) : null}
		</div>
	);
};
