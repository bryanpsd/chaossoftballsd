import * as NavMenu from "@radix-ui/react-navigation-menu";
import { useState } from "react";
import { Button } from "../../components/Button";
import * as styles from "./MainNav.css";

type NavigationLink = {
	label: string;
	href?: string;
	target?: string;
	links?: NavigationLink[];
};

export type MainNavProps = {
	items: {
		label: string;
		menuItems: NavigationLink[];
	};
	currentPath: string;
};

export const MainNav = ({ items, currentPath }: MainNavProps) => {
	const [active, setActive] = useState("");
	return (
		<NavMenu.Root value={active} onValueChange={(val) => setActive(val)}>
			<NavMenu.List className={styles.mainNavList}>
				{items.menuItems.map((item) => (
					<NavMenu.Item className={styles.mainNavItem} key={item.label}>
						<NavMenu.Link
							asChild
							active={!!(item.href && currentPath.startsWith(item.href))}
						>
							<Button
								as="a"
								size="small"
								target={item.target}
								href={item.href}
								color="primary"
								variant="contained"
							>
								{item.label}
							</Button>
						</NavMenu.Link>
					</NavMenu.Item>
				))}
			</NavMenu.List>
		</NavMenu.Root>
	);
};
