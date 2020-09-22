import { useEffect } from 'react'
import { useFirebase } from '../Firebase'

import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';


const useAuthorization = condition => {
  const firebase = useFirebase()
  const history = useHistory()

  useEffect(() => {
    console.log('useEffect inside useAuthoriz ran');
    const listener = firebase.auth.onAuthStateChanged(
      authUser => {

        if (authUser) {
          firebase
            .user(authUser.uid)
            .once('value')
            .then(snapshot => {

              const dbUser = snapshot.val();

              if (!dbUser.roles) dbUser.roles = {}

              authUser = {
                uid: authUser.uid,
                email: authUser.email,
                ...dbUser
              }
              console.log(authUser)
              if (!condition(authUser)) history.push(ROUTES.SIGN_IN)
            })
        }
        else history.push(ROUTES.SIGN_IN);
      }
    )
    return () => listener()
  })
}

export default useAuthorization