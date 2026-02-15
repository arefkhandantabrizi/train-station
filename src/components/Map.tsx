import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { MapControllerProps, MapProps } from '../types/map'
import { useMapController } from '../hooks/useMapController'
import { useMapMarkers } from '../hooks/useMapMarkers'
import { GERMANY_CENTER, DEFAULT_ZOOM } from '../constants'
import 'leaflet/dist/leaflet.css'

function MapController({
  selectedStation,
  resetViewKey,
}: MapControllerProps) {
  useMapController(selectedStation, resetViewKey)
  return null
}

export function Map({
  stations,
  selectedStation,
  onStationSelect,
  resetViewKey = 0,
}: MapProps) {
  const markerConfigs = useMapMarkers(
    stations,
    selectedStation,
    onStationSelect
  )

  return (
    <MapContainer
      center={GERMANY_CENTER}
      zoom={DEFAULT_ZOOM}
      className="map-container"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController
        selectedStation={selectedStation}
        resetViewKey={resetViewKey}
      />
      {markerConfigs.map(({ key, station, position, icon, eventHandlers }) => (
        <Marker
          key={key}
          position={position}
          icon={icon}
          eventHandlers={eventHandlers}
        >
          <Popup>
            <strong>{station.name}</strong>
            <br />
            {station.city}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
