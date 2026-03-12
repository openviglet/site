import { useState, useEffect, useCallback } from 'react'

type ColorMode = 'light' | 'dark'
type ResolvedTheme = 'light' | 'dark'

function resolveTheme(mode: ColorMode): ResolvedTheme {
  return mode
}

function applyTheme(resolved: ResolvedTheme): void {
  document.documentElement.setAttribute('data-theme', resolved)
}

export function useColorMode() {
  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    return (localStorage.getItem('theme') as ColorMode) || 'light'
  })

  const setColorMode = useCallback((mode: ColorMode) => {
    setColorModeState(mode)
    localStorage.setItem('theme', mode)
    applyTheme(resolveTheme(mode))
  }, [])

  useEffect(() => {
    applyTheme(resolveTheme(colorMode))
  }, [colorMode])

  return { colorMode, setColorMode } as const
}
