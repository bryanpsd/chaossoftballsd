import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";
import type { TypeSeoSkeleton } from "./TypeSeo";

export interface TypePageFields {
	title: EntryFieldTypes.Symbol;
	seo?: EntryFieldTypes.EntryLink<TypeSeoSkeleton>;
	slug?: EntryFieldTypes.Symbol;
	noIndex?: EntryFieldTypes.Boolean;
	class?: EntryFieldTypes.Symbol;
	content?: EntryFieldTypes.RichText;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;

export type TypePage<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypePageSkeleton, Modifiers, Locales>;

export function isTypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(
	entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypePage<Modifiers, Locales> {
	return entry.sys.contentType.sys.id === "page";
}
