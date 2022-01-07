import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProfile } from '../services/profiles.js'

export default function Profile() {
  const [profile, setProfile] = useState({})

  useEffect(() => {
    getProfile().then(resp => setProfile(resp)).catch(e => console.log(e))
  }, [])

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-col bg-blue-100 p-4 rounded-lg m-4 gap-2'>
        <div className='flex flex-row justify-between items-baseline text-blue'>
          <h2 className='text-xl'>Profile</h2>
          <Link to='/profile/edit'>Edit</Link>
        </div>
        <div>
          Name:
          <p>{profile.name}</p>
        </div>
        <div>
          Email:
          <p>{profile.email}</p>
        </div>
        <div>
          Birthday:
          <p>{profile.birthday}</p>
        </div>
        <div>
          Bio:
          <p>{profile.bio}</p>
        </div>
      </div>
    </div>
  )
}
