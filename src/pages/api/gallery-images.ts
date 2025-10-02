import type { APIRoute } from "astro";
import { contentfulClient } from "~/services/contentful/contentful";
import type { TypeGallerySkeleton } from "~/types/contentful/TypeGallery";

const galleryCache = new Map();

export const GET: APIRoute = async ({ url }) => {
	const galleryId = url.searchParams.get("galleryId");
	const limit = Number(url.searchParams.get("limit")) || 100;
	const offset = Number(url.searchParams.get("offset")) || 0;
	const cacheKey = `${galleryId}:${limit}:${offset}`;
	if (galleryCache.has(cacheKey)) {
		return new Response(galleryCache.get(cacheKey), {
			status: 200,
			headers: {
				"Cache-Control": "public, max-age=300, stale-while-revalidate=600",
			},
		});
	}

	if (!galleryId) {
		return new Response(JSON.stringify({ error: "Missing galleryId" }), {
			status: 400,
		});
	}

	try {
		const entry = await contentfulClient.getEntry<TypeGallerySkeleton>(galleryId);
		if (!entry || !entry.fields.photos) {
			const emptyRes = JSON.stringify({ photos: [] });
			galleryCache.set(cacheKey, emptyRes);
			return new Response(emptyRes, {
				status: 200,
				headers: {
					"Cache-Control": "public, max-age=300, stale-while-revalidate=600",
				},
			});
		}
		// Get asset IDs for the current page
		const assetIds = entry.fields.photos.slice(offset, offset + limit).map((asset) => asset.sys.id);
		if (assetIds.length === 0) {
			const emptyRes = JSON.stringify({ photos: [] });
			galleryCache.set(cacheKey, emptyRes);
			return new Response(emptyRes, {
				status: 200,
				headers: {
					"Cache-Control": "public, max-age=300, stale-while-revalidate=600",
				},
			});
		}
		// Batch fetch assets, only needed fields
		const assetsResponse = await contentfulClient.getAssets({
			"sys.id[in]": assetIds,
			select: ["fields.file", "fields.title", "sys.id"],
		});
		const assetsMap = new Map();
		for (const assetData of assetsResponse.items) {
			assetsMap.set(assetData.sys.id, assetData);
		}
		// Preserve original order
		const photos = assetIds
			.map((assetId) => {
				const assetData = assetsMap.get(assetId);
				if (!assetData) return null;
				const file = assetData.fields.file;
				let type = "image";
				if (file?.contentType?.startsWith("video")) type = "video";
				const baseUrl = file?.url ? `https:${file.url}` : "";
				return {
					id: assetData.sys.id,
					url: baseUrl || "", // Use original image URL for main image
					lqip: baseUrl ? `${baseUrl}?w=20&fm=webp&q=20` : "",
					title: assetData.fields.title || "",
					mimeType: file?.contentType || "",
					type,
					width: file?.details?.image?.width,
					height: file?.details?.image?.height,
				};
			})
			.filter(Boolean);
		const total = entry.fields.photos.length;
		const result = JSON.stringify({ photos, total });
		galleryCache.set(cacheKey, result);
		return new Response(result, {
			status: 200,
			headers: {
				"Cache-Control": "public, max-age=300, stale-while-revalidate=600",
			},
		});
	} catch {
		return new Response(JSON.stringify({ error: "Gallery not found" }), {
			status: 404,
		});
	}
};
