import * as Accordion from "@radix-ui/react-accordion";
import type { TypeList } from "../../types/contentful/TypeList";
import type { TypeQuestionAnswer } from "../../types/contentful/TypeQuestionAnswer";
import { RichText } from "../RichText";
import * as styles from "./Accordion.css";

type AccordionProps = {
	list: TypeList<"WITHOUT_UNRESOLVABLE_LINKS">;
};

export const BasicAccordion = ({ list }: AccordionProps) => {
	const items = list.fields.type as
		| TypeQuestionAnswer<"WITHOUT_UNRESOLVABLE_LINKS">[]
		| undefined;
	if (!items || !Array.isArray(items)) return null;
	return (
		<Accordion.Root type="single" collapsible className={styles.accordionRoot}>
			{items.map((entry, idx) =>
				entry?.fields?.question && entry?.fields?.answer ? (
					<Accordion.Item
						value={`item-${idx}`}
						key={entry.sys.id}
						className={styles.accordionItem}
					>
						<Accordion.Header>
							<Accordion.Trigger className={styles.accordionTrigger}>
								{String(entry.fields.question)}
							</Accordion.Trigger>
						</Accordion.Header>
						<Accordion.Content className={styles.accordionContent}>
							<RichText richText={entry.fields.answer} />
						</Accordion.Content>
					</Accordion.Item>
				) : null,
			)}
		</Accordion.Root>
	);
};
