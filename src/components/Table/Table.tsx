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
	thead: TableCell[];
	colSpan?: number;
	tbody: Array<Array<TableCell>>;
	tfoot?: TableCell[];
};

export const Table: React.FC<Props> = ({ thead, tbody, tfoot, colSpan = 0 }) => {
	return (
		<table className={styles.table}>
			{Array.isArray(thead) && (
				<thead className={styles.thead}>
					<tr>
						{thead.map((header, idx) => {
							let content: ReactNode;
							let className = styles.th;
							if (header && typeof header === "object" && "value" in header) {
								content = header.value;
								if ("className" in header && header.className) {
									className += ` ${header.className}`;
								}
							} else {
								content = header as ReactNode;
							}
							return (
								<th
									key={typeof content === "string" ? `${content}-${idx}` : idx}
									colSpan={colSpan}
									className={className}
								>
									{content}
								</th>
							);
						})}
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
						const uniqueRowKey = rowKey !== undefined ? `${rowKey}-${rowIndex}` : `${rowIndex}`;
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
											>
												{(() => {
													if (cell && typeof cell === "object" && "value" in cell) {
														return (cell as { value: ReactNode }).value;
													}
													if (typeof cell === "string" || typeof cell === "number") {
														return cell;
													}
													return null;
												})()}
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
											>
												{(() => {
													if (cell && typeof cell === "object" && "value" in cell) {
														return (cell as { value: ReactNode }).value;
													}
													if (typeof cell === "string" || typeof cell === "number") {
														return cell;
													}
													return null;
												})()}
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
						{tfoot.map((footer, idx) => {
							let content: ReactNode;
							let className = styles.th;
							if (footer && typeof footer === "object" && "value" in footer) {
								content = footer.value;
								if ("className" in footer && footer.className) {
									className += ` ${footer.className}`;
								}
							} else {
								content = footer as ReactNode;
							}
							return (
								<th
									key={typeof content === "string" ? `${content}-${idx}` : idx}
									colSpan={colSpan}
									className={className}
								>
									{content}
								</th>
							);
						})}
					</tr>
				</tfoot>
			)}
		</table>
	);
};
