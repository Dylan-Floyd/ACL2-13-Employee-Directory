import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      Welcome to the Employee Directory
      <br />
      Please <Link to='/login' className='text-blue-500 underline'>Log In</Link> or <Link to='/register' className='text-blue-500 underline'>Register</Link>
    </div>
  )
}
