import type L from 'leaflet'
import { useMemo } from 'react'
import type { Station } from '../types/station'
import { defaultMarkerIcon, selectedMarkerIcon } from '../utils/leafletIcons'

export interface MapMarkerConfig {
  key: number
  station: Station
  position: [number, number]
  icon: L.Icon
  eventHandlers: {
    click: () => void
  }
}

export function useMapMarkers(
  stations: Station[],
  selectedStation: Station | null,
  onStationSelect: (station: Station | null) => void
): MapMarkerConfig[] {
  return useMemo(
    () =>
      stations.map((station) => {
        const isSelected = selectedStation?.id === station.id
        return {
          key: station.id,
          station,
          position: [station.lat, station.lng] as [number, number],
          icon: isSelected ? selectedMarkerIcon : defaultMarkerIcon,
          eventHandlers: {
            click: () => onStationSelect(isSelected ? null : station),
          },
        }
      }),
    [stations, selectedStation, onStationSelect]
  )
}
