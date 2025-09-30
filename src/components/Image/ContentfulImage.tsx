import type React from "react";
import { useState } from "react";

interface ContentfulImageProps {
	src: string;
	alt: string;
	imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
	lqip?: string;
}

export const ContentfulImage: React.FC<ContentfulImageProps> = ({
	src,
	alt,
	imgProps = {},
	lqip,
}) => {
	const [loaded, setLoaded] = useState(false);

	// Responsive srcSet for Contentful CDN
	const srcSet = [
		`${src}?w=400&fm=webp 400w`,
		`${src}?w=800&fm=webp 800w`,
		`${src}?w=1200&fm=webp 1200w`,
	].join(", ");
	const sizes = "(max-width: 600px) 100vw, 33vw";

	return (
		<div style={{ position: "relative", width: "100%", height: "100%" }}>
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
				src={src}
				srcSet={srcSet}
				sizes={sizes}
				alt={alt}
				loading="lazy"
				style={{
					position: lqip ? "relative" : undefined,
					zIndex: 1,
					background: lqip ? "transparent" : undefined,
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
