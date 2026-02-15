import type { Station } from './station'

export interface MapControllerProps {
  selectedStation: Station | null
  resetViewKey: number
}

export interface MapProps {
  stations: Station[]
  selectedStation: Station | null
  onStationSelect: (station: Station | null) => void
  resetViewKey?: number
}
