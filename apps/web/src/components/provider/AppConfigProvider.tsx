import { ReactNode, createContext, useState } from 'react';

import { AppConfig, Auth0Config } from 'src/pages/_app';

export interface Config {
  auth0: Auth0Config;
  appConfig: AppConfig;
}

interface AppConfigProviderProps {
  appConfig: Config | undefined;
  children: ReactNode;
}

export const ConfigContext = createContext<Config | null>(null);

// ConfigProvider is responsible for making basic app configuration
// available to the dashboard.
export const ConfigProvider = (props: AppConfigProviderProps) => {
  const { appConfig: appConfigProp, children } = props;

  const [appConfig, _] = useState<Config>(() => {
    if (!appConfigProp?.appConfig || !appConfigProp?.auth0) {
      throw new Error(
        'Cannot initialize AppConfigProvider without the app config'
      );
    }

    return appConfigProp;
  });

  return (
    <ConfigContext.Provider value={appConfig}>
      {children}
    </ConfigContext.Provider>
  );
};
