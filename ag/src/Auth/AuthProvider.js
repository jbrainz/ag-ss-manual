import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [newErrors, setErrors] = useState('');
  const [er, setEr] = useState(false);

  let errorCode;
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        newErrors,
        setEr,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            errorCode = e.code;
            console.log(errorCode);
            if (errorCode === 'auth/wrong-password') {
              setErrors('Wrong Email or Password');
              if (!er) {
                setErrors('');
              }
              console.log('Wrong Email or Password');
            } else if (errorCode === 'auth/user-not-found') {
              setErrors('Invalid login credentials');
              if (!er) {
                setErrors('');
              }
            } else {
              setErrors('');
            }
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            errorCode = e.code;
            if (errorCode === 'auth/email-already-in-use') {
              setErrors('Email already registered');
              if (!er) {
                setErrors('');
              }
            }
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
            setErrors('');
          } catch (e) {
            setErrors(e);
          }
        },
        forgotPassword: async (email) => {
          try {
            await auth().sendPasswordResetEmail(email);
          } catch (e) {
            errorCode = e.code;
            if (errorCode === 'auth/user-not-found') {
              setErrors('Email not registered');
              if (!er) {
                setErrors('');
              }
            }
            console.log(e);
          }
        },
        // facebook: async () => {
        //   try {
        //     const result = await LoginManager.logInWithPermissions([
        //       'public_profile',
        //       'email',
        //     ]);

        //     if (result.isCancelled) {
        //       setErrors('You Canceled the login process');
        //     }
        //     const data = await AccessToken.getCurrentAccessToken();
        //     if (!data) {
        //       setErrors('Something went wrong please try again.');
        //       const facebookCredential = auth.FacebookAuthProvider.credential(
        //         data.accessToken,
        //       );
        //       return auth().signInWithCredential(facebookCredential);
        //     }
        //   } catch (error) {
        //     console.log(error);
        //   }
        // },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
