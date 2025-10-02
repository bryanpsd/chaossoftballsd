import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeQuestionAnswerFields {
	question: EntryFieldTypes.Symbol;
	answer: EntryFieldTypes.RichText;
}

export type TypeQuestionAnswerSkeleton = EntrySkeletonType<
	TypeQuestionAnswerFields,
	"questionAnswer"
>;
export type TypeQuestionAnswer<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeQuestionAnswerSkeleton, Modifiers, Locales>;

export function isTypeQuestionAnswer<Modifiers extends ChainModifiers, Locales extends LocaleCode>(
	entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeQuestionAnswer<Modifiers, Locales> {
	return entry.sys.contentType.sys.id === "questionAnswer";
}

export type TypeQuestionAnswerProps = TypeQuestionAnswer<
	"WITHOUT_UNRESOLVABLE_LINKS",
	"en-US"
>["fields"];
