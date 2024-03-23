import { ReactNode, createContext, useEffect, useReducer } from 'react';
import { RedirectLoginOptions, useAuth0 } from '@auth0/auth0-react';
import {
  ActionMap,
  Auth0ContextType,
  AuthState,
  AuthUser,
} from 'src/auth/types';

import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { useMeQuery } from 'apollo-hooks';

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

enum Types {
  init = 'INITIALIZE',
  login = 'LOGIN',
  logout = 'LOGOUT',
}

type Auth0AuthPayload = {
  [Types.init]: {
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: AuthUser;
  };
  [Types.login]: {
    user: AuthUser;
  };
  [Types.logout]: undefined;
};

type Auth0Actions =
  ActionMap<Auth0AuthPayload>[keyof ActionMap<Auth0AuthPayload>];

const reducer = (state: AuthState, action: Auth0Actions): AuthState => {
  if (action.type === Types.init) {
    const { isAuthenticated, user, isInitialized } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized,
      user,
    };
  }
  if (action.type === Types.login) {
    const { user } = action.payload;
    return { ...state, isAuthenticated: true, user };
  }
  if (action.type === Types.logout) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
};

const AuthContext = createContext<Auth0ContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isAuthenticated,
    loginWithRedirect,
    logout: auth0Logout,
    isLoading,
  } = useAuth0();

  const { data: user, loading: userLoading } = useMeQuery({
    skip: !isAuthenticated,
  });

  useEffect(() => {
    const initialize = async () => {
      try {
        if (isAuthenticated) {
          dispatch({
            type: Types.init,
            payload: {
              isAuthenticated,
              user: user?.me,
              isInitialized: !isLoading,
            },
          });
        } else {
          dispatch({
            type: Types.init,
            payload: { isAuthenticated, user: null, isInitialized: !isLoading },
          });
        }
      } catch (err) {
        dispatch({
          type: Types.init,
          payload: {
            isAuthenticated: false,
            user: null,
            isInitialized: !isLoading,
          },
        });
      }
    };

    initialize();
  }, [isLoading, isAuthenticated, userLoading, user]);

  const login = async (options?: RedirectLoginOptions) => {
    await loginWithRedirect(options);

    if (isAuthenticated) {
      dispatch({ type: Types.login, payload: { user: user?.me } });
    }
  };

  const logout = () => {
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });
    dispatch({ type: Types.logout });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'auth0',
        login,
        logout,
      }}
    >
      {isLoading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
