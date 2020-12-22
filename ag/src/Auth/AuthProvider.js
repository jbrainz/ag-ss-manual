import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [newErrors, setErrors] = useState(null);
  let errorCode;
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        newErrors,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            errorCode = e.code;
            if (errorCode === 'auth/wrong-password') {
              setErrors('Wrong Email or Password');
              console.log('Wrong Email or Password');
            }
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            setErrors(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            setErrors(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
