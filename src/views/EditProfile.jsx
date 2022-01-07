import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getProfile, updateProfile, createProfile } from '../services/profiles.js'

export default function Profile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [bio, setBio] = useState('')
  const [error, setError] = useState('')
  const location = useLocation()
  const history = useHistory()
  const isCreating = location.pathname === '/profile/create'

  useEffect(() => {
    getProfile().then(profile => {
      setName(profile.name)
      setEmail(profile.email)
      setBirthday(profile.birthday)
      setBio(profile.bio)
    }).catch(e => console.log(e))
  }, [])

  async function submit() {
    const profile = { name, email, bio, birthday }
    try {
      if (isCreating) {
        await createProfile(profile)
      } else {
        await updateProfile(profile)
      }
      history.push('/profile')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      {error === '' ? <></> : (
        <div className='bg-red-400 rounded-lg p-1 px-2 m-2'>
          {error}
        </div>
      )}
      <div className='flex flex-col bg-blue-100 p-4 rounded-lg m-4 gap-2'>
        <div className='flex flex-row justify-between items-baseline text-blue'>
          <h2 className='text-xl'>
            {isCreating ? 'Create Profile' : 'Edit Profile'}
          </h2>
        </div>
        <label>
          Name:
          <br />
          <input type='text' value={name} onChange={({ target }) => setName(target.value)} />
        </label>
        <div>
          Email:
          <p>{email}</p>
        </div>
        <div>
          Birthday:
          <br />
          <input type='date' value={birthday} onChange={({ target }) => setBirthday(target.value)} />
        </div>
        <div>
          Bio:
          <br />
          <textarea rows='3' value={bio} onChange={({ target }) => setBio(target.value)} />
        </div>
        <div className='flex flex-row justify-center'>
          <button onClick={submit}>Submit</button>
        </div>
      </div>
    </div>
  )
}
