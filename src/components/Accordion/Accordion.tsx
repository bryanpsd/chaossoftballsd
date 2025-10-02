import * as Accordion from "@radix-ui/react-accordion";
import * as styles from "~/components/Accordion/Accordion.css";
import { RichText } from "~/components/RichText";
import type { TypeList } from "~/types/contentful/TypeList";
import type { TypeQuestionAnswer } from "~/types/contentful/TypeQuestionAnswer";

const PlusIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
	</svg>
);
const MinusIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<path d="M3 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
	</svg>
);

type AccordionProps = {
	list: TypeList<"WITHOUT_UNRESOLVABLE_LINKS">;
};

export const BasicAccordion = ({ list }: AccordionProps) => {
	const rawType = list?.fields?.type;
	const items = Array.isArray(rawType)
		? rawType.filter(
				(entry): entry is TypeQuestionAnswer<"WITHOUT_UNRESOLVABLE_LINKS"> =>
					!!entry &&
					typeof entry.fields === "object" &&
					"question" in entry.fields &&
					"answer" in entry.fields,
			)
		: [];

	if (!items.length) {
		return <div>No valid question/answer items found in this list.</div>;
	}

	return (
		<Accordion.Root type="single" collapsible className={styles.accordionRoot}>
			{items.map((entry, idx) => (
				<Accordion.Item value={`item-${idx}`} key={entry.sys.id} className={styles.accordionItem}>
					<Accordion.Header>
						<Accordion.Trigger className={styles.accordionTrigger}>
							<span
								style={{
									display: "flex",
									alignItems: "center",
									gap: "0.5em",
									justifyContent: "space-between",
								}}
							>
								<span>{String(entry.fields.question)}</span>
								<span aria-hidden="true" className={styles.accordionIcon}>
									<span className={styles.plusIcon}>
										<PlusIcon />
									</span>
									<span className={styles.minusIcon}>
										<MinusIcon />
									</span>
								</span>
							</span>
						</Accordion.Trigger>
					</Accordion.Header>
					<Accordion.Content className={styles.accordionContent}>
						<RichText richText={entry.fields.answer} />
					</Accordion.Content>
				</Accordion.Item>
			))}
		</Accordion.Root>
	);
};
