import React from 'react'
import { useRedirectLoggedOutUser } from '../../hooks/useRedirectLoggedOutUser'

export default function Dashboard() {
  useRedirectLoggedOutUser("/login")
  return (
    <div>
        <h2>Dashboard</h2>
    </div>
  )
}
