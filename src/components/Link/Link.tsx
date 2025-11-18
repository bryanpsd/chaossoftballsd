import { type ComponentPropsWithRef, forwardRef } from "react";
import { trackLinkClick, trackOutboundLink, isExternalUrl } from "~/utils/analytics";
import { jumpLink as jumpLinkClass, link } from "./Link.css";

export type LinkProps = ComponentPropsWithRef<"a"> & {
	jumpLink?: boolean;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
	{ className, children, jumpLink, onClick, ...rest },
	ref,
) {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		// Track link click in GA4
		const href = rest.href || "";
		const label = typeof children === "string" ? children : rest["aria-label"] || href;
		
		if (isExternalUrl(href)) {
			trackOutboundLink(href, label);
		} else {
			trackLinkClick(href, label, {
				link_type: jumpLink ? "jump_link" : "standard_link",
			});
		}

		onClick?.(e);
	};

	return (
		<a
			className={className ?? (jumpLink ? jumpLinkClass : link)}
			ref={ref}
			onClick={handleClick}
			{...rest}
		>
			{children}
		</a>
	);
});

Link.displayName = "Link";
