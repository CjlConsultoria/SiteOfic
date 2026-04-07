'use client'

import { useEffect } from 'react'

export default function BackendPing() {
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
    fetch(`${apiUrl}/waitlist/count`, { method: 'GET' }).catch(() => {})
  }, [])

  return null
}
