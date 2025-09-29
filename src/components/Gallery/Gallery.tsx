import { useCallback, useEffect, useState } from "react";
import {
    MdChevronLeft,
    MdChevronRight,
    MdSportsBaseball,
} from "react-icons/md";
import { ContentfulImage } from "~/components/Image/ContentfulImage";
import { Button } from "../Button/Button.tsx";
import * as styles from "./Gallery.css.ts";

interface GalleryProps {
    galleryId?: string;
    limit?: number;
}

export const Gallery = ({ galleryId }: GalleryProps) => {
    const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
    const [videoDimensions, setVideoDimensions] = useState<Record<string, { width: number; height: number }>>({});

    const handleMediaLoad = (id: string) => {
        setLoadedImages((prev) => ({ ...prev, [id]: true }));
    };

    const handleVideoLoaded = (id: string, videoEl: HTMLVideoElement) => {
        setVideoDimensions((prev) => ({
            ...prev,
            [id]: {
                width: videoEl.videoWidth,
                height: videoEl.videoHeight,
            },
        }));
        handleMediaLoad(id);
    };
    const PAGE_SIZE = 10;
    const [photos, setPhotos] = useState<
        Array<{
            id: string;
            url: string;
            title?: string;
            type?: string;
            mimeType?: string;
            captionsSrc?: string;
            width?: number;
            height?: number;
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
                {photos.map((media) => {
                    let containerClass = styles.galleryItemLandscape;
                    if (media.type === "video") {
                        // Prefer loaded video dimensions if available
                        const dims = videoDimensions[media.id];
                        if (dims?.width && dims?.height) {
                            containerClass = dims.width > dims.height
                                ? styles.galleryItemLandscape
                                : styles.galleryItemPortrait;
                        } else if (media.width && media.height) {
                            containerClass = media.width > media.height
                                ? styles.galleryItemLandscape
                                : styles.galleryItemPortrait;
                        } else {
                            containerClass = styles.galleryItemLandscape;
                        }
                    } else {
                        if (media.width && media.height) {
                            containerClass = media.width > media.height
                                ? styles.galleryItemLandscape
                                : styles.galleryItemPortrait;
                        }
                    }
                    return (
                        <div key={media.id} className={styles.galleryItemWrapper}>
                            {media.url && media.url.trim() !== "" ? (
                                <div className={containerClass} style={{ position: "relative" }}>
                                    {media.type === "video" ? (
                                        <video
                                            src={media.url}
                                            controls
                                            className={loadedImages[media.id]
                                                ? styles.videoLoaded
                                                : styles.videoNotLoaded}
                                            title={media.title || "Gallery video"}
                                            aria-label={media.title || "Gallery video"}
                                            aria-describedby={
                                                media.title ? `${media.id}-caption` : undefined
                                            }
                                            onLoadedData={e => handleVideoLoaded(media.id, e.currentTarget)}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                display: "block",
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
                                                className: loadedImages[media.id]
                                                    ? styles.galleryImageLoaded
                                                    : styles.galleryImageNotLoaded,
                                                onLoad: () => handleMediaLoad(media.id),
                                                style: {
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    display: "block",
                                                },
                                            }}
                                        />
                                    )}
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>
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
                <span style={{ fontSize: "1.1rem" }}>Page {page}</span>
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

