import { AuthContext } from './AuthContextProvider';
import { useContext } from 'react';

export const UseAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error(
      'useAuthContext must be used inside an WorkoutsContextProvider'
    );
  }

  return context;
};
