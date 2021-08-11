import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import './LoginScreen.css'
import SignupScreen from './SignupScreen'

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false)
  const history = useHistory()

  return (
    <div className='login-screen'>
      <div className='login-screen-background'>
        <img
          onClick={() => history.push('/')}
          className='login-screen-logo'
          src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
          alt='netfrix logo png'
        />

        <button onClick={() => setSignIn(true)} className='login-screen-button'>
          Sign In
        </button>

        <div className='login-screen-gradient' />
      </div>

      <div className='login-screen-body'>
        {signIn ? (
          <SignupScreen />
        ) : (
          <>
            <h1>Unlimited films, TV programs and more.</h1>
            <h2>Watch anywhere, Cancel at any time.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>

            <div className='login-screen-input'>
              <form>
                <input type='email' placeholder='Email Address' />
                <button
                  onClick={() => setSignIn(true)}
                  className='login-screen-get-started'
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default LoginScreen
