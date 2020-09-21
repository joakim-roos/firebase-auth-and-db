import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import { SignUpLink } from '../SignUp'
import { PasswordForgetLink } from '../PasswordForget'
import { useFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}
const SignInPage = () => {
  return (
    <>
      <div>
        Sign In Page
    </div>
      <SignInForm />
      <SignUpLink />
      <PasswordForgetLink />
    </>
  )
}

function SignInFormBase(props) {
  const [input, setInput] = useState(INITIAL_STATE)
  const [error, setError] = useState(null)
  const firebase = useFirebase()
  const isInvalid = input.password === '' || input.email === '';

  const onChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    const email = input.email
    const password = input.password
    console.log(input)
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setInput({ ...INITIAL_STATE })
        props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        setError(error)
      })

    e.preventDefault()

  }
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        name="email"
        value={input.email} onChange={(e) => onChange(e)} type="text" placeholder="Email Address"
      /> <input
        name="password" value={input.password} onChange={(e) => onChange(e)} type="password" placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
</button>
      {error && <p>{error.message}</p>}
    </form>
  )
}

const SignInForm = withRouter(SignInFormBase)

export default SignInPage
export { SignInForm };