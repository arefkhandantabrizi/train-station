import { useCallback, useMemo } from 'react'

const ALL_CITIES_VALUE = ''

export function useCityFilterActions(
  value: string,
  onChange: (value: string) => void,
  onClear?: () => void
) {
  const handleSelectChange = useCallback(
    (newValue: string) => {
      onChange(newValue)
      if (newValue === ALL_CITIES_VALUE) {
        onClear?.()
      }
    },
    [onChange, onClear]
  )

  const handleClearClick = useCallback(() => {
    onChange(ALL_CITIES_VALUE)
    onClear?.()
  }, [onChange, onClear])

  const hasFilter = useMemo(
    () => value !== ALL_CITIES_VALUE,
    [value]
  )

  return { handleSelectChange, handleClearClick, hasFilter, ALL_CITIES_VALUE }
}
