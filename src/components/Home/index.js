import React, { useContext } from 'react';
import { useAuthorization } from '../Session';
import AuthUserContext from '../Session/context'

const HomePage = () => {
  const condition = authUser => !!authUser;
  const authUser = useContext(AuthUserContext)

  const useAuth = useAuthorization(condition);

  if (condition(authUser)) return <div>authorized</div>
  if (!condition(authUser)) return null
};

export default HomePage;