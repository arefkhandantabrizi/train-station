import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import type { Station } from '../types/station'
import { GERMANY_CENTER, DEFAULT_ZOOM } from '../constants'

export function useMapController(
  selectedStation: Station | null,
  resetViewKey: number
) {
  const map = useMap()

  useEffect(() => {
    if (!selectedStation) return
    map.flyTo([selectedStation.lat, selectedStation.lng], 14, {
      duration: 0.5,
    })
  }, [selectedStation, map])

  useEffect(() => {
    if (resetViewKey === 0) return
    map.flyTo(GERMANY_CENTER, DEFAULT_ZOOM, { duration: 0.5 })
  }, [resetViewKey, map])
}
