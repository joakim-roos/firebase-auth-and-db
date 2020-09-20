import React, { useContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withFirebase } from '../Firebase'

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import { AuthUserContext } from '../Session'
import * as ROUTES from '../../constants/routes.js';
import { FirebaseContext } from '../Firebase'

function App(props) {
  const [authUser, setAuthUser] = useState(null)
  let firebase = useContext(FirebaseContext)

  useEffect(() => {
    const listener = props.firebase.auth.onAuthStateChanged(
      authUser => {
        console.log(authUser)
        authUser
          ? setAuthUser({ authUser })
          : setAuthUser(null);
      },
    );
    return () => {
      listener()
    }
  }, [props.firebase.auth])

  return (

    <AuthUserContext.Provider value={authUser}>
      <Router>
        <div>
          <Navigation />
          <hr />

          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>

        {firebase && <div>it works</div>}

      </Router>
    </AuthUserContext.Provider>
  )
}
export default withFirebase(App)