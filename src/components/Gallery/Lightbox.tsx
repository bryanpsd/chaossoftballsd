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
	const descId = "lightbox-modal-desc";
	if (!media) return null;

	// Always provide a non-empty, static description for accessibility
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.lightboxOverlay} />
				<Dialog.Content
					className={styles.lightboxContent}
					aria-describedby={descId}
				>
					<span id={descId} className="sr-only" style={visuallyHidden}>
						Media modal
					</span>
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
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
