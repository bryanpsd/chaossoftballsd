import type { Options } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import { ContentfulImage } from "../../components/Image/ContentfulImage";
import { ResponsiveHeadline } from "../../components/ResponsiveHeadline";
import { TextBlockSection } from "../../components/TextBlockSection";
import { List } from "../../components/TextBlockSection/List";
import type { TypographyProps } from "../../components/Typography";
import { Typography } from "../../components/Typography";
import { Table } from "../Table";
import * as styles from "./RichText.css";

// Contentful rich text constants (ESM-compatible)
const BLOCKS = {
	DOCUMENT: "document",
	PARAGRAPH: "paragraph",
	HEADING_1: "heading-1",
	HEADING_2: "heading-2",
	HEADING_3: "heading-3",
	HEADING_4: "heading-4",
	HEADING_5: "heading-5",
	HEADING_6: "heading-6",
	OL_LIST: "ordered-list",
	UL_LIST: "unordered-list",
	LIST_ITEM: "list-item",
	QUOTE: "blockquote",
	HR: "hr",
	EMBEDDED_ENTRY: "embedded-entry-block",
	EMBEDDED_ASSET: "embedded-asset-block",
	TABLE: "table",
	TABLE_ROW: "table-row",
	TABLE_CELL: "table-cell",
	TABLE_HEADER_CELL: "table-header-cell",
};
const INLINES = {
	HYPERLINK: "hyperlink",
	ENTRY_HYPERLINK: "entry-hyperlink",
	ASSET_HYPERLINK: "asset-hyperlink",
	EMBEDDED_ENTRY: "embedded-entry-inline",
};
const MARKS = {
	BOLD: "bold",
	ITALIC: "italic",
	UNDERLINE: "underline",
	CODE: "code",
};

const BODY_TYPOGRAPHY_VARIANT: TypographyProps["variant"] = "bodyMd";

const options: Options = {
	renderMark: {
		[MARKS.ITALIC]: (_text) => <em className={styles.italic}>{_text}</em>,
		[MARKS.BOLD]: (_text) => <strong className={styles.bold}>{_text}</strong>,
	},
	renderNode: {
		[BLOCKS.HEADING_2]: (_node, children) => (
			<ResponsiveHeadline size={2} as="h2" className={styles.heading}>
				{children}
			</ResponsiveHeadline>
		),
		[BLOCKS.HEADING_3]: (_node, children) => (
			<ResponsiveHeadline size={3} as="h3" className={styles.heading}>
				{children}
			</ResponsiveHeadline>
		),
		[BLOCKS.HEADING_4]: (_node, children) => (
			<ResponsiveHeadline size={4} as="h4" className={styles.heading}>
				{children}
			</ResponsiveHeadline>
		),

		[BLOCKS.HEADING_5]: (_node, children) => (
			<ResponsiveHeadline size={5} as="h5" className={styles.heading}>
				{children}
			</ResponsiveHeadline>
		),

		[BLOCKS.HEADING_6]: (_node, children) => (
			<ResponsiveHeadline size={6} as="h6" className={styles.heading}>
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

		[BLOCKS.QUOTE]: (_node, children) => (
			<blockquote className={styles.blockquote}>
				{Array.isArray(children)
					? children.map((child, i) =>
							typeof child === "string" ? (
								child
							) : child && child.type === "p" ? (
								<p
									className={styles.blockquoteParagraph}
									key={child.key ?? `blockquote-paragraph-${i}`}
								>
									{child.props.children}
								</p>
							) : (
								child
							),
						)
					: children}
			</blockquote>
		),

		[BLOCKS.TABLE]: (node, _children) => {
			// Extract table rows and cells from Contentful node structure
			const tableRows = node.content || [];
			const thead: string[] = [];
			const tbody: Array<Array<string | React.ReactNode>> = [];

			tableRows.forEach((rowNode: any, rowIndex: number) => {
				// Table header row
				if (rowIndex === 0 && rowNode.nodeType === BLOCKS.TABLE_ROW) {
					const headerCells = (rowNode.content || []).map((cellNode: any) => {
						if (cellNode.nodeType === BLOCKS.TABLE_HEADER_CELL) {
							return (cellNode.content || [])
								.map((c: any) => c?.value ?? c?.content?.[0]?.value ?? "")
								.join("");
						}
						return "";
					});
					thead.push(...headerCells);
				} else if (rowNode.nodeType === BLOCKS.TABLE_ROW) {
					// Table body rows
					const bodyCells = (rowNode.content || []).map((cellNode: any) => {
						if (cellNode.nodeType === BLOCKS.TABLE_CELL) {
							return (cellNode.content || [])
								.map((c: any) => c?.value ?? c?.content?.[0]?.value ?? "")
								.join("");
						}
						return "";
					});
					// Only push non-header rows
					if (rowIndex !== 0) tbody.push(bodyCells);
				}
			});
			return <Table thead={thead} tbody={tbody} />;
		},

		[BLOCKS.HR]: () => <hr className={styles.hr} />,

		[BLOCKS.EMBEDDED_ASSET]: (node) => {
			const { url } = node.data.target.fields.file;
			const description = node.data.target.fields.description || "";
			return (
				<ContentfulImage className={styles.image} src={url} alt={description} />
			);
		},
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
			if (uri.startsWith("/") || uri.startsWith("#")) {
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
