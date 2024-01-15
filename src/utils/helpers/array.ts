// IMPORTS
import { ISubcategory } from '@/types/store';

// HOOKS
export const convertDataToArrayOfStrings = (data: ISubcategory[]) => {
  return data.map((item) => item.name);
};

export const handleAddFilter = (state: (string | number)[], filter: string) => {
  return state?.find((item) => `${item}` === filter)
    ? state
    : [...state, filter];
};

export const handleRemoveFilter = (
  state: (string | number)[],
  filter: string
) => {
  return state?.filter((item) => `${item}` !== filter);
};
