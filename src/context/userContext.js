import { createContext, useContext } from 'react';

export const UserContext = createContext({
  
});

export const UserProvider = UserContext.Provider;

export function useUser() {
  return useContext(UserContext);
}