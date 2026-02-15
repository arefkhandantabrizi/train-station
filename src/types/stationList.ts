import type { Station } from './station'

export interface StationListProps {
  stations: Station[]
  selectedStationId: number | null
  onSelectStation: (station: Station) => void
  onClearSelection: () => void
}
