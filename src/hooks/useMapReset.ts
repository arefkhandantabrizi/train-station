import { useState, useCallback } from 'react'

export function useMapReset() {
  const [resetViewKey, setResetViewKey] = useState(0)

  const triggerReset = useCallback(() => {
    setResetViewKey((k) => k + 1)
  }, [])

  return { resetViewKey, triggerReset }
}
