import { useContext } from 'react';

import {
  Config,
  ConfigContext,
} from 'src/components/provider/AppConfigProvider';

export const useConfig = (): Config => {
  const appContext = useContext(ConfigContext);
  if (!appContext) {
    throw new Error('AppContext is not initialized.');
  }

  return appContext;
};
