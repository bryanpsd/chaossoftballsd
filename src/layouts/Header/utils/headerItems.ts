import type { MainNavProps } from "../../MainNav";

export const menuItems: MainNavProps["items"] = {
	label: "Main",
	menuItems: [
		{
			label: "About",
			href: "#intro",
		},
		{
			label: "Contact",
			href: "#form",
		},
		{
			label: "Faqs",
			href: "#faqs",
		},
	],
};
