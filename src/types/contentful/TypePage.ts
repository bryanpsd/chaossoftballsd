import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypePageFields {
	title: EntryFieldTypes.Symbol;
	seoTitle?: EntryFieldTypes.Symbol;
	seoDescription?: EntryFieldTypes.Symbol;
	slug?: EntryFieldTypes.Symbol;
	class?: EntryFieldTypes.Symbol;
	content?: EntryFieldTypes.RichText;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;

export type TypePage<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypePageSkeleton, Modifiers, Locales>;

export function isTypePage<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode,
>(
	entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypePage<Modifiers, Locales> {
	return entry.sys.contentType.sys.id === "page";
}
