import type { Options } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

// Contentful rich text constants (ESM-compatible)
const BLOCKS = {
	PARAGRAPH: "paragraph",
};
const INLINES = {
	HYPERLINK: "hyperlink",
};

import { Link } from "~/components/Link";
import { TextBlockSection } from "~/components/TextBlockSection";
import { Typography } from "~/components/Typography";
import type { TypeBannerProps } from "~/types/contentful/TypeBanner";

import * as styles from "./Banner.css";

export type BannerProps = {
	banner: TypeBannerProps[];
	currentPath: string;
};

const bannerOptions: Options = {
	renderNode: {
		[BLOCKS.PARAGRAPH]: (_, children) => (
			<Typography color="inverse" variant="bodyMd" align="center">
				{children}
			</Typography>
		),
		[INLINES.HYPERLINK]: (node, children) => {
			const uri: string = node.data?.uri ?? "";
			const isAbsolute = /^(?:https?:)?\/\//i.test(uri);
			return (
				<Link
					className={styles.bannerLink}
					href={uri}
					target={isAbsolute ? "_blank" : undefined}
					rel={isAbsolute ? "noopener noreferrer" : undefined}
				>
					{children}
				</Link>
			);
		},
	},
};

export const Banner = ({ banner, currentPath }: BannerProps) => {
	const globalBanner = banner.find((item) => item.global);
	const pageBanner = banner.find((item) => item.pages?.includes(currentPath));
	const currentBanner = pageBanner || globalBanner;

	return (
		currentBanner && (
			<section className={styles.bannerWrapper} aria-label="Banner">
				<TextBlockSection text={currentBanner.body as Document} options={bannerOptions} />
			</section>
		)
	);
};
