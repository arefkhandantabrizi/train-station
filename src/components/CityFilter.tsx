import type { CityFilterProps } from '../types/cityFilter'
import { useCityFilterActions } from '../hooks/useCityFilterActions'

export function CityFilter({
  value,
  cities,
  onChange,
  onClear,
}: CityFilterProps) {
  const {
    handleSelectChange,
    handleClearClick,
    hasFilter,
    ALL_CITIES_VALUE,
  } = useCityFilterActions(value, onChange, onClear)

  return (
    <div className="city-filter">
      <span className="city-filter__label">Filter by city</span>
      <div className="city-filter__controls">
        <select
          id="city-filter-select"
          className="city-filter__select"
          value={value}
          onChange={(e) => handleSelectChange(e.target.value)}
          aria-label="Filter stations by city"
        >
          <option value={ALL_CITIES_VALUE}>All cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {hasFilter && (
          <button
            type="button"
            className="city-filter__clear"
            onClick={handleClearClick}
            aria-label="Clear city filter"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
