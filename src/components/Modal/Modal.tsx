import * as Dialog from "@radix-ui/react-dialog";
import { MdClose } from "react-icons/md";
import { ContentfulImage } from "~/components/Image/ContentfulImage";
import * as styles from "./Modal.css";

interface ModalProps {
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

export const Modal: React.FC<ModalProps> = ({ open, onOpenChange, media }) => {
	const descId = undefined;
	if (!media) return null;

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.ModalOverlay} />
				<Dialog.Content
					className={styles.ModalContent}
					aria-describedby={descId}
				>
					<p id={descId} className="sr-only">
						{media.type === "video"
							? "This is a modal dialog showing a gallery video."
							: "This is a modal dialog showing a gallery image."}
					</p>
					{media.title ? (
						<Dialog.Title className="sr-only">{media.title}</Dialog.Title>
					) : (
						<Dialog.Title asChild>
							<span className="sr-only">
								{media.type === "video" ? "Gallery video" : "Gallery image"}
							</span>
						</Dialog.Title>
					)}
					<Dialog.Close asChild>
						<button
							className={styles.ModalCloseBtn}
							aria-label="Close"
							type="button"
						>
							<MdClose size={28} />
						</button>
					</Dialog.Close>
					<div className={styles.ModalMediaWrapper}>
						{media.type === "video" ? (
							<video
								src={media.url}
								controls
								autoPlay
								className={styles.ModalMedia}
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
									className: styles.ModalMedia,
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
