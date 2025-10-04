import { color } from "~/styles/tokens/colors";
import * as styles from "./BrandColors.css";

const brandColors = [
	{ name: "Purple", value: color.brand.purple },
	{ name: "Yellow", value: color.brand.yellow },
	{ name: "Orange", value: color.brand.orange },
	{ name: "Pink", value: color.brand.pink },
	{ name: "Green", value: color.brand.green },
	{ name: "Gray", value: color.brand.gray },
	{ name: "White", value: color.brand.white },
	{ name: "Black", value: color.brand.black },
	{ name: "Dark Gray", value: color.brand.darkGray },
	{ name: "Red", value: color.brand.red },
];

export const BrandColors = () => (
	<div className={styles.palette}>
		{brandColors.map((c) => (
			<div key={c.name} className={styles.swatch}>
				<div className={styles.colorBox} style={{ background: c.value }} />
				<div className={styles.label}>
					<strong>{c.name}</strong>
					<span>{c.value}</span>
				</div>
			</div>
		))}
	</div>
);
