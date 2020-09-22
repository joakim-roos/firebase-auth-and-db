
import React, { useContext } from 'react';
import { AuthUserContext, useAuthorization } from '../Session';


const HomePage = () => {
  const condition = authUser => !!authUser;
  const authUser = useContext(AuthUserContext)
  useAuthorization(condition);

  if (condition(authUser)) return <div>authorized</div>
  return null
};

export default HomePage;