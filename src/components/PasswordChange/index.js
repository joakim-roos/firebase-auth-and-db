import React, { useState } from 'react'
import { useFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '', passwordTwo: '', error: null,
};

function PasswordChangeForm() {
  const [input, setInput] = useState({ ...INITIAL_STATE })
  const [error, setError] = useState('')
  const firebase = useFirebase()

  const isInvalid =
    input.passwordOne !== input.passwordTwo || input.passwordOne === '';

  const onSubmit = e => {
    firebase
      .doPasswordUpate(input.passwordOne)
      .then(() => {
        setInput({ ...INITIAL_STATE })
      })
      .catch(error => {
        setError({ error })
      })

    e.preventDefault()
  }

  const onChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        name="passwordOne" value={input.passwordOne} onChange={(e) => onChange(e)} type="password" placeholder="New Password"
      /> <input
        name="passwordTwo" value={input.passwordTwo} onChange={(e) => onChange(e)} type="password" placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
}

export default PasswordChangeForm