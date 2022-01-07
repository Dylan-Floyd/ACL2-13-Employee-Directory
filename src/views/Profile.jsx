import React, { useEffect, useState } from 'react'
import { getProfile } from '../services/profiles.js'

export default function Profile() {
  const [profile, setProfile] = useState()

  useEffect(() => {
    getProfile().then(resp => setProfile(resp)).catch(e => console.log(e))
  }, [])

  return (
    <div>
      Profile
      {console.log(profile)}
    </div>
  )
}
