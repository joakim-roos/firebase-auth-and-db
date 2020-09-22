import React, { useContext } from 'react';
import { AuthUserContext, useAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const condition = authUser => !!authUser;

const AccountPage = () => {
  const authUser = useContext(AuthUserContext)
  useAuthorization(condition)
  return (
    <>
      {authUser && (
        <div>
          <h1>{authUser.email}</h1>
          <PasswordForgetForm />
          <PasswordChangeForm />
        </div>
      )}
    </>
  )
};


export default AccountPage;