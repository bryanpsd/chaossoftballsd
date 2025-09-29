import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeGalleryFields {
	name?: EntryFieldTypes.Symbol;
	photos?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type TypeGallerySkeleton = EntrySkeletonType<
	TypeGalleryFields,
	"gallery"
>;
export type TypeGallery<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeGallerySkeleton, Modifiers, Locales>;

export function isTypeGallery<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode,
>(
	entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeGallery<Modifiers, Locales> {
	return entry.sys.contentType.sys.id === "gallery";
}
