import { useContext } from 'react';
import { AuthContext } from 'src/auth/Auth0Context';

export const useAuthContext = () => {
  console.log('AuthContext:', AuthContext);
  const context = useContext(AuthContext);
  console.log('Context value:', context);

  if (!context)
    throw new Error('useAuthContext context must be use inside AuthProvider');

  return context;
};
