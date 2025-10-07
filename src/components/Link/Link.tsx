import { type ComponentPropsWithRef, forwardRef } from "react";
import { jumpLink as jumpLinkClass, link } from "./Link.css";

export type LinkProps = ComponentPropsWithRef<"a"> & {
	jumpLink?: boolean;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
	{ className, children, jumpLink, ...rest },
	ref,
) {
	return (
		<a className={className ?? (jumpLink ? jumpLinkClass : link)} ref={ref} {...rest}>
			{children}
		</a>
	);
});

Link.displayName = "Link";
