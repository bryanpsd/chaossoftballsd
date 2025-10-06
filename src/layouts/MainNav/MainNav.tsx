import * as NavMenu from "@radix-ui/react-navigation-menu";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Button } from "~/components/Button";
import { iconMap } from "~/utils/iconMap";
import { useScrollSpy } from "~/utils/useScrollSpy";
import * as styles from "./MainNav.css";

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
	// On initial load, if on homepage and URL has a hash, scroll to anchor
	useEffect(() => {
		if (typeof window === "undefined") return;
		if (
			(window.location.pathname === "/" || window.location.pathname === "") &&
			window.location.hash
		) {
			const hash = window.location.hash.replace(/^#/, "");
			const el = document.getElementById(hash);
			if (el) {
				// Use a timeout to ensure DOM is ready
				setTimeout(() => {
					el.scrollIntoView({ behavior: "auto", block: "start" });
				}, 10);
			}
		}
	}, []);
	const { items } = props;
	const [currentPath, setCurrentPath] = useState("");
	const [hydrated, setHydrated] = useState(false);
	const sectionIds = useMemo(
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
	const [activeSection, setScrollTarget] = useScrollSpy(sectionIds);
	const [pendingAnchor, setPendingAnchor] = useState<string | null>(null);

	// Recalculate scrollspy after hydration and hash/popstate navigation
	useEffect(() => {
		if (!hydrated) return;
		if (typeof window === "undefined") return;
		const fireScroll = () => setTimeout(() => window.dispatchEvent(new Event("scroll")), 10);
		fireScroll();
		window.addEventListener("hashchange", fireScroll);
		window.addEventListener("popstate", fireScroll);
		return () => {
			window.removeEventListener("hashchange", fireScroll);
			window.removeEventListener("popstate", fireScroll);
		};
	}, [hydrated]);

	// Track hydration and current path, and handle direct hash navigation
	const lastHashRef = React.useRef<string | null>(null);
	// Hydration/ready flag to suppress active state until hash/scrollspy logic runs
	const [navReady, setNavReady] = useState(false);
	useLayoutEffect(() => {
		setHydrated(true);
		const updatePathAndAnchor = () => {
			const newPath = window.location.pathname + window.location.hash;
			setCurrentPath(newPath);
			const hash = window.location.hash.replace(/^#/, "");
			if (window.location.pathname === "/") {
				if (hash && sectionIds.includes(hash)) {
					setPendingAnchor(hash);
					setScrollTarget(hash);
					lastHashRef.current = hash;
				} else {
					setPendingAnchor(null);
					setScrollTarget(null);
				}
			} else {
				setPendingAnchor(null);
				setScrollTarget(null);
			}
		};
		updatePathAndAnchor();
		setNavReady(true);
		window.addEventListener("hashchange", updatePathAndAnchor);
		window.addEventListener("popstate", updatePathAndAnchor);
		return () => {
			window.removeEventListener("hashchange", updatePathAndAnchor);
			window.removeEventListener("popstate", updatePathAndAnchor);
		};
	}, [sectionIds, setScrollTarget]);

	// Clear pendingAnchor as soon as scrollspy releases the lock
	useEffect(() => {
		if (pendingAnchor && activeSection === pendingAnchor) {
			setPendingAnchor(null);
		}
	}, [activeSection, pendingAnchor]);

	// Determine which nav button is active
	const getActiveIdx = () => {
		for (let idx = 0; idx < items.menuItems.length; idx++) {
			const item = items.menuItems[idx];
			let anchorId = null;
			if (item.href?.startsWith("/#")) {
				anchorId = item.href.replace("/#", "");
				if (pendingAnchor) {
					if (pendingAnchor === anchorId) return idx;
				} else if (activeSection === anchorId) {
					return idx;
				}
			} else {
				if (!hydrated) continue;
				const normalize = (str: string) => str.replace(/\/$/, "");
				const hrefNorm = normalize(item.href || "");
				const pathNorm = normalize(currentPath);
				if (
					hrefNorm === "" || hrefNorm === "/"
						? window.location.pathname === "/" || window.location.pathname === ""
						: pathNorm === hrefNorm ||
							pathNorm.startsWith(`${hrefNorm}/`) ||
							pathNorm.startsWith(`${hrefNorm}#`) ||
							pathNorm.startsWith(`${hrefNorm}?`)
				) {
					return idx;
				}
			}
		}
		return -1;
	};
	const activeIdx = getActiveIdx();

	// Always render the nav. Only suppress the active state with navReady.
	return (
		<NavMenu.Root>
			<NavMenu.List className={styles.mainNavList}>
				{items.menuItems.map((item: NavigationLink, idx: number) => {
					const isActive = navReady ? idx === activeIdx : false;
					let anchorId = null;
					if (item.href?.startsWith("/#")) {
						anchorId = item.href.replace("/#", "");
					}
					const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
						// Only set pendingAnchor/scrollTarget for in-page navigation
						if (anchorId && window.location.pathname === "/") {
							setPendingAnchor(anchorId);
							setScrollTarget(anchorId);
							const el = document.getElementById(anchorId);
							if (el) {
								e.preventDefault();
								el.scrollIntoView({ behavior: "smooth" });
								window.history.replaceState(null, "", `/#${anchorId}`);
							}
						}
						// For cross-page navigation, do nothing: let new page handle active state
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
