import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import { signInUser, signUpUser } from '../services/users.js'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
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
        history.push('/profile')
      } catch(e) {
        setErrorMessage(e.message)
      }
    } else {
      try {
        const user = await signInUser(email, password)
        setUser(user)
        if(wasRedirected) history.goBack()
        else history.push('/profile')
      } catch(e) {
        setErrorMessage(e.message)
      }
    }
  }

  return (
    <div className='flex flex-col'>
      {wasRedirected ? <p>You must log in before continuing</p> : <></>}
      {errorMessage}
      Login
      <label>
        Email:
        <input type='text' value={email} onChange={({target}) => setEmail(target.value)}></input> 
      </label>
      <label>
        Password: 
        <input type='text' value={password} onChange={({target}) => setPassword(target.value)}></input>
      </label>
      <div>
        <button onClick={handleSubmit} className='bg-'>Submit</button>
      </div>
    </div>
  )
}
