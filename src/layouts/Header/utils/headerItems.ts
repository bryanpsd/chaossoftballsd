import type { MainNavProps } from "../../MainNav";

export const menuItems: MainNavProps["items"] = {
	label: "Main",
	menuItems: [
		{
			label: "Contact Us",
			href: "#form",
		},
		// {
		// 	label: "Faqs",
		// 	href: "#faqs",
		// },
	],
};
