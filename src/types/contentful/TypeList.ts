import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

import type { TypeQuestionAnswerSkeleton } from "./TypeQuestionAnswer";

export interface TypeListFields {
	title: EntryFieldTypes.Symbol;
	type: EntryFieldTypes.Array<
		EntryFieldTypes.EntryLink<TypeQuestionAnswerSkeleton>
	>;
}

export type TypeListSkeleton = EntrySkeletonType<TypeListFields, "list">;
export type TypeList<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeListSkeleton, Modifiers, Locales>;

export interface TypePageSectionFields {
	title: EntryFieldTypes.Symbol;
	content?: EntryFieldTypes.RichText;
}
