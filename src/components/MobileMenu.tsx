'use client'

import Link from 'next/link'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'

type NavItem = { label: string; href: string }

const noopSubscribe = () => () => {}

export function MobileMenu({ items, cta }: { items: NavItem[]; cta: NavItem }) {
  const [open, setOpen] = useState(false)
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth > 900 && setOpen(false)
    document.documentElement.classList.add('menu-open')
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.documentElement.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <button
        type="button"
        className={`menu-toggle${open ? ' is-open' : ''}`}
        aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      {mounted &&
        createPortal(
          <div
            id="mobile-menu"
            className={`mobile-menu${open ? ' is-open' : ''}`}
            aria-hidden={!open}
            inert={!open}
          >
            <nav className="mobile-menu-links" aria-label="Menu mobilne">
              {items.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  style={{ transitionDelay: open ? `${120 + i * 50}ms` : '0ms' }}
                >
                  <span className="mobile-menu-no">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mobile-menu-footer">
              <Link href={cta.href} onClick={close} className="btn btn-solid">
                {cta.label}
              </Link>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
