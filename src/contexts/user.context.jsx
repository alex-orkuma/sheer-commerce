import {createContext, useState, useEffect} from 'react'

import {onAuthStateChangedListner, creatUserDocumenetFromAuth} from '../utils/firebase.utils'

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};


    useEffect(() => {
      const unsuscribe =  onAuthStateChangedListner((user) => {
          if(user)
          {
            creatUserDocumenetFromAuth(user);
          }
          setCurrentUser(user);
          console.log(user);
      })

      return unsuscribe;
    }, []);

    return(
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}