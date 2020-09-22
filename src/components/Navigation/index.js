import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes.js'
import { AuthUserContext } from '../Session'

import SignOutButton from '../SignOut'

const Navigation = () => {
  let authUser = useContext(AuthUserContext)
  console.log(authUser)
  return (
    <div>
      {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </div>
  )
}


const NavigationAuth = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>
          Landing
        </Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>
          Home
        </Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>
          Account
        </Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  </div>
)

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li> <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
)
export default Navigation