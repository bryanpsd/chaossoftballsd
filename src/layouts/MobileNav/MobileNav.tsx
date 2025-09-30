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
};

type MobileNavProps = {
	navItems: NavigationLink[] | { menuItems: NavigationLink[] };
};

// Hamburger icon animation (moved outside component)
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
	const menuRef = useRef<HTMLDivElement>(null);
	const menuId = useId();

	// Disable body scroll when mobile nav is open
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
			document.body.classList.add("mobile-nav-open");
		} else {
			document.body.style.overflow = "";
			document.body.classList.remove("mobile-nav-open");
		}
		return () => {
			document.body.style.overflow = "";
			document.body.classList.remove("mobile-nav-open");
		};
	}, [open]);

	// Trap focus in menu when open
	useEffect(() => {
		if (open && menuRef.current) {
			const focusable = menuRef.current.querySelectorAll("a,button");
			if (focusable.length) {
				(focusable[0] as HTMLElement).focus();
			}
		}
	}, [open]);

	// Set inert attribute directly for accessibility
	useEffect(() => {
		if (menuRef.current) {
			// inert is not in React types yet, so we assert HTMLElement and set inert
			(menuRef.current as HTMLElement & { inert: boolean }).inert = !open;
		}
	}, [open]);

	return (
		<nav className={styles.mobileNav} aria-label="Mobile Navigation">
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
					{items.map((item) => (
						<li className={styles.mobileNavListItem} key={item.href}>
							<Link
								href={item.href}
								className={styles.mobileNavLink}
								onClick={() => setOpen(false)}
								tabIndex={open ? 0 : -1}
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
			{/* Optional: Add a semi-transparent backdrop for focus/UX */}
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
