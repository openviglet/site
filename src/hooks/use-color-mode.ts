import { useState, useLayoutEffect, useCallback } from 'react'

type ColorMode = 'light' | 'dark'
type ResolvedTheme = 'light' | 'dark'

function resolveTheme(mode: ColorMode): ResolvedTheme {
  return mode
}

function applyTheme(resolved: ResolvedTheme): void {
  document.documentElement.setAttribute('data-theme', resolved)
}

function readStoredMode(): ColorMode {
  try {
    const stored = localStorage.getItem('theme')
    return stored === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function useColorMode() {
  // Starts at 'light' on the server and on the first client render, so the
  // prerendered HTML hydrates without a mismatch (W39); the stored choice is
  // read before paint. The inline script in src/app/layout.tsx has already set
  // data-theme, so there is no flash either way.
  const [colorMode, setColorModeState] = useState<ColorMode>('light')

  useLayoutEffect(() => {
    const stored = readStoredMode()
    applyTheme(resolveTheme(stored))
    setColorModeState(stored)
  }, [])

  const setColorMode = useCallback((mode: ColorMode) => {
    setColorModeState(mode)
    try {
      localStorage.setItem('theme', mode)
    } catch {
      /* storage blocked: the choice lasts for this page only */
    }
    applyTheme(resolveTheme(mode))
  }, [])

  return { colorMode, setColorMode } as const
}
