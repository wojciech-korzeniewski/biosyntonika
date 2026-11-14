import { site } from '@/content/site'

const tel = (phone: string) => `tel:${phone.replace(/\s/g, '')}`

// Pływający przycisk „Zadzwoń” – na desktopie pigułka z numerem, na telefonie okrągła ikona
export function CallButton() {
  const phone = site.contact.bookingPhone
  const display = phone.replace(/^\+48\s*/, '')
  return (
    <a href={tel(phone)} className="call-fab" aria-label={`Zadzwoń: ${phone}`}>
      <svg className="call-fab-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"
        />
      </svg>
      <span className="call-fab-label">{display}</span>
    </a>
  )
}
