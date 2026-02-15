import { useState, useCallback } from 'react'
import type { Station } from '../types/station'

export function useStationSelection() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)

  const handleSelectStation = useCallback((station: Station) => {
    setSelectedStation((prev) =>
      prev?.id === station.id ? null : station
    )
  }, [])

  return { selectedStation, setSelectedStation, handleSelectStation }
}
