import { IconSun, IconMoon } from '@tabler/icons-react'
import { useColorMode } from '@/hooks/use-color-mode'

const MODES = ['light', 'dark'] as const
const ICON_BY_MODE = {
  light: IconSun,
  dark: IconMoon
} as const
const LABEL_BY_MODE = {
  light: 'Light mode',
  dark: 'Dark mode'
} as const

export function ColorModeToggle() {
  const { colorMode, setColorMode } = useColorMode()

  const next = () => {
    const idx = MODES.indexOf(colorMode)
    setColorMode(MODES[(idx + 1) % MODES.length])
  }

  const Icon = ICON_BY_MODE[colorMode]
  const label = LABEL_BY_MODE[colorMode]

  return (
    <button
      type="button"
      onClick={next}
      className="flex items-center justify-center w-8 h-8 rounded-full
                 text-slate-500 dark:text-slate-400
                 hover:bg-slate-100 dark:hover:bg-slate-800
                 hover:text-slate-700 dark:hover:text-slate-200
                 transition-colors cursor-pointer"
      aria-label={label}
      title={label}
    >
      <Icon size={18} />
    </button>
  )
}
