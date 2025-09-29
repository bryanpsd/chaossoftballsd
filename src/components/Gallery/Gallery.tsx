import { useCallback, useEffect, useState } from "react";
import { MdSportsBaseball } from "react-icons/md";
import { ContentfulImage } from "~/components/Image/ContentfulImage";
import { Button } from "../Button/Button.tsx";
import * as styles from "./Gallery.css.ts";

interface GalleryProps {
	galleryId?: string;
	limit?: number;
}

export const Gallery = ({ galleryId }: GalleryProps) => {
	const PAGE_SIZE = 20;
	const [photos, setPhotos] = useState<
		Array<{
			id: string;
			url: string;
			title?: string;
			type?: string;
			mimeType?: string;
			captionsSrc?: string;
		}>
	>([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [hasNext, setHasNext] = useState(true);
	const [fade, setFade] = useState(false);

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
			} catch {
				setPhotos([]);
				setHasNext(false);
				setFade(false);
			} finally {
				setLoading(false);
			}
		},
		[galleryId],
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
	if (!photos.length)
		return <div className={styles.empty}>No images found.</div>;

	return (
		<div>
			<div
				className={
					styles.galleryWrapper +
					(fade ? " " + styles.fadeOut : " " + styles.fadeIn)
				}
				style={{ transition: "opacity 0.25s" }}
			>
				{photos.map((media) => (
					<div key={media.id} className={styles.galleryItem}>
						{media.url &&
							media.url.trim() !== "" &&
							(media.type === "video" ? (
								<video
									src={media.url}
									controls
									className={styles.video}
									title={media.title || "Gallery video"}
									aria-label={media.title || "Gallery video"}
									aria-describedby={
										media.title ? `${media.id}-caption` : undefined
									}
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
								/>
							))}
					</div>
				))}
			</div>
			<div className={styles.buttonWrapper}>
				<Button
					color="primary"
					size="small"
					variant="contained"
					type="button"
					onClick={handlePrev}
					disabled={page === 1}
				>
					Prev
				</Button>
				<span style={{ fontSize: "1.1rem" }}>Page {page}</span>
				<Button
					color="primary"
					size="small"
					variant="contained"
					type="button"
					onClick={handleNext}
					disabled={!hasNext}
				>
					Next
				</Button>
			</div>
		</div>
	);
};
