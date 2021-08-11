import React, { useRef } from 'react'
import { auth } from '../firebase'

import './SignupScreen.css'

const SignupScreen = () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const register = e => {
    e.preventDefault()

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then(authUser => {
        console.log(authUser)
      })
      .catch(e => {
        alert(e.message)
      })
  }

  const signIn = e => {
    e.preventDefault()

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then(authUser => {
        console.log(authUser)
      })
      .catch(e => alert(e.message))
  }

  return (
    <div className='signup-screen'>
      <form>
        <h1>Sign In</h1>
        <input placeholder='Email' type='email' ref={emailRef} />
        <input placeholder='Password' type='password' ref={passwordRef} />
        <button type='submit' onClick={signIn}>
          Sign In
        </button>

        <h4>
          <span className='signup-screen-gray'>New to Netfrix?</span>{' '}
          <span className='signup-screen-link' onClick={register}>
            Sign up now.
          </span>
        </h4>
      </form>
    </div>
  )
}

export default SignupScreen
