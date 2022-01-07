import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import { signInUser, signUpUser } from '../services/users.js'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useUser()
  const location = useLocation()
  const history = useHistory()
  const isSigningUp = location.path === '/register'
  const wasRedirected = location.search === '?redirect=true'

  async function handleSubmit() {
    if(isSigningUp) {
      try {
        const user = await signUpUser(email, password)
        setUser(user)
        history.push('/profile/edit')
      } catch(e) {
        setError(e.message)
      }
    } else {
      try {
        const user = await signInUser(email, password)
        setUser(user)
        if(wasRedirected) history.goBack()
        else history.push('/profile')
      } catch(e) {
        setError(e.message)
      }
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
        {wasRedirected ? <p>You must log in before continuing</p> : <></>}
        <h2 className='text-xl flex flex-row justify-center'>
          Login
        </h2>
          <label className='flex flex-row justify-between items-baseline'>
            Email:
            <input type='text' value={email} onChange={({target}) => setEmail(target.value)}></input> 
          </label>
        <label className='flex flex-row justify-between items-baseline'>
          Password: 
          <input type='password' value={password} onChange={({target}) => setPassword(target.value)}></input>
        </label>
        <div className='flex flex-row justify-center'>
          <button onClick={handleSubmit} >Submit</button>
        </div>
      </div>
    </div>
  )
}
