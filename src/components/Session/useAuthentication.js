import { useState, useEffect } from 'react'
import { useFirebase } from '../Firebase';

export const useAuthentication = (props) => {
  let firebase = useFirebase();

  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? setAuthUser({ authUser })
          : setAuthUser(null);
      });
    return () => {
      listener()
    }
  }, [firebase.auth])
  return authUser
}

/* const withAuthentication = Component => props => {
  const authUser = useAuthentication()

  return (
    <AuthUserContext.Provider value={authUser}>
      <Component {...props} />
    </AuthUserContext.Provider>
  )
} */

/* export default withAuthentication; */