import * as Dialog from "@radix-ui/react-dialog";
import { useId } from "react";

// Visually hidden utility
const visuallyHidden: React.CSSProperties = {
	position: "absolute",
	left: "-9999px",
	width: 1,
	height: 1,
	overflow: "hidden",
};

import { MdClose } from "react-icons/md";
import { ContentfulImage } from "~/components/Image/ContentfulImage";
import * as styles from "./Gallery.css.ts";

interface LightboxProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	media: {
		id: string;
		url: string;
		title?: string;
		type?: string;
		mimeType?: string;
		captionsSrc?: string;
		width?: number;
		height?: number;
	} | null;
}

export const Lightbox: React.FC<LightboxProps> = ({
	open,
	onOpenChange,
	media,
}) => {
	const fallbackDescId = useId();
	if (!media) return null;
	const descId = media?.title ? `${media.id}-caption` : fallbackDescId;

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.lightboxOverlay} />
				<Dialog.Content
					className={styles.lightboxContent}
					aria-describedby={descId}
				>
					{media.title ? (
						<Dialog.Title className="sr-only">{media.title}</Dialog.Title>
					) : (
						<Dialog.Title asChild>
							<span className="sr-only" style={visuallyHidden}>
								{media.type === "video" ? "Gallery video" : "Gallery image"}
							</span>
						</Dialog.Title>
					)}
					<Dialog.Close asChild>
						<button
							className={styles.lightboxCloseBtn}
							aria-label="Close"
							type="button"
						>
							<MdClose size={28} />
						</button>
					</Dialog.Close>
					<div className={styles.lightboxMediaWrapper}>
						<span
							id={fallbackDescId}
							className="sr-only"
							style={visuallyHidden}
						>
							{media
								? media.type === "video"
									? "Gallery video"
									: "Gallery image"
								: "Gallery media"}
						</span>
						{media.title && (
							<div id={`${media.id}-caption`} className="sr-only">
								{media.title}
							</div>
						)}
						{media.type === "video" ? (
							<video
								src={media.url}
								controls
								autoPlay
								className={styles.lightboxMedia}
								title={media.title || "Gallery video"}
								aria-label={media.title || "Gallery video"}
								style={{
									borderRadius: 8,
									background: "#000",
								}}
							>
								<track
									kind="captions"
									src={
										media.captionsSrc && media.captionsSrc.trim() !== ""
											? media.captionsSrc
											: undefined
									}
									srcLang="en"
									label="English captions"
									default
								/>
							</video>
						) : (
							<ContentfulImage
								src={media.url}
								alt={media.title || "Gallery image"}
								imgProps={{
									width: media.width,
									height: media.height,
									className: styles.lightboxMedia,
									style: {
										objectFit: "contain",
										display: "block",
										margin: "0 auto",
									},
								}}
							/>
						)}
						{media.title && (
							<div id={descId} className="sr-only">
								{media.title}
							</div>
						)}
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
