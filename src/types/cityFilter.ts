export interface CityFilterProps {
  value: string
  cities: string[]
  onChange: (value: string) => void
  onClear?: () => void
}
