import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  user: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [userID, setUserID] = useState();

  useEffect(() => {
    async function fetchToken(){
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');
        if(storedToken) {
          setUserID(storedUser);

            setAuthToken(storedToken);
        }
    }


    fetchToken();
  }, [])
  
// TODO add refresh token
  function authenticate(token) {
    setUserID(token.email.split('@')[0]);

    setAuthToken(token.idToken);
    AsyncStorage.setItem('token', token.idToken);
    AsyncStorage.setItem('user', token.email.split('@')[0]);
  }

  function logout() {
    setAuthToken(null);
    setUserID(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('user');
  }

  const value = {
    token: authToken,
    user: userID,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;