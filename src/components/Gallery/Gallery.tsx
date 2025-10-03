import { useCallback, useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight, MdSportsBaseball } from "react-icons/md";
import { ContentfulImage } from "~/components/Image/ContentfulImage";
import { useInView } from "~/utils/useInView";
import { Button } from "../Button/Button.tsx";
import { Modal } from "../Modal/Modal.tsx";
import * as styles from "./Gallery.css.ts";

// Shared type for gallery media
type MediaType = {
	id: string;
	url: string;
	lqip?: string;
	title?: string;
	type?: string;
	mimeType?: string;
	captionsSrc?: string;
	width?: number;
	height?: number;
};

interface GalleryProps {
	galleryId?: string;
	limit?: number;
}

export const Gallery = ({ galleryId }: GalleryProps) => {
	const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
	const [GalleryModalOpen, setGalleryModalOpen] = useState(false);
	const [GalleryModalMedia, setGalleryModalMedia] = useState<MediaType | null>(null);

	const handleOpenGalleryModal = (media: MediaType) => {
		setGalleryModalMedia(media);
		setGalleryModalOpen(true);
	};
	const handleCloseGalleryModal = () => {
		setGalleryModalOpen(false);
		setGalleryModalMedia(null);
	};

	const handleMediaLoad = (id: string) => {
		setLoadedImages((prev) => ({ ...prev, [id]: true }));
	};

	const PAGE_SIZE = 20;
	const [photos, setPhotos] = useState<MediaType[]>([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [hasNext, setHasNext] = useState(true);
	const [fade, setFade] = useState(false);
	const [totalPages, setTotalPages] = useState<number | null>(null);

	const fetchGalleryPage = useCallback(
		async (pageNum: number) => {
			setLoading(true);
			setFade(true);
			try {
				const offset = (pageNum - 1) * PAGE_SIZE;
				const res = await fetch(
					`/api/gallery-images?galleryId=${galleryId || "default"}&limit=${PAGE_SIZE}&offset=${offset}`,
				);
				const data = await res.json();
				const newItems = data.photos || [];
				setTimeout(() => {
					setPhotos(newItems);
					setFade(false);
				}, 250); // fade duration
				setHasNext(newItems.length === PAGE_SIZE);
				// If API returns total count, use it; otherwise estimate
				if (typeof data.total === "number") {
					setTotalPages(Math.ceil(data.total / PAGE_SIZE));
				} else if (newItems.length < PAGE_SIZE && pageNum > 1) {
					setTotalPages(pageNum);
				} else if (newItems.length === PAGE_SIZE && hasNext) {
					setTotalPages(null); // unknown
				}
			} catch {
				setPhotos([]);
				setHasNext(false);
				setFade(false);
			} finally {
				setLoading(false);
			}
		},
		[galleryId, hasNext],
	);

	useEffect(() => {
		fetchGalleryPage(page);
	}, [fetchGalleryPage, page]);

	const handlePrev = () => {
		if (page > 1) setPage(page - 1);
	};
	const handleNext = () => {
		if (hasNext) setPage(page + 1);
	};

	if (loading || fade)
		return (
			<div className={styles.loading}>
				<MdSportsBaseball
					size={32}
					style={{ animation: "spin 1s linear infinite" }}
					aria-label="Loading baseball icon"
				/>
				<span>Loading gallery...</span>
				<style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
			</div>
		);
	if (!photos.length) return <div className={styles.empty}>No images found.</div>;

	return (
		<div>
			<div
				className={styles.galleryWrapper + (fade ? ` ${styles.fadeOut}` : ` ${styles.fadeIn}`)}
				style={{ transition: "opacity 0.25s" }}
			>
				{photos.map((media) => (
					<GalleryItem
						key={media.id}
						media={media}
						loaded={!!loadedImages[media.id]}
						onLoad={handleMediaLoad}
						onOpenGalleryModal={handleOpenGalleryModal}
					/>
				))}
			</div>
			{GalleryModalOpen && GalleryModalMedia && (
				<Modal
					open={GalleryModalOpen}
					onOpenChange={(open) => (open ? setGalleryModalOpen(true) : handleCloseGalleryModal())}
					media={GalleryModalMedia}
				/>
			)}
			<div className={styles.buttonWrapper}>
				<Button
					color="primary"
					size="small"
					variant="round"
					type="button"
					onClick={handlePrev}
					disabled={page === 1}
					aria-label="Previous page"
				>
					<MdChevronLeft size={22} aria-hidden="true" />
				</Button>
				<span style={{ fontSize: "1.1rem" }}>
					Page {page}
					{totalPages ? ` of ${totalPages}` : ""}
				</span>
				<Button
					color="primary"
					size="small"
					variant="round"
					type="button"
					onClick={handleNext}
					disabled={!hasNext}
					aria-label="Next page"
				>
					<MdChevronRight size={22} aria-hidden="true" />
				</Button>
			</div>
		</div>
	);
};

interface GalleryItemProps {
	media: MediaType;
	loaded: boolean;
	onLoad: (id: string) => void;
	onOpenGalleryModal: (media: MediaType) => void;
	lqip?: string; // Removed since media.lqip is already available
}

function GalleryItem({ media, loaded, onLoad, onOpenGalleryModal }: GalleryItemProps) {
	let containerClass = styles.galleryItemLandscape;
	if (media.type === "video") {
		if (media.width && media.height) {
			containerClass =
				media.width > media.height ? styles.galleryItemLandscape : styles.galleryItemPortrait;
		} else {
			containerClass = styles.galleryItemLandscape;
		}
	} else {
		if (media.width && media.height) {
			containerClass =
				media.width > media.height ? styles.galleryItemLandscape : styles.galleryItemPortrait;
		}
	}
	const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "100px" });
	return (
		<div ref={ref} className={styles.galleryItemWrapper}>
			{media.url && media.url.trim() !== "" ? (
				<button
					type="button"
					className={containerClass}
					style={{
						position: "relative",
						cursor: "pointer",
						padding: 0,
						border: "none",
						background: "none",
					}}
					onClick={() => onOpenGalleryModal(media)}
					aria-label={media.title ? `Open ${media.title}` : "Open media"}
				>
					{inView ? (
						media.type === "video" ? (
							<div
								className={loaded ? styles.videoLoaded : styles.videoNotLoaded}
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
									display: "block",
									position: "relative",
									background: "#000",
								}}
							>
								{media.captionsSrc ? (
									<img
										src={media.captionsSrc}
										alt={media.title || "Video thumbnail"}
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
											display: "block",
										}}
										tabIndex={-1}
										onLoad={() => onLoad(media.id)}
									/>
								) : (
									<span
										style={{
											position: "absolute",
											top: "50%",
											left: "50%",
											transform: "translate(-50%, -50%)",
											color: "#fff",
											fontSize: "2rem",
										}}
									>
										▶
									</span>
								)}
							</div>
						) : (
							<ContentfulImage
								src={media.url}
								alt={media.title || "Gallery image"}
								lqip={media.lqip}
								imgProps={{
									width: media.width,
									height: media.height,
									className: loaded ? styles.galleryImageLoaded : styles.galleryImageNotLoaded,
									onLoad: () => onLoad(media.id),
									style: {
										width: "100%",
										height: "100%",
										objectFit: "cover",
										display: "block",
									},
									tabIndex: -1,
								}}
							/>
						)
					) : (
						// Placeholder (could be a skeleton or blank)
						<div
							style={{
								width: "100%",
								height: 0,
								paddingBottom: "66%",
								background: "#f0f0f0",
							}}
						/>
					)}
				</button>
			) : null}
		</div>
	);
}
