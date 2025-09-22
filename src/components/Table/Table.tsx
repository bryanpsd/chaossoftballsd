import type { ReactNode } from "react";
import * as styles from "./Table.css";

type TableCell =
	| string
	| ReactNode
	| {
			value: string | ReactNode;
			className?: string;
	  };

type Props = {
	thead: string[];
	colSpan?: number;
	tbody: Array<Array<TableCell>>;
	tfoot?: string[];
};

export const Table: React.FC<Props> = ({
	thead,
	tbody,
	tfoot,
	colSpan = 0,
}) => {
	return (
		<table className={styles.table}>
			{Array.isArray(thead) && (
				<thead className={styles.thead}>
					<tr>
						{thead.map((header) => (
							<th
								key={typeof header === "string" ? header : undefined}
								colSpan={colSpan}
								className={styles.th}
							>
								{header}
							</th>
						))}
					</tr>
				</thead>
			)}
			{Array.isArray(tbody) && (
				<tbody>
					{tbody.map((row: TableCell[], rowIndex: number) => {
						if (!Array.isArray(row)) return null;
						// Always guarantee unique row and cell keys
						let rowKey: string | undefined;
						const firstCell = row[0];
						if (
							typeof firstCell === "object" &&
							firstCell &&
							"key" in (firstCell as Record<string, unknown>) &&
							typeof (firstCell as Record<string, unknown>).key === "string"
						) {
							rowKey = String((firstCell as Record<string, unknown>).key);
						} else if (typeof firstCell === "string") {
							rowKey = `${firstCell}`;
						} else if (
							firstCell &&
							typeof firstCell === "object" &&
							"value" in (firstCell as { value: unknown }) &&
							typeof (firstCell as { value: unknown }).value === "string"
						) {
							rowKey = `${(firstCell as { value: string }).value}`;
						}
						// Always append rowIndex for uniqueness
						const uniqueRowKey =
							rowKey !== undefined ? `${rowKey}-${rowIndex}` : `${rowIndex}`;
						return (
							<tr key={uniqueRowKey} className={styles.tr}>
								{row.map((cell: TableCell, cellIndex: number) => {
									// Always append cellIndex for uniqueness
									const cellKey = `${uniqueRowKey}-cell-${cellIndex}`;
									if (cellIndex === 0) {
										return (
											<th
												key={cellKey}
												scope="row"
												className={`${styles.th} ${
													cell &&
													typeof cell === "object" &&
													"className" in (cell as { className?: string }) &&
													(cell as { className?: string }).className
														? (cell as { className?: string }).className
														: ""
												}`}
												{...(typeof cell === "string" && cell.includes("<a")
													? { dangerouslySetInnerHTML: { __html: cell } }
													: {})}
											>
												{cell && typeof cell === "object" && "value" in (cell as { value: unknown })
													? (cell as { value: ReactNode }).value
													: typeof cell === "string" && !cell.includes("<a")
														? cell
														: null}
											</th>
										);
									} else {
										return (
											<td
												key={cellKey}
												className={`${styles.td} ${
													cell &&
													typeof cell === "object" &&
													"className" in (cell as { className?: string }) &&
													(cell as { className?: string }).className
														? (cell as { className?: string }).className
														: ""
												}`}
												{...(typeof cell === "string" && cell.includes("<a")
													? { dangerouslySetInnerHTML: { __html: cell } }
													: {})}
											>
												{cell && typeof cell === "object" && "value" in (cell as { value: unknown })
													? (cell as { value: ReactNode }).value
													: typeof cell === "string" || typeof cell === "number"
														? cell
														: null}
											</td>
										);
									}
								})}
							</tr>
						);
					})}
				</tbody>
			)}
			{Array.isArray(tfoot) && (
				<tfoot className={styles.tfoot}>
					<tr>
						{tfoot.map((footer) => (
							<th
								key={typeof footer === "string" ? footer : undefined}
								colSpan={colSpan}
								className={styles.th}
							>
								{footer}
							</th>
						))}
					</tr>
				</tfoot>
			)}
		</table>
	);
};
