import React, {useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles';
import { useFirebase } from '../Firebase'

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  isAdmin: false,
};

const SignUpPage = () => {
  return (
  <div>
    SignUp Page
     <SignUpForm />
    </div>
  )
}

function SignUpFormBase(props) {
  const firebase = useFirebase()
  const [input, setInput] = useState(INITIAL_STATE)
  const [error, setError] = useState('')

  const isInvalid =
    input.passwordOne !== input.passwordTwo ||
    input.passwordOne === '' ||
    input.email === '' ||
    input.username === '';
  
  const onChange = e => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const onChangeCheckbox = e => {
    setInput({...input, [e.target.name]: e.target.checked });
  };

  const onSubmit = e => {
    const email = input.email
    const password = input.passwordOne
    const username = input.username
    const isAdmin = input.isAdmin

    const roles = {};
    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return firebase
          .user(authUser.user.uid)
          .set({
            username,
            email, 
            roles
          })
      })
      .then(authUser => {
        setInput({ ...INITIAL_STATE })
        props.history.push(ROUTES.HOME)
      })
      .catch(error => {
      setError(error)
      })
    
    e.preventDefault();

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

      <label>
        Admin:
          <input
          name="isAdmin"
          type="checkbox"
          checked={input.isAdmin}
          onChange={(e) => onChangeCheckbox(e)}
        />
      </label>

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

const SignUpForm = withRouter(SignUpFormBase)

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
)
export default SignUpPage
export {SignUpForm, SignUpLink}