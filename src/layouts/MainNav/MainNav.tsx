import * as NavMenu from "@radix-ui/react-navigation-menu";
import * as React from "react";
import { useState } from "react";
import { Button } from "~/components/Button";
import { iconMap } from "~/utils/iconMap";
import { useScrollSpy } from "~/utils/useScrollSpy";
import * as styles from "./MainNav.css";

// TypeScript: declare the global scroll lock property on window
declare global {
	interface Window {
		__NAV_SCROLL_LOCK__?: string | null;
	}
}

type NavigationLink = {
	label: string;
	href?: string;
	target?: string;
	links?: NavigationLink[];
	type?: string | string[];
};

export type MainNavProps = {
	items: {
		label: string;
		menuItems: NavigationLink[];
	};
	currentPath: string;
};

function MainNavInner(props: MainNavProps) {
	// ...existing code...
	const [isScrolling, setIsScrolling] = React.useState(false);
	const [clickedAnchor, setClickedAnchor] = useState<string | null>(null);
	// (No scroll-based clearing of clickedAnchor)
	const { items } = props;
	// (already declared above)
	const [currentPath, setCurrentPath] = React.useState("");
	const [hydrated, setHydrated] = React.useState(false);
	const lastClickedAnchor = React.useRef<string | null>(null);
	const nonAnchorNavClickedRef = React.useRef(false);

	// Force scrollspy recalculation after hydration and after hash/popstate navigation
	React.useEffect(() => {
		if (!hydrated) return;
		if (typeof window === "undefined") return;
		// Fire after a short delay to ensure DOM is ready
		const fireScroll = () => setTimeout(() => window.dispatchEvent(new Event("scroll")), 10);
		fireScroll();
		window.addEventListener("hashchange", fireScroll);
		window.addEventListener("popstate", fireScroll);
		return () => {
			window.removeEventListener("hashchange", fireScroll);
			window.removeEventListener("popstate", fireScroll);
		};
	}, [hydrated]);

	// Extract section ids from anchor hrefs (/#contact => contact)
	const sectionIds = React.useMemo(
		() =>
			items.menuItems
				.map((item) => {
					if (!item.href) return null;
					const match = item.href.match(/^\/#(.+)/);
					return match ? match[1] : null;
				})
				.filter(Boolean) as string[],
		[items.menuItems],
	);

	// Use a global lock to block scrollspy and active state logic during scroll
	const navScrollLock = typeof window !== "undefined" ? window.__NAV_SCROLL_LOCK__ : null;
	const activeSection = useScrollSpy(sectionIds, 90, !!navScrollLock); // 90px offset for sticky header, lock during scroll

	// On mount and on hashchange/popstate, set clickedAnchor from hash if it matches a section (for direct nav or SPA back)
	React.useEffect(() => {
		if (typeof window === "undefined") return;
		const setAnchorFromHash = () => {
			const hash = window.location.hash.replace(/^#/, "");
			if (hash && sectionIds.includes(hash)) {
				setClickedAnchor(hash);
				setTimeout(() => {
					if (activeSection === hash) {
						setClickedAnchor(null);
					} else {
						window.dispatchEvent(new Event("scroll"));
					}
				}, 10);
			} else {
				setClickedAnchor(null);
			}
		};
		setAnchorFromHash();
		window.addEventListener("hashchange", setAnchorFromHash);
		window.addEventListener("popstate", setAnchorFromHash);
		return () => {
			window.removeEventListener("hashchange", setAnchorFromHash);
			window.removeEventListener("popstate", setAnchorFromHash);
		};
	}, [sectionIds, activeSection]);

	// Only clear clickedAnchor after scroll is complete AND scrollspy reports the section is actually in view
	React.useEffect(() => {
		if (!isScrolling && !navScrollLock && clickedAnchor && activeSection === clickedAnchor) {
			setClickedAnchor(null);
			lastClickedAnchor.current = null;
		}
	}, [activeSection, clickedAnchor, isScrolling, navScrollLock]);

	// Set hydrated and currentPath on mount, and update currentPath on hash/popstate
	React.useEffect(() => {
		setHydrated(true);
		setCurrentPath(window.location.pathname + window.location.hash);
		const onChange = () => {
			setCurrentPath(window.location.pathname + window.location.hash);
			// Debug log
			console.log("[MainNav] path:", window.location.pathname, "hash:", window.location.hash);
		};
		window.addEventListener("hashchange", onChange);
		window.addEventListener("popstate", onChange);
		return () => {
			window.removeEventListener("hashchange", onChange);
			window.removeEventListener("popstate", onChange);
		};
	}, []);

	// Clear anchor state and scroll lock when navigating to a non-anchor route (e.g., '/')
	React.useEffect(() => {
		if (!hydrated) return;
		if (typeof window === "undefined") return;
		const hash = window.location.hash.replace(/^#/, "");
		if (!hash) {
			setClickedAnchor(null);
			window.__NAV_SCROLL_LOCK__ = null;
		}
	}, [hydrated]);

	React.useEffect(() => {
		function handleLogoNav() {
			setClickedAnchor(null);
			setIsScrolling(false);
			lastClickedAnchor.current = null;
			if (typeof window !== "undefined") {
				window.__NAV_SCROLL_LOCK__ = null;
			}
		}
		window.addEventListener("chaos:nav-clear", handleLogoNav);
		return () => {
			window.removeEventListener("chaos:nav-clear", handleLogoNav);
		};
	}, []);

	// --- NAV CLEAR: Guarantee clearing on all home navigations ---
	React.useEffect(() => {
		function clearNavState() {
			setClickedAnchor(null);
			setIsScrolling(false);
			lastClickedAnchor.current = null;
			if (typeof window !== "undefined") {
				window.__NAV_SCROLL_LOCK__ = null;
			}
		}

		function handleLogoNav() {
			clearNavState();
		}

		function handleUrlChange() {
			const path = window.location.pathname + window.location.hash;
			if (path === "/" || path === "/#" || path === "") {
				// Always clear clickedAnchor so scrollspy can take over
				setClickedAnchor(null);
				setIsScrolling(false);
				lastClickedAnchor.current = null;
				if (typeof window !== "undefined") {
					window.__NAV_SCROLL_LOCK__ = null;
				}
			}
		}

		window.addEventListener("chaos:nav-clear", handleLogoNav);
		window.addEventListener("popstate", handleUrlChange);
		window.addEventListener("hashchange", handleUrlChange);

		// Astro SPA navigation (if enabled)
		if (typeof window !== "undefined") {
			window.addEventListener?.("astro:after-swap", handleUrlChange);
		}

		// On mount, clear if already at root
		if (typeof window !== "undefined") {
			const path = window.location.pathname + window.location.hash;
			if (path === "/" || path === "/#" || path === "") {
				setClickedAnchor(null);
				setIsScrolling(false);
				lastClickedAnchor.current = null;
				window.__NAV_SCROLL_LOCK__ = null;
			}
		}

		return () => {
			window.removeEventListener("chaos:nav-clear", handleLogoNav);
			window.removeEventListener("popstate", handleUrlChange);
			window.removeEventListener("hashchange", handleUrlChange);
			if (typeof window !== "undefined") {
				window.removeEventListener?.("astro:after-swap", handleUrlChange);
			}
		};
	}, []);

	// Reset nonAnchorNavClickedRef after navigation or render
	React.useEffect(() => {
		if (nonAnchorNavClickedRef.current) {
			nonAnchorNavClickedRef.current = false;
		}
	});

	// --- Guarantee only one nav button is active ---
	const hash = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
	let activeIdx = -1;
	for (let idx = 0; idx < items.menuItems.length; idx++) {
		const item = items.menuItems[idx];
		let isActive = false;
		let anchorId = null;
		if (item.href?.startsWith("/#")) {
			anchorId = item.href.replace("/#", "");
			// If a nav button was just clicked, only that one is active
			if (clickedAnchor) {
				isActive = clickedAnchor === anchorId;
			} else if (
				hydrated &&
				!nonAnchorNavClickedRef.current &&
				(navScrollLock === anchorId || hash === anchorId || activeSection === anchorId)
			) {
				isActive = true;
			}
		} else {
			if (!hydrated) {
				isActive = false;
			} else {
				const normalize = (str: string) => str.replace(/\/$/, "");
				const hrefNorm = normalize(item.href || "");
				const pathNorm = normalize(currentPath);
				if (
					nonAnchorNavClickedRef.current &&
					(hrefNorm === "" || hrefNorm === "/"
						? window.location.pathname === "/" || window.location.pathname === ""
						: pathNorm === hrefNorm ||
							pathNorm.startsWith(`${hrefNorm}/`) ||
							pathNorm.startsWith(`${hrefNorm}#`) ||
							pathNorm.startsWith(`${hrefNorm}?`))
				) {
					isActive = true;
				} else if (!(navScrollLock || clickedAnchor)) {
					if (hrefNorm === "" || hrefNorm === "/") {
						// Home button: active if at top of homepage, no hash, and not in a section
						const isHome =
							(window.location.pathname === "/" || window.location.pathname === "") &&
							window.location.hash === "";
						const noAnchorActive =
							!navScrollLock &&
							!clickedAnchor &&
							(!activeSection || !sectionIds.includes(activeSection));
						// Also active if scrollspy is above all sections
						isActive = isHome && noAnchorActive;
						// If scrollspy is above all sections (activeSection is null), Home is active
						if (isHome && !navScrollLock && !clickedAnchor && !activeSection) {
							isActive = true;
						}
					} else {
						isActive =
							pathNorm === hrefNorm ||
							pathNorm.startsWith(`${hrefNorm}/`) ||
							pathNorm.startsWith(`${hrefNorm}#`) ||
							pathNorm.startsWith(`${hrefNorm}?`);
					}
				}
			}
		}
		if (isActive && activeIdx === -1) {
			activeIdx = idx;
		}
	}
	return (
		<NavMenu.Root>
			<NavMenu.List className={styles.mainNavList}>
				{items.menuItems.map((item: NavigationLink, idx: number) => {
					const isActive = idx === activeIdx;
					let anchorId = null;
					if (item.href?.startsWith("/#")) {
						anchorId = item.href.replace("/#", "");
					}
					const handleMouseDown = () => {
						if (anchorId && typeof window !== "undefined") {
							window.__NAV_SCROLL_LOCK__ = anchorId;
						}
					};
					const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
						if (anchorId) {
							if (typeof window !== "undefined") {
								window.__NAV_SCROLL_LOCK__ = anchorId;
							}
							setClickedAnchor(anchorId);
							lastClickedAnchor.current = anchorId;
							setIsScrolling(true);
							const el = document.getElementById(anchorId);
							if (el) {
								e.preventDefault();
								const y = el.getBoundingClientRect().top + window.scrollY - 90;
								window.scrollTo({ top: y, behavior: "smooth" });
								window.history.replaceState(null, "", `/#${anchorId}`);
								setTimeout(() => {
									if (typeof window !== "undefined") {
										window.__NAV_SCROLL_LOCK__ = null;
									}
									setIsScrolling(false);
									if (lastClickedAnchor.current === anchorId && activeSection === anchorId) {
										setClickedAnchor(null);
										lastClickedAnchor.current = null;
									}
								}, 500);
							}
						} else {
							// Non-anchor nav: clear all anchor state immediately and synchronously
							if (typeof window !== "undefined") {
								window.__NAV_SCROLL_LOCK__ = null;
							}
							setClickedAnchor(null);
							lastClickedAnchor.current = null;
							setIsScrolling(false);
							nonAnchorNavClickedRef.current = true;
						}
					};
					return (
						<NavMenu.Item className={styles.mainNavItem} key={item.label}>
							<NavMenu.Link asChild>
								<Button
									as="a"
									size="small"
									target={item.target}
									href={item.href}
									color="primary"
									variant={
										Array.isArray(item.type) && item.type.includes("icon") ? "round" : "contained"
									}
									active={isActive}
									onMouseDown={handleMouseDown}
									onClick={handleClick}
								>
									{Array.isArray(item.type) && item.type.includes("icon") && iconMap[item.label] ? (
										<>
											{React.createElement(iconMap[item.label], {
												"aria-hidden": "true",
												focusable: "false",
											})}
											<span className="sr-only">{item.label}</span>
										</>
									) : (
										item.label
									)}
								</Button>
							</NavMenu.Link>
						</NavMenu.Item>
					);
				})}
			</NavMenu.List>
		</NavMenu.Root>
	);
}

export const MainNav = (props: MainNavProps) => {
	if (!props.items || !Array.isArray(props.items.menuItems) || !props.items.menuItems.length) {
		return null;
	}
	return <MainNavInner {...props} />;
};
