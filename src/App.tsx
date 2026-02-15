import { useState, useCallback } from 'react'
import { useStations } from './hooks/useStations'
import { useFilteredStations } from './hooks/useFilteredStations'
import { useStationSelection } from './hooks/useStationSelection'
import { useMapReset } from './hooks/useMapReset'
import { Map } from './components/Map'
import { StationList } from './components/StationList'
import { CityFilter } from './components/CityFilter'
import type { Station } from './types/station'
import './App.css'

function App() {
  const [cityFilter, setCityFilter] = useState('')

  const { stations, loading, error } = useStations()
  const { filteredStations, cities } = useFilteredStations(stations, cityFilter)
  const { selectedStation, setSelectedStation } = useStationSelection()
  const { resetViewKey, triggerReset } = useMapReset()

  const clearFilterAndSelection = useCallback(() => {
    setCityFilter('')
    setSelectedStation(null)
    triggerReset()
  }, [setSelectedStation, triggerReset])

  const handleCityFilterChange = useCallback(
    (value: string) => {
      setCityFilter(value)
      if (value === '') {
        setSelectedStation(null)
        triggerReset()
      } else if (
        selectedStation &&
        selectedStation.city !== value
      ) {
        setSelectedStation(null)
      }
    },
    [selectedStation, setSelectedStation, triggerReset]
  )

  const handleSelectStationInList = useCallback(
    (station: Station) => {
      if (selectedStation?.id === station.id) {
        setCityFilter('')
        setSelectedStation(null)
        triggerReset()
      } else {
        setSelectedStation(station)
        setCityFilter(station.city)
      }
    },
    [selectedStation?.id, setSelectedStation, triggerReset]
  )

  if (loading) {
    return (
      <div className="app app--loading">
        <p>Loading stations…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app app--error">
        <p>Error: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">German Train Stations</h1>
        <CityFilter
          value={cityFilter}
          cities={cities}
          onChange={handleCityFilterChange}
          onClear={clearFilterAndSelection}
        />
      </header>
      <div className="app__main">
        <aside className="app__sidebar">
          <StationList
            stations={filteredStations}
            selectedStationId={selectedStation?.id ?? null}
            onSelectStation={handleSelectStationInList}
            onClearSelection={clearFilterAndSelection}
          />
        </aside>
        <div className="app__map-wrapper">
          <Map
            stations={filteredStations}
            selectedStation={selectedStation}
            onStationSelect={setSelectedStation}
            resetViewKey={resetViewKey}
          />
        </div>
      </div>
    </div>
  )
}

export default App
