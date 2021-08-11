import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import Navbar from '../components/Navbar'

import './ProfileScreen.css'

const ProfileScreen = () => {
  const user = useSelector(selectUser)

  return (
    <div className='profile-screen'>
      <Navbar />

      <div className='profile-screen-body'>
        <h1>Edit Profile</h1>
        <div className='profile-screen-info'>
          <img
            src='https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png'
            alt='Netflix avatar'
          />

          <div className='profile-screen-details'>
            <h2>{user.email}</h2>

            <div className='profile-screen-plans'>
              <h3>Plans</h3>
              <p>Renewal date: </p>

              <button
                onClick={() => auth.signOut()}
                className='profile-screen-signout'
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen
