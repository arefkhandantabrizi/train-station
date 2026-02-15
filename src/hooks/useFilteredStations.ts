import { useMemo } from 'react'
import type { Station } from '../types/station'

export function useFilteredStations(
  stations: Station[],
  cityFilter: string
): { filteredStations: Station[]; cities: string[] } {
  const filteredStations = useMemo(() => {
    const trimmed = cityFilter.trim().toLowerCase()
    if (!trimmed) return stations
    return stations.filter((s) => s.city.toLowerCase().includes(trimmed))
  }, [stations, cityFilter])

  const cities = useMemo(() => {
    const set = new Set(stations.map((s) => s.city))
    return Array.from(set).sort()
  }, [stations])

  return { filteredStations, cities }
}
