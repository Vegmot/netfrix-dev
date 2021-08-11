import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import '../styles/Navbar.css'

const Navbar = () => {
  const [show, setShow] = useState(true)
  const history = useHistory()

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      setShow(false)
    } else {
      setShow(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', transitionNavbar)
    return () => window.removeEventListener('scroll', transitionNavbar)
  }, [])

  return (
    <section className={`navbar ${show && 'nav-black'}`}>
      <div className='nav-contents'>
        <img
          onClick={() => history.push('/')}
          className='nav-logo'
          src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
          alt='Netflix'
        />

        <img
          onClick={() => history.push('/profile')}
          className='nav-avatar'
          src='https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png'
          alt='Netflix avatar'
        />
      </div>
    </section>
  )
}

export default Navbar
