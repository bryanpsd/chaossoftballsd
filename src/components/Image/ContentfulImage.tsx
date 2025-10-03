import type React from "react";
import { useState } from "react";

interface ContentfulImageProps {
	src: string;
	alt: string;
	imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
	lqip?: string;
	className?: string;
	fullWidth?: boolean;
	fixed1024?: boolean; // If true, use only 1024px image (for modal/gallery)
}

export const ContentfulImage: React.FC<ContentfulImageProps> = ({
	src,
	alt,
	imgProps = {},
	lqip,
	fullWidth = false,
	fixed1024 = false,
}) => {
	const [loaded, setLoaded] = useState(false);

	// If fixed1024, use only 1024px image (for modal/gallery)
	const srcSet = fixed1024
		? undefined
		: [
				`${src}?w=400&fm=webp 400w`,
				`${src}?w=800&fm=webp 800w`,
				`${src}?w=1200&fm=webp 1200w`,
				`${src}?w=1600&fm=webp 1600w`,
				`${src}?w=2400&fm=webp 2400w`,
			].join(", ");
	const sizes = fixed1024 ? undefined : fullWidth ? "100vw" : "(max-width: 900px) 100vw, 700px";

	// For modal/gallery, always use 1024px version
	const imgSrc = fixed1024 ? `${src}?w=1024&fm=webp` : src;

	return (
		<div
			style={{
				position: "relative",
				width: fullWidth ? "100vw" : "100%",
				left: fullWidth ? "50%" : undefined,
				right: fullWidth ? "50%" : undefined,
				marginLeft: fullWidth ? "-50vw" : undefined,
				marginRight: fullWidth ? "-50vw" : undefined,
				maxWidth: fullWidth ? "none" : "100%",
				height: "auto",
			}}
		>
			{lqip && !loaded && (
				<img
					src={lqip}
					alt=""
					aria-hidden="true"
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						objectFit: "cover",
						filter: "blur(16px)",
						zIndex: 0,
						transition: "opacity 0.3s",
					}}
				/>
			)}
			<img
				src={imgSrc}
				srcSet={srcSet}
				sizes={sizes}
				alt={alt}
				loading="lazy"
				style={{
					position: lqip ? "relative" : undefined,
					zIndex: 1,
					background: lqip ? "transparent" : undefined,
					width: "100%",
					height: "auto",
					display: "block",
					...imgProps.style,
				}}
				{...imgProps}
				onLoad={(e) => {
					setLoaded(true);
					imgProps.onLoad?.(e);
				}}
			/>
		</div>
	);
};
