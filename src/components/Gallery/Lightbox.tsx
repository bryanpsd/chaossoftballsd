import * as Dialog from "@radix-ui/react-dialog";

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
	if (!media) return null;
	// Only set width/height if available, do not stretch
	// Clamp to viewport for large images/videos
	const contentStyle: React.CSSProperties = {};
	if (media.width)
		contentStyle.width = Math.min(media.width, window.innerWidth * 0.95);
	if (media.height)
		contentStyle.height = Math.min(media.height, window.innerHeight * 0.9);
	// For accessibility: always provide a non-empty aria-describedby
	const descId = media?.title
		? `${media.id}-caption`
		: media
			? `${media.id}-desc`
			: "lightbox-desc-fallback";

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.lightboxOverlay} />
				<Dialog.Content
					className={styles.lightboxContent}
					style={contentStyle}
					aria-describedby={descId || "lightbox-desc-fallback"}
				>
					{/* Accessible dialog title (visually hidden if no media.title) */}
					{media.title ? (
						<Dialog.Title>{media.title}</Dialog.Title>
					) : (
						<Dialog.Title asChild>
							<span style={visuallyHidden}>
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
						{/* Visually hidden fallback description for a11y if no title or no media */}
						{(!media || !media.title) && (
							<span
								id={descId || "lightbox-desc-fallback"}
								style={{
									position: "absolute",
									left: "-9999px",
									width: 1,
									height: 1,
									overflow: "hidden",
								}}
							>
								{media
									? media.type === "video"
										? "Gallery video"
										: "Gallery image"
									: "Gallery media"}
							</span>
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
									width: media.width
										? Math.min(media.width, window.innerWidth * 0.95)
										: "95vw",
									height: media.height
										? Math.min(media.height, window.innerHeight * 0.9)
										: "auto",
									maxWidth: "95vw",
									maxHeight: "90vh",
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
										width: media.width
											? Math.min(media.width, window.innerWidth * 0.95)
											: "95vw",
										height: media.height
											? Math.min(media.height, window.innerHeight * 0.9)
											: "auto",
										maxWidth: "95vw",
										maxHeight: "90vh",
										borderRadius: 8,
										background: "#000",
									},
								}}
							/>
						)}
						{/* Caption for screen readers and visible users if present */}
						{media.title && (
							<div id={descId} className={styles.lightboxCaption}>
								{media.title}
							</div>
						)}
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
