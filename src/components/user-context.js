import { createContext, useContext } from 'react';

const UserContext = createContext();

// Create a custom hook to access the user context
export function useUserContext() {
  return useContext(UserContext);
}

export default UserContext;
