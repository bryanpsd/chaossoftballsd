import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeCustomBlockFields {
	blockType?: EntryFieldTypes.Symbol;
}

export type TypeCustomBlockSkeleton = EntrySkeletonType<TypeCustomBlockFields, "customBlock">;
export type TypeCustomBlock<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeCustomBlockSkeleton, Modifiers, Locales>;

export function isTypeCustomBlock<Modifiers extends ChainModifiers, Locales extends LocaleCode>(
	entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeCustomBlock<Modifiers, Locales> {
	return entry.sys.contentType.sys.id === "customBlock";
}
