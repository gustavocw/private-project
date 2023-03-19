export type SuggestionType = 'text' | 'numeric';

export interface IHasSuggestion {
  getSuggestionType(): SuggestionType;
}

export function isHasSuggestion(object: Object): object is IHasSuggestion {
  return object && 'getSuggestionType' in object;
}

function hasSuggestion(value: SuggestionType) {
  return function <T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor implements IHasSuggestion {
      getSuggestionType(): SuggestionType {
        return value;
      }
    };
  };
}

export default hasSuggestion;
