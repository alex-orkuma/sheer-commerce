

import {initializeApp} from 'firebase/app';
import {
        getAuth,  
        signInWithRedirect, 
        signInWithPopup, 
        GoogleAuthProvider, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        signOut,
        onAuthStateChanged
      } from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBQERPwt3HMUbFvS8gU4LVAPIi_2qoiux0",
    authDomain: "sheer-ng.firebaseapp.com",
    projectId: "sheer-ng",
    storageBucket: "sheer-ng.appspot.com",
    messagingSenderId: "1098426383614",
    appId: "1:1098426383614:web:f526046393cd7527f239af",
    measurementId: "G-GQ6EKQGTCD"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth();
  export const db = getFirestore();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

 export const creatUserDocumenetFromAuth = async (userAuth, additionalInfomation) => {
  
    if(!userAuth) return;
      const userRef = doc(db, 'users', userAuth.uid);
      console.log(userRef);

      const userSnapShot = await getDoc(userRef);
      console.log(userSnapShot);

      if(!userSnapShot.exists()){

        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
           await setDoc(userRef,
            {
              displayName,
              email,
              createdAt,
              ...additionalInfomation,
            });
        } catch (error) {
           console.log('error creating the user', error);
        }
      }

      return userRef;
 }

 export const CreateAuthUserWithEmailAndPassword = async (email, password) => {
        if(!email || !password)
        {
          return;
        }

      return await createUserWithEmailAndPassword(auth, email, password);
 }

 export const SignInAuthUserWithEmailAndPassword = async (email, password) => {
      if(!email || !password)
      {
        return;
      }

    return await signInWithEmailAndPassword(auth, email, password);
}

export const SignOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback);