import React from 'react'
import { useHistory } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import { signOutUser } from '../services/users.js'

export default function Layout({children}) {
  const { user, setUser } = useUser()
  const history = useHistory()

  async function signOut() {
    await signOutUser()
    setUser({})
    history.push('/login')
  }

  return (
    <div>
      <header className='flex flex-row border-b-2 border-blue-400 py-2 px-1 bg-blue-200 text-black justify-between'>
        <h2 className='font-mono font-bold text-2xl'>Employee Directory</h2>
        { user.id ? <button onClick={signOut} className='bg-blue-600 rounded-md px-2 border-2 border-blue-800 text-white'>Sign Out</button> : <></> }
      </header>
      {children}
    </div>
  )
}
