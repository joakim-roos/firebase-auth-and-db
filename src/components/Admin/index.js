import React, { useState, useEffect } from 'react';
import * as ROLES from '../../constants/roles';

import { useFirebase } from '../Firebase'
import { useAuthorization } from '../Session'

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];


const AdminPage = () => {

  const firebase = useFirebase()
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([])

  useAuthorization(condition)

  useEffect(() => {
    setIsLoading(true)
    console.log('UE in AdminPage Ran')
    firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val()

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
      setUsers(usersList);
      setIsLoading(false)
    });
    return () => firebase.users().off()
  }, [firebase])

  return (
    <div>
      <h1>Admin</h1>
      {isLoading && <div>Loading ...</div>}
      <UserList users={users} />
    </div>
  )
};

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <br />
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <br />
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))} </ul>
);


export default AdminPage;
