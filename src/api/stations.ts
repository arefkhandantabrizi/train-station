import type { Station } from '../types/station'
import { STATIONS_API_URL } from '../constants'

export async function fetchStations(): Promise<Station[]> {
  const res = await fetch(STATIONS_API_URL)
  if (!res.ok) {
    throw new Error(`Failed to fetch stations: ${res.status}`)
  }
  const data = (await res.json()) as unknown
  if (!Array.isArray(data)) {
    throw new Error('Invalid stations data')
  }
  return data as Station[]
}
