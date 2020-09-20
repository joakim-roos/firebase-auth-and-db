import React, {useState, useContext} from 'react'
import { Link, withRouter } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import { withFirebase } from '../Firebase'

const SignUpPage = () => {
  return (
  <div>
    SignUp Page
     <SignUpForm />
    </div>
  )
}

function SignUpFormBase(props) {

  const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };
  const [input, setInput] = useState(INITIAL_STATE)
  const [error, setError] = useState(null)

  const isInvalid =
    input.passwordOne !== input.passwordTwo ||
    input.passwordOne === '' ||
    input.email === '' ||
    input.username === '';
  
  const onChange = event => {
    setInput({...input, [event.target.name]: event.target.value})
  }

  const onSubmit = event => {
    const email = input.email
    const password = input.passwordOne
    props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        setInput({ ...INITIAL_STATE })
        props.history.push(ROUTES.HOME)
      })
      .catch(error => {
      setError(error)
      })
    
    event.preventDefault();

  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        name='username'
        value={input.username}
        onChange={(e) => onChange(e)}
        type='text'
        placeholder='Full Name'
      />

      <input
        name="email"
        value={input.email}
        onChange={(e) => onChange(e)}
        type="text"
        placeholder="Email Address"
      />

      <input
        name="passwordOne"
        value={input.passwordOne}
        onChange={(e) => onChange(e)}
        type="password"
        placeholder="Password"
      />

      <input
        name="passwordTwo"
        value={input.passwordTwo}
        onChange={(e) => onChange(e)}
        type="password"
        placeholder="Confirm Password"
      />

      <button
        type="submit"
        disabled={isInvalid}
      >
        Sign Up
      </button>

      {error && <p>{error.message}</p>}
    </form>
  )
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase))

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
)
export default SignUpPage
export {SignUpForm, SignUpLink}