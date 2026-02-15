import L from 'leaflet'

const ICON_BASE = {
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  popupAnchor: [1, -34] as [number, number],
  shadowSize: [41, 41] as [number, number],
}

export function createMarkerIcon(size: number = 25): L.Icon {
  const height = size === 25 ? 41 : 49
  const anchorX = Math.round(size / 2)
  return L.icon({
    ...ICON_BASE,
    iconSize: [size, height],
    iconAnchor: [anchorX, height],
  })
}

export const defaultMarkerIcon = createMarkerIcon(25)
export const selectedMarkerIcon = createMarkerIcon(30)
