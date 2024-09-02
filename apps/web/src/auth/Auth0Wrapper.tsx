import { useEffect, useState } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { useConfig } from 'src/hooks/useConfig';
import { ReactNode } from 'react';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

const Auth0Wrapper = ({ children }: { children: ReactNode }) => {
  const { auth0, appConfig } = useConfig();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (auth0 && appConfig) {
      setIsLoaded(true);
    }
  }, [auth0, appConfig]);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <Auth0Provider
      domain={auth0.domain}
      clientId={auth0.clientId}
      authorizationParams={{
        redirect_uri:
          typeof window !== 'undefined' ? window.location.origin : '',
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0Wrapper;
