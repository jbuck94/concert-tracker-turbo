import { ReactNode } from 'react';

import { Auth0Provider } from '@auth0/auth0-react';

import { useConfig } from 'src/hooks/useConfig';

interface Auth0ConfiguredProviderProps {
  children: ReactNode;
}

export const Auth0ConfiguredProvider = ({
  children,
}: Auth0ConfiguredProviderProps) => {
  const { auth0 } = useConfig();

  return (
    <Auth0Provider
      domain={auth0.domain}
      clientId={auth0.clientId}
      authorizationParams={{
        audience: 'concert-tracker-api',
        redirect_uri:
          typeof window === 'undefined'
            ? ''
            : `${window.location.origin}/dashboard`,
      }}
    >
      {children}
    </Auth0Provider>
  );
};
