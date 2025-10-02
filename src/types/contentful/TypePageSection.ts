import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypePageSectionFields {
	title: EntryFieldTypes.Symbol;
	content?: EntryFieldTypes.RichText;
}

export type TypePageSectionSkeleton = EntrySkeletonType<TypePageSectionFields, "pageSection">;
export type TypePageSection<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypePageSectionSkeleton, Modifiers, Locales>;

export function isTypePageSection<Modifiers extends ChainModifiers, Locales extends LocaleCode>(
	entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypePageSection<Modifiers, Locales> {
	return entry.sys.contentType.sys.id === "pageSection";
}

export type TypePageSectionProps = TypePageSection<"WITHOUT_UNRESOLVABLE_LINKS", "en-US">["fields"];
