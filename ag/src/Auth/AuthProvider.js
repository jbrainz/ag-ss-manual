import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [newErrors, setErrors] = useState('');
  const [er, setEr] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const [passedData, setData] = useState('');
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '644781812246-pbl0c3plsd2d7h2fdgj4n1a38gf4ntht.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);
  let errorCode;
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        newErrors,
        setEr,
        er,
        loggedIn,
        passedData,
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
            } else if (errorCode === 'auth/unknown') {
              setErrors('Something went wrong');
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
            } else if (errorCode === 'auth/unknown') {
              setErrors('Something went wrong');
              if (!er) {
                setErrors('');
              }
            } else {
              setErrors('');
            }
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
            setErrors('');
          } catch (e) {
            setErrors(e.code);
          }
        },
        googleOut: async () => {
          try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setloggedIn(false);
            setUser(null);
            setErrors('');
          } catch (e) {
            setErrors(e.code);
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
            } else if (errorCode === 'auth/unknown') {
              setErrors('Something went wrong');
              if (!er) {
                setErrors('');
              }
            } else {
              setErrors('');
            }
            console.log(e);
          }
        },
        _signIn: async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const {accessToken, idToken} = await GoogleSignin.signIn();
            setUser(idToken);
            setloggedIn(true);
          } catch (err) {
            if (err.code === statusCodes.SIGN_IN_CANCELLED) {
              newErrors('Canceled by user');
            } else if (err.code === statusCodes.IN_PROGRESS) {
              console.log('loading');
            } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              newErrors('Play services not available');
            } else {
              console.log(err);
            }
          }
        },
        navigateData: (d) => {
          setData(d);
          console.log(d);
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
