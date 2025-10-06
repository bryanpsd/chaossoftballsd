import { useEffect, useState } from "react";

/**
 * useScrollSpy
 * @param ids Array of section ids to observe (e.g., ["intro", "faqs", "contact", ...])
 * @param offset Optional offset in px (default: 0)
 * @returns The id of the section currently in view (or null)
 */
export function useScrollSpy(ids: string[], offset = 0, lock = false) {
	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		let handleScroll: (() => void) | null = null;
		if (lock) {
			setActiveId(null); // Always clear activeId when locked
			return;
		}
		handleScroll = () => {
			let found: string | null = null;
			// Check sections in reverse order so the first in view is selected
			for (let i = ids.length - 1; i >= 0; i--) {
				const id = ids[i];
				const el = document.getElementById(id);
				if (el) {
					const rect = el.getBoundingClientRect();
					if (rect.top - offset <= 0 && rect.bottom > 0) {
						found = id;
						break;
					}
				}
			}
			setActiveId(found);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll(); // initial
		return () => {
			if (handleScroll) window.removeEventListener("scroll", handleScroll);
		};
	}, [ids, offset, lock]);

	return activeId;
}
