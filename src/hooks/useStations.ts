import { useState, useEffect } from 'react'
import type { Station } from '../types/station'
import { fetchStations } from '../api/stations'

export function useStations(): {
  stations: Station[]
  loading: boolean
  error: Error | null
} {
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      if (!cancelled) {
        setLoading(true)
        setError(null)
      }
    })
    fetchStations()
      .then((data) => {
        if (!cancelled) {
          setStations(data)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)))
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { stations, loading, error }
}
