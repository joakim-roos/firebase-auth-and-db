
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';


const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);
const INITIAL_STATE = {
  email: '',
  error: null,
};

function PasswordForgetForm(props) {
  const [input, setInput] = useState({ ...INITIAL_STATE })
  const [error, setError] = useState(null)
  const firebase = useFirebase()

  const isInvalid = input.email === '';

  const onSubmit = e => {

    firebase
      .doPasswordReset(input.email)
      .then(() => {
        setInput({ ...INITIAL_STATE })
      })
      .catch(error => {
        setError({ error })
      });

    e.preventDefault()
  }

  const onChange = e => {
    console.log(input)
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        name="email" value={input.email} onChange={(e) => onChange(e)} type="text" placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage
export { PasswordForgetLink, PasswordForgetForm }