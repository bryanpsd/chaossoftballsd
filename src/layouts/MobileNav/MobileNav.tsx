import { useEffect, useId, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { Button } from "~/components/Button";
import { Link } from "~/components/Link";

import * as styles from "./MobileNav.css";

type NavigationLink = {
	label: string;
	href?: string;
	target?: string;
	links?: NavigationLink[];
	type?: string | string[];
	openinnewwindow?: boolean;
};

type MobileNavProps = {
	navItems: NavigationLink[] | { menuItems: NavigationLink[] };
	currentPath?: string;
};

const Hamburger = ({ open }: { open: boolean }) => (
	<svg
		width="30"
		height="30"
		viewBox="0 0 30 30"
		aria-hidden="true"
		focusable="false"
		style={{ display: "inline-block" }}
	>
		<rect
			x="0"
			y={open ? 14 : 8}
			width="30"
			height="4"
			rx="2"
			fill="black"
			style={{
				transition: "all 0.3s",
				transform: open ? "rotate(45deg)" : "none",
				transformOrigin: "15px 16px",
			}}
		/>
		<rect
			x="0"
			y="14"
			width="30"
			height="4"
			rx="2"
			fill="black"
			style={{
				transition: "all 0.3s",
				opacity: open ? 0 : 1,
			}}
		/>
		<rect
			x="0"
			y={open ? 14 : 20}
			width="30"
			height="4"
			rx="2"
			fill="black"
			style={{
				transition: "all 0.3s",
				transform: open ? "rotate(-45deg)" : "none",
				transformOrigin: "15px 16px",
			}}
		/>
	</svg>
);

export const MobileNav = ({ navItems }: MobileNavProps) => {
	const items = Array.isArray(navItems) ? navItems : navItems?.menuItems || [];
	const [open, setOpen] = useState(false);
	const [hasMounted, setHasMounted] = useState(false);
	const [navRefresh, setNavRefresh] = useState(0);
	const [navInstance, setNavInstance] = useState(0); // force re-render on tab return
	const menuRef = useRef<HTMLDivElement>(null);
	const menuId = useId();

	useEffect(() => {
		setHasMounted(true);
		// Listen for backToTopClicked event to force nav re-render
		const handler = () => setNavRefresh((n) => n + 1);
		window.addEventListener("backToTopClicked", handler);
		return () => {
			window.removeEventListener("backToTopClicked", handler);
		};
	}, []);

	useEffect(() => {
		const cleanup = () => {
			document.body.style.overflow = "";
			document.body.classList.remove("mobile-nav-open");
			if (menuRef.current) {
				(menuRef.current as HTMLElement & { inert: boolean }).inert = true;
				// Blur any focused element inside the nav
				const active = document.activeElement as HTMLElement | null;
				if (active && menuRef.current.contains(active)) {
					active.blur();
				}
			}
		};
		if (open) {
			document.body.style.overflow = "hidden";
			document.body.classList.add("mobile-nav-open");
			if (menuRef.current) {
				(menuRef.current as HTMLElement & { inert: boolean }).inert = false;
			}
		} else {
			cleanup();
		}
		// Handle iOS Safari/tab return: always clean up and close nav on visibilitychange
		const handleVisibility = () => {
			if (document.visibilityState === "visible") {
				setOpen(false);
				cleanup();
				setNavInstance((n) => n + 1); // force re-render
			}
		};
		document.addEventListener("visibilitychange", handleVisibility);
		// Always clean up scroll lock on unmount
		return () => {
			document.removeEventListener("visibilitychange", handleVisibility);
			cleanup();
		};
	}, [open]);

	useEffect(() => {
		if (open && menuRef.current) {
			const focusable = menuRef.current.querySelectorAll("a,button");
			if (focusable.length) {
				(focusable[0] as HTMLElement).focus();
			}
		}
	}, [open]);

	useEffect(() => {
		if (menuRef.current) {
			(menuRef.current as HTMLElement & { inert: boolean }).inert = !open;
		}
	}, [open]);

	return (
		<nav className={styles.mobileNav} aria-label="Mobile Navigation" key={navInstance}>
			<Button
				variant="text"
				onClick={() => setOpen((v) => !v)}
				aria-expanded={open}
				aria-controls={menuId}
				aria-label={open ? "Close navigation" : "Open navigation"}
				type="button"
			>
				<Hamburger open={open} />
			</Button>
			<div
				id={menuId}
				ref={menuRef}
				tabIndex={-1}
				className={styles.mobileNavBackdrop}
				style={{
					boxShadow: open ? "-2px 0 16px rgba(0,0,0,0.3)" : "none",
					transform: open ? "translateX(0)" : "translateX(100%)",
				}}
			>
				<span className={styles.mobileNavHamburgerWrapper}>
					<Button
						type="button"
						variant="text"
						aria-label="Close navigation"
						onClick={() => setOpen(false)}
					>
						<MdClose size={32} />
					</Button>
				</span>
				<ul className={styles.mobileNavList}>
					{items.map((item) => {
						// Use navRefresh in dependency to force re-render
						void navRefresh;
						let isActive = false;
						if (hasMounted && item.href) {
							const { pathname, hash } = window.location;
							if (item.href.startsWith("#")) {
								isActive = hash === item.href;
							} else if (item.href.startsWith("/")) {
								const [itemPath, itemHash] = item.href.split("#");
								if (itemHash) {
									isActive = pathname === itemPath && hash === `#${itemHash}`;
								} else {
									isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
								}
							}
						}
						const openInNewWindow = item.openinnewwindow;
						return (
							<li className={styles.mobileNavListItem} key={item.href}>
								<Link
									href={item.href}
									className={
										isActive ? [styles.mobileNavLink, "active"].join(" ") : styles.mobileNavLink
									}
									aria-current={isActive ? "page" : undefined}
									onClick={() => setOpen(false)}
									tabIndex={open ? 0 : -1}
									target={openInNewWindow ? "_blank" : undefined}
									rel={openInNewWindow ? "noopener noreferrer" : undefined}
								>
									{item.label}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
			<div
				style={{
					background: open ? "rgba(0,0,0,0.5)" : "transparent",
					pointerEvents: open ? "auto" : "none",
				}}
				className={styles.mobileNavOverlay}
				aria-hidden={!open}
				onClick={() => setOpen(false)}
			/>
		</nav>
	);
};
