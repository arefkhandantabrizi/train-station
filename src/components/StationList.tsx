import type { StationListProps } from '../types/stationList'
import { cn } from '../utils/cn'

function ClearIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

export function StationList({
  stations,
  selectedStationId,
  onSelectStation,
  onClearSelection,
}: StationListProps) {
  return (
    <div className="station-list-wrapper">
      {selectedStationId !== null && (
        <div className="station-list__clear-bar">
          <button
            type="button"
            className="station-list__clear-btn"
            onClick={onClearSelection}
            aria-label="Clear selection"
          >
            <ClearIcon className="station-list__clear-icon" />
            Clear selection
          </button>
        </div>
      )}
      <ul className="station-list" aria-label="Stations">
        {stations.map((station) => {
          const isSelected = selectedStationId === station.id
          return (
            <li key={station.id}>
              <div
                className={cn(
                  'station-item',
                  isSelected && 'station-item--selected'
                )}
              >
                <button
                  type="button"
                  className="station-item__main"
                  onClick={() => onSelectStation(station)}
                >
                  <span className="station-item__name">{station.name}</span>
                  <span className="station-item__city">{station.city}</span>
                </button>
                {isSelected && (
                  <button
                    type="button"
                    className="station-item__clear"
                    onClick={onClearSelection}
                    aria-label={`Clear selection of ${station.name}`}
                  >
                    <ClearIcon />
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
