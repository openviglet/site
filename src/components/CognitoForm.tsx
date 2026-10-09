import { useEffect, useRef } from 'react'

const COGNITO_KEY = 'DvUcBbk5D0mgQ4Vka_Txww'

/** Embeds a Cognito Forms form (seamless mode) from the Viglet account. */
export default function CognitoForm({ formId }: { formId: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = ref.current
    if (!container) return
    container.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://www.cognitoforms.com/f/seamless.js'
    script.dataset.key = COGNITO_KEY
    script.dataset.form = formId
    script.async = true
    container.appendChild(script)
    return () => { container.innerHTML = '' }
  }, [formId])
  return <div ref={ref} />
}
