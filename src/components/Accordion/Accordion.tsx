import * as Accordion from "@radix-ui/react-accordion";

export const BasicAccordion = () => {
	return (
		<Accordion.Root type="single" collapsible defaultValue="item-1">
			<Accordion.Item value="item-1">
				<Accordion.Header>
					<Accordion.Trigger>What is Chaos Softball?</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content>
					Chaos Softball is a community softball team based in San Diego.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Header>
					<Accordion.Trigger>How do I join?</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content>
					Contact us through our website or social media to get started!
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Header>
					<Accordion.Trigger>When are the games?</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content>
					Games are typically held on weekends. Check our schedule for details.
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	);
};
