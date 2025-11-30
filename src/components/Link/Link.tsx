import { type ComponentPropsWithRef, forwardRef } from "react";
import { isExternalUrl, trackLinkClick, trackOutboundLink } from "~/utils/analytics";
import { jumpLink as jumpLinkClass, link } from "./Link.css";

export type LinkProps = ComponentPropsWithRef<"a"> & {
	jumpLink?: boolean;
};

export const Link = forwardRef<HTMLElement, LinkProps>(function Link(
	{ className, children, jumpLink, onClick, ...rest },
	ref,
) {
	const hrefProp = (rest.href as string | undefined) || undefined;

	const getLabel = (href = "") =>
		typeof children === "string"
			? children
			: (rest as { "aria-label"?: string })["aria-label"] || href;

	const handleAnchorClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
		const href = hrefProp || "";
		const label = getLabel(href);

		if (isExternalUrl(href)) {
			trackOutboundLink(href, label);
		} else {
			trackLinkClick(href, label, { link_type: jumpLink ? "jump_link" : "standard_link" });
		}

		onClick?.(e as React.MouseEvent<HTMLAnchorElement>);
	};

	const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		const href = hrefProp || "";
		const label = getLabel(href);

		if (isExternalUrl(href)) {
			trackOutboundLink(href, label);
		} else {
			trackLinkClick(href, label, { link_type: jumpLink ? "jump_link" : "standard_link" });
		}

		// Call the original onClick if present (cast to compatible signature)
		(onClick as unknown as React.MouseEventHandler<HTMLButtonElement>)?.(e);
	};

	// If an href is provided, render an anchor. Otherwise render a semantic button.
	if (hrefProp) {
		return (
			<a
				className={className ?? (jumpLink ? jumpLinkClass : link)}
				ref={ref as unknown as React.Ref<HTMLAnchorElement>}
				href={hrefProp}
				onClick={handleAnchorClick}
				{...rest}
			>
				{children}
			</a>
		);
	}

	// Remove href from props when rendering button
	const { href: _href, ...buttonRest } = rest as Record<string, unknown>;
	return (
		<button
			className={className ?? (jumpLink ? jumpLinkClass : link)}
			ref={ref as unknown as React.Ref<HTMLButtonElement>}
			onClick={handleButtonClick}
			type="button"
			{...(buttonRest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
		>
			{children}
		</button>
	);
});

Link.displayName = "Link";
