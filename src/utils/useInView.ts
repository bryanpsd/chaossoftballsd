import { type RefObject, useEffect, useRef, useState } from "react";

/**
 * useInView - React hook to detect when an element enters the viewport.
 * @param {Object} options - IntersectionObserver options
 * @returns [ref, inView]
 */
export function useInView<T extends HTMLElement = HTMLElement>(
	options?: IntersectionObserverInit,
): [RefObject<T>, boolean] {
	const ref = useRef<T>(null as unknown as T);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;
		const observer = new window.IntersectionObserver(
			([entry]) => setInView(entry.isIntersecting),
			options,
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, [options]);

	return [ref, inView];
}
