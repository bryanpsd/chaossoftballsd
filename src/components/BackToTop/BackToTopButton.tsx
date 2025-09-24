import { useEffect, useState } from "react";
import * as styles from "~/components/BackToTop/BackToTopButton.css";
import { Button } from "~/components/Button";

export const BackToTopButton = () => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setVisible(window.scrollY > 300);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (!visible) return null;

	return (
		<Button
			type="button"
			color="primary"
			size="small"
			variant="round"
			className={styles.backToTopButton}
			aria-label="Back to top"
			onClick={scrollToTop}
		>
			↑
		</Button>
	);
};
