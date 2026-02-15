import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFilteredStations } from './useFilteredStations'
import type { Station } from '../types/station'

const mockStations: Station[] = [
  { id: 1, name: 'Berlin Hbf', city: 'Berlin', lat: 52.5251, lng: 13.3694 },
  { id: 2, name: 'Berlin Ostbahnhof', city: 'Berlin', lat: 52.5108, lng: 13.4348 },
  { id: 3, name: 'Hamburg Hbf', city: 'Hamburg', lat: 53.553, lng: 10.0067 },
  { id: 4, name: 'Munich Hbf', city: 'Munich', lat: 48.1402, lng: 11.5586 },
]

describe('useFilteredStations', () => {
  it('returns all stations when city filter is empty', () => {
    const { result } = renderHook(() =>
      useFilteredStations(mockStations, '')
    )
    expect(result.current.filteredStations).toHaveLength(4)
    expect(result.current.filteredStations).toEqual(mockStations)
  })

  it('returns only stations matching the city (case-insensitive)', () => {
    const { result } = renderHook(() =>
      useFilteredStations(mockStations, 'berlin')
    )
    expect(result.current.filteredStations).toHaveLength(2)
    expect(result.current.filteredStations.every((s) => s.city === 'Berlin')).toBe(true)
  })

  it('returns unique sorted cities list', () => {
    const { result } = renderHook(() =>
      useFilteredStations(mockStations, '')
    )
    expect(result.current.cities).toEqual(['Berlin', 'Hamburg', 'Munich'])
  })

  it('filters by partial city name', () => {
    const { result } = renderHook(() =>
      useFilteredStations(mockStations, 'burg')
    )
    expect(result.current.filteredStations).toHaveLength(1)
    expect(result.current.filteredStations[0].city).toBe('Hamburg')
  })
})
