import type { Options } from "@contentful/rich-text-react-renderer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document, TopLevelBlock } from "@contentful/rich-text-types";
import { BasicAccordion } from "../../components/Accordion";
import { Gallery } from "../../components/Gallery";
import { ContentfulImage } from "../../components/Image/ContentfulImage";
import { Link } from "../../components/Link";
import { ResponsiveHeadline } from "../../components/ResponsiveHeadline";
import { TextBlockSection } from "../../components/TextBlockSection";
import { List } from "../../components/TextBlockSection/List";
import type { TypographyProps } from "../../components/Typography";
import { Typography } from "../../components/Typography";
import { BrandColors } from "../StyleGuide/BrandColors";
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

const tableCellOptions: Options = {
	renderMark: {
		[MARKS.ITALIC]: (_text) => <em>{_text}</em>,
		[MARKS.BOLD]: (_text) => <strong>{_text}</strong>,
	},
	renderNode: {
		[BLOCKS.PARAGRAPH]: (_node, children) => <>{children}</>,
		[INLINES.HYPERLINK]: (_node, children) => {
			const uri = _node.data.uri;
			if (uri.startsWith("https://")) {
				return (
					<Link className={styles.link} target="_blank" rel="noopener noreferrer" href={uri}>
						{children}
					</Link>
				);
			}
			if (uri.startsWith("mailto:")) {
				return (
					<Link className={styles.link} href={uri}>
						{children}
					</Link>
				);
			}
			if (uri.startsWith("/") || uri.startsWith("#")) {
				return (
					<Link className={styles.link} href={uri}>
						{children}
					</Link>
				);
			}
			return null;
		},
	},
};

const options: Options = {
	renderMark: {
		[MARKS.ITALIC]: (_text) => <em>{_text}</em>,
		[MARKS.BOLD]: (_text) => <strong>{_text}</strong>,
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
			<blockquote className={styles.blockquote}>{children}</blockquote>
		),

		[BLOCKS.TABLE]: (node, _children) => {
			const tableRows = node.content || [];
			const thead: Array<{ value: React.ReactNode }> = [];
			const tbody: Array<Array<{ value: React.ReactNode }>> = [];

			type ContentfulTableCellNode = {
				nodeType: string;
				content?: Array<{
					value?: string;
					content?: Array<{ value?: string }>;
				}>;
			};
			type ContentfulTableRowNode = {
				nodeType: string;
				content?: ContentfulTableCellNode[];
			};
			(tableRows as ContentfulTableRowNode[]).forEach((rowNode, rowIndex) => {
				if (rowIndex === 0 && rowNode.nodeType === BLOCKS.TABLE_ROW) {
					const headerCells = (rowNode.content || []).map((cellNode) => {
						if (cellNode.nodeType === BLOCKS.TABLE_HEADER_CELL) {
							return {
								value: documentToReactComponents(
									{
										nodeType: "document",
										data: {},
										content: Array.isArray(cellNode.content)
											? (cellNode.content.filter(
													(c) =>
														c &&
														typeof c === "object" &&
														"nodeType" in c &&
														typeof (c as { nodeType?: string }).nodeType === "string",
												) as TopLevelBlock[])
											: [],
									} as Document,
									tableCellOptions,
								),
							};
						}
						return { value: "" };
					});
					thead.push(...headerCells);
				} else if (rowNode.nodeType === BLOCKS.TABLE_ROW) {
					const bodyCells = (rowNode.content || []).map((cellNode) => {
						if (cellNode.nodeType === BLOCKS.TABLE_CELL) {
							return {
								value: documentToReactComponents(
									{
										nodeType: "document",
										data: {},
										content: Array.isArray(cellNode.content)
											? (cellNode.content.filter(
													(c) =>
														c &&
														typeof c === "object" &&
														"nodeType" in c &&
														typeof (c as { nodeType?: string }).nodeType === "string",
												) as TopLevelBlock[])
											: [],
									} as Document,
									tableCellOptions,
								),
							};
						}
						return { value: "" };
					});

					if (rowIndex !== 0) tbody.push(bodyCells);
				}
			});
			return <Table thead={thead} tbody={tbody} />;
		},

		[BLOCKS.HR]: () => <hr className={styles.hr} />,

		[BLOCKS.EMBEDDED_ASSET]: (node) => {
			const file = node.data?.target?.fields?.file;
			if (!file) return null;
			const { url, details } = file;
			const description = node.data.target.fields.description || "";
			const height = details?.image?.height;
			return (
				<ContentfulImage
					src={url}
					alt={description}
					imgProps={{
						className: styles.image,
						height,
						width: details?.image?.width,
					}}
				/>
			);
		},

		[BLOCKS.EMBEDDED_ENTRY]: (node) => {
			const entry = node?.data?.target;
			if (
				entry?.sys?.contentType?.sys?.id === "customBlock" && // or your content type ID
				entry.fields?.blockType === "brandColors"
			) {
				return <BrandColors />;
			}
			if (entry?.sys?.contentType?.sys?.id === "list" && entry.fields) {
				return <BasicAccordion list={entry} key={entry.sys.id} />;
			}
			if (entry?.sys?.contentType?.sys?.id === "gallery" && entry.fields) {
				return <Gallery galleryId={entry.sys.id} />;
			}
			return null;
		},

		[INLINES.HYPERLINK]: (node, children) => {
			const uri = node.data.uri;
			if (uri.startsWith("https://")) {
				return (
					<Link className={styles.link} target="_blank" rel="noopener noreferrer" href={uri}>
						{children}
					</Link>
				);
			}
			if (uri.startsWith("mailto:")) {
				return (
					<Link className={styles.link} href={uri}>
						{children}
					</Link>
				);
			}
			if (uri.startsWith("/") || uri.startsWith("#")) {
				return (
					<Link className={styles.link} href={uri}>
						{children}
					</Link>
				);
			}
			return null;
		},
	},
};

interface RichTextProps {
	richText?: Document;
}

export const RichText = ({ richText }: RichTextProps) => {
	return <TextBlockSection className={styles.textBlock} text={richText} options={options} />;
};
