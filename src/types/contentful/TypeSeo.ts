import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeSeoFields {
	internalTitle?: EntryFieldTypes.Symbol;
	title: EntryFieldTypes.Symbol;
	description: EntryFieldTypes.Symbol;
	image?: EntryFieldTypes.AssetLink;
}

export type TypeSeoSkeleton = EntrySkeletonType<TypeSeoFields, "seo">;
export type TypeSeo<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeSeoSkeleton, Modifiers, Locales>;

export function isTypeSeo<Modifiers extends ChainModifiers, Locales extends LocaleCode>(
	entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeSeo<Modifiers, Locales> {
	return entry.sys.contentType.sys.id === "seo";
}

export type TypeSeoProps = TypeSeo<"WITHOUT_UNRESOLVABLE_LINKS", "en-US">["fields"];
