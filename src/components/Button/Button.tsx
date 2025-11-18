import type { FC } from "react";
import React, { type ElementType, forwardRef, type MouseEventHandler, type ReactNode } from "react";
import {
	type ButtonVariants,
	button,
	buttonIcon,
	buttonLabel,
} from "~/components/Button/Button.css";
import type { PolymorphicComponentPropWithRef, PolymorphicRef } from "~/types/PolymorphicComponent";
import { trackButtonClick, trackOutboundLink, isExternalUrl } from "~/utils/analytics";
import { concatClasses } from "~/utils/concatClasses";

export type ButtonProps<C extends ElementType = "button"> = PolymorphicComponentPropWithRef<
	C,
	ButtonVariants & {
		"data-testid"?: string;
		href?: string | undefined;
		external?: boolean;
		type?: "button" | "reset" | "submit";
		startIcon?: ReactNode;
		endIcon?: ReactNode;
		className?: string;
		classes?: Partial<{
			root: string;
			label: string;
			startIcon: string;
			endIcon: string;
		}>;
		round?: boolean;
		active?: boolean;
	}
>;

type ChildrenProps = {
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	size?: ButtonProps["size"];
	classes?: Partial<{
		label: string;
		startIcon: string;
		endIcon: string;
	}>;
	children?: ReactNode;
};

const Children: FC<ChildrenProps> = ({ startIcon, endIcon, size, classes, children }) => (
	<span className={concatClasses([buttonLabel, classes?.label])}>
		{startIcon ? (
			<span
				className={concatClasses([buttonIcon({ position: "start", size }), classes?.startIcon])}
			>
				{startIcon}
			</span>
		) : null}
		{children}
		{endIcon ? (
			<span className={concatClasses([buttonIcon({ position: "end", size }), classes?.endIcon])}>
				{endIcon}
			</span>
		) : null}
	</span>
);

export const Button = forwardRef(
	<C extends ElementType>(
		{
			as: asComponent,
			onClick,
			children,
			type = "button",
			className,
			classes,
			color,
			size,
			variant,
			startIcon,
			endIcon,
			active,
			...rest
		}: ButtonProps<C>,
		ref: PolymorphicRef<C>,
	) => {
		const handleClick: MouseEventHandler = (e) => {
			// Track button click in GA4
			const label = typeof children === "string" ? children : (rest as { "aria-label"?: string })["aria-label"] || "Button";
			const href = rest.href as string | undefined;
			
			if (href && isExternalUrl(href)) {
				trackOutboundLink(href, label);
			} else {
				trackButtonClick(label, {
					button_variant: variant,
					button_color: color,
					button_size: size,
					...(href && { link_url: href }),
				});
			}

			onClick?.(e as React.MouseEvent<HTMLButtonElement>);
		};

		const Component = asComponent || "button";

		// Only add 'type' prop if rendering a button, not an anchor
		const componentProps: React.ComponentPropsWithRef<ElementType> = {
			...rest,
			onClick: handleClick,
			className: concatClasses([
				className,
				classes?.root,
				button({ color, size, variant, active }),
			]),
			ref,
			tabIndex: rest.disabled ? -1 : rest.tabIndex,
		};
		if ((asComponent || Component) === "button") {
			(componentProps as React.ButtonHTMLAttributes<HTMLButtonElement>).type = type;
		}
		return (
			<Component {...componentProps}>
				<Children startIcon={startIcon} endIcon={endIcon} size={size} classes={classes}>
					{children}
				</Children>
			</Component>
		);
	},
);
