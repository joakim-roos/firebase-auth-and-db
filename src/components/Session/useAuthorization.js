import { useEffect, useContext, useState } from 'react'
import { useFirebase } from '../Firebase'

import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';


const useAuthorization = condition => {
  const firebase = useFirebase()
  const history = useHistory()

  useEffect(() => {
    const listener =
      firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            history.push(ROUTES.SIGN_IN);
          }
        }
      )
    return () => listener()
  })
}

export default useAuthorization