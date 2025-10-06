import { useCallback, useEffect, useRef, useState } from "react";
/**
 * useScrollSpy
 * @param ids Array of section ids to observe (e.g., ["intro", "faqs", "contact", ...])
 * @param offset Optional offset in px (default: 0)
 * @returns [activeId, setScrollTarget]
 */
export function useScrollSpy(
  ids: string[]
): [string | null, (target: string | null) => void] {
	const [activeId, setActiveId] = useState<string | null>(null);
	const [scrollingTarget, setScrollingTarget] = useState<string | null>(null);
	const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;

				// Helper: get scroll-margin-top from :root custom property
				function getScrollMarginTopPx(): number {
					if (typeof window === 'undefined') return 0;
					const root = document.documentElement;
					const style = window.getComputedStyle(root);
					const val = style.getPropertyValue('--scroll-margin-top');
					if (val) {
						const px = parseInt(val, 12);
						if (!Number.isNaN(px)) return px;
					}
					return 0;
				}

			// Helper: is a section in view (top at or above visual top, accounting for scroll-margin-top)?
				const isSectionInView = (id: string) => {
					const el = document.getElementById(id);
					if (!el) return false;
					const rect = el.getBoundingClientRect();
					const offset = getScrollMarginTopPx();
					return rect.top <= offset;
				};

		// Failsafe: clear scroll lock if not released in 600ms
		if (scrollingTarget) {
			if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
			scrollTimeout.current = setTimeout(() => {
				setScrollingTarget(null);
			}, 600);
		} else if (scrollTimeout.current) {
			clearTimeout(scrollTimeout.current);
			scrollTimeout.current = null;
		}

			// Main scrollspy logic: last section whose top is at or above visual top (accounting for scroll-margin-top)
				const handleSpy = () => {
					if (scrollingTarget) {
						setActiveId(scrollingTarget);
						return;
					}
					let found: string | null = null;
					const offset = getScrollMarginTopPx();
					for (let i = 0; i < ids.length; i++) {
						const id = ids[i];
						const el = document.getElementById(id);
						if (el) {
							const rect = el.getBoundingClientRect();
							if (rect.top <= offset) {
								found = id;
							}
						}
					}
					setActiveId(found);
				};

		// Scroll handler
		const handleScroll = () => {
			if (scrollingTarget) {
				if (isSectionInView(scrollingTarget)) {
					setScrollingTarget(null);
					handleSpy();
					return;
				}
			} else {
				handleSpy();
			}
		};

		// Hash change handler
		const handleHashChange = () => {
			const hash = window.location.hash.replace(/^#/, "");
			if (hash && ids.includes(hash)) {
				setScrollingTarget(hash);
				setActiveId(hash);
				if (isSectionInView(hash)) {
					setScrollingTarget(null);
				}
			} else {
				setScrollingTarget(null);
				handleSpy();
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("hashchange", handleHashChange);
		window.addEventListener("popstate", handleHashChange);

		// On mount, handle hash if present
		const hash = window.location.hash.replace(/^#/, "");
		if (hash && ids.includes(hash)) {
			setScrollingTarget(hash);
			setActiveId(hash);
			if (isSectionInView(hash)) {
				setScrollingTarget(null);
			}
		} else {
			handleSpy();
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("hashchange", handleHashChange);
			window.removeEventListener("popstate", handleHashChange);
			if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
		};
	}, [ids, scrollingTarget]);

	// Expose setScrollTarget as a stable callback
	const setTarget = useCallback((target: string | null) => {
		setScrollingTarget(target);
	}, []);

	return [activeId, setTarget];
}
