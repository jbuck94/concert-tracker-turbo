import { Dispatch, SetStateAction, useState } from 'react';
import debounce from 'lodash.debounce';

export const useDebouncedState = <T>(
  initialState: T,
  wait: number = 300
): [T, Dispatch<SetStateAction<T>>, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialState);
  const debouncedSetValue = debounce(setValue, wait);

  return [value, setValue, debouncedSetValue];
};
