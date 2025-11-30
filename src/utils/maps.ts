/**
 * Maps utilities for generating driving directions URLs
 * Provides smart platform detection and URL generation for Apple Maps and Google Maps
 */

// Contentful's Location field type
export interface LocationAddress {
	lat: number;
	lon: number;
}

/**
 * Detects if the user is on an iOS device
 */
function isIOSDevice(): boolean {
	if (typeof navigator === "undefined") return false;
	const ua = navigator.userAgent || "";
	return /iPad|iPhone|iPod/.test(ua);
}

/**
 * Detects if the user is on an Android device
 */
function isAndroidDevice(): boolean {
	if (typeof navigator === "undefined") return false;
	const ua = navigator.userAgent || "";
	return /Android/.test(ua);
}

/**
 * Generates an Apple Maps search URL
 */
function getAppleMapsURL(query: string): string {
	const encoded = encodeURIComponent(query.trim());
	return `https://maps.apple.com/?q=${encoded}`;
}

/**
 * Generates a Google Maps search URL
 */
function getGoogleMapsURL(query: string): string {
	const encoded = encodeURIComponent(query.trim());
	return `https://www.google.com/maps/search/?api=1&query=${encoded}`;
}

/**
 * Generates an Apple Maps directions URL (driving) from current location
 */
function getAppleMapsDirectionsURL(query: string): string {
	const encoded = encodeURIComponent(query.trim());
	return `https://maps.apple.com/?saddr=Current+Location&daddr=${encoded}&dirflg=d`;
}

/**
 * Generates a Google Maps directions URL (driving) from current location
 */
function getGoogleMapsDirectionsURL(query: string): string {
	const encoded = encodeURIComponent(query.trim());
	return `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${encoded}&travelmode=driving`;
}

/**
 * Generates a maps query string from address or fallback text
 * Prioritizes coordinates if available, otherwise uses the provided fallback text
 */
function getMapsQuery(address?: LocationAddress, fallbackText?: string): string {
	if (address && typeof address.lat === "number" && typeof address.lon === "number") {
		return `${address.lat},${address.lon}`;
	}
	return fallbackText || "";
}

/**
 * Gets the appropriate maps URL based on the user's platform
 * Returns Google Maps URL by default, Apple Maps for iOS devices
 */
export function getMapsURL(address?: LocationAddress, fallbackText?: string): string {
	const query = getMapsQuery(address, fallbackText);
	if (!query) return "";

	return isIOSDevice() ? getAppleMapsURL(query) : getGoogleMapsURL(query);
}

/**
 * Gets a universal fallback URL (Google Maps) for use in href attributes
 * This ensures the link works even if JavaScript is disabled
 */
export function getMapsFallbackURL(address?: LocationAddress, fallbackText?: string): string {
	const query = getMapsQuery(address, fallbackText);
	return query ? getGoogleMapsURL(query) : "";
}

/**
 * Gets a universal fallback URL (Google Maps) that opens directions UI
 */
export function getDirectionsFallbackURL(address?: LocationAddress, fallbackText?: string): string {
	const query = getMapsQuery(address, fallbackText);
	return query ? getGoogleMapsDirectionsURL(query) : "";
}

/**
 * Creates an onClick handler for driving directions links
 * Opens the appropriate maps app based on the user's platform
 */
export function createMapsClickHandler(
	address?: LocationAddress,
	fallbackText?: string,
): React.MouseEventHandler<HTMLAnchorElement> | undefined {
	const query = getMapsQuery(address, fallbackText);
	if (!query) return undefined;

	return (e: React.MouseEvent<HTMLAnchorElement>) => {
		try {
			// Only intercept on mobile devices
			if (isIOSDevice() || isAndroidDevice()) {
				e.preventDefault();
				const url = getMapsURL(address, fallbackText);
				window.location.href = url;
			}
			// On desktop, let the default href behavior work (opens Google Maps in browser)
		} catch (error) {
			// If anything fails, let the default link behavior take over
			console.error("Maps navigation error:", error);
		}
	};
}

/**
 * Creates an onClick handler that opens turn-by-turn directions
 */
export function createDirectionsClickHandler(
	address?: LocationAddress,
	fallbackText?: string,
): React.MouseEventHandler<HTMLAnchorElement> | undefined {
	const query = getMapsQuery(address, fallbackText);
	if (!query) return undefined;

	return (e: React.MouseEvent<HTMLAnchorElement>) => {
		try {
			if (isIOSDevice() || isAndroidDevice()) {
				e.preventDefault();
				const url = isIOSDevice()
					? getAppleMapsDirectionsURL(query)
					: getGoogleMapsDirectionsURL(query);
				window.location.href = url;
			}
		} catch (error) {
			console.error("Maps navigation error (directions):", error);
		}
	};
}
