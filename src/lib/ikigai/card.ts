import { I18N } from '@/content/ikigai/i18n'
import { txt } from './text'
import type { IkigaiResult, Lang } from './types'

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxW: number) {
  const words = String(text).split(' ')
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const test = line ? `${line} ${w}` : w
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line)
      line = w
    } else line = test
  }
  if (line) lines.push(line)
  return lines
}

const loadImg = (src: string) =>
  new Promise<HTMLImageElement | null>((res) => {
    const im = new Image()
    im.onload = () => res(im)
    im.onerror = () => res(null)
    im.src = src
  })

/** Rysuje Kartę IKIGAI (1080×1350 PNG) – układ z oryginalnej wtyczki. Zwraca URL obiektu. */
export async function makeCard(r: IkigaiResult, name: string, lang: Lang): Promise<string> {
  const t = I18N[lang]
  try {
    await document.fonts.ready
  } catch {}
  const W = 1080
  const H = 1350
  const cv = document.createElement('canvas')
  cv.width = W
  cv.height = H
  const g = cv.getContext('2d')
  if (!g) throw new Error('canvas')
  const css = getComputedStyle(document.documentElement)
  const serifVar = css.getPropertyValue('--font-serif').trim()
  const sansVar = css.getPropertyValue('--font-sans').trim()
  const serif = `${serifVar ? `${serifVar}, ` : ''}'Cormorant Garamond', Georgia, serif`
  const sans = `${sansVar ? `${sansVar}, ` : ''}Jost, system-ui, sans-serif`

  const fit = (text: string, font: string, maxW: number, maxLines: number) => {
    g.font = font
    let lines = wrapLines(g, String(text || ''), maxW)
    if (lines.length > maxLines) {
      lines = lines.slice(0, maxLines)
      lines[maxLines - 1] += '…'
    }
    return lines.map((l) => {
      let x = l
      while (x.length > 2 && g.measureText(x).width > maxW)
        x = `${x.slice(0, x.endsWith('…') ? -2 : -1).trimEnd()}…`
      return x
    })
  }

  const [sym, full] = await Promise.all([
    loadImg('/images/ikigai-symbol.png'),
    loadImg('/images/logo-full.png'),
  ])
  const fw = 230
  const fh = full?.naturalWidth ? (fw * full.naturalHeight) / full.naturalWidth : 0
  const footTop = H - 64 - fh
  const cells: [string, string, string][] = [
    [t.ov_pasja, '#C2415B', r.pasja],
    [t.ov_misja, '#3E8A5C', r.misja],
    [t.ov_profesja, '#2E4E9A', r.profesja],
    [t.ov_powolanie, '#B5852A', r.powolanie],
  ]
  const cw = (W - 240) / 2

  const plan = (k: number) => {
    const symY = 80
    const symH = 170 * k
    const titleY = symY + symH + 70 * k
    const subY = titleY + 42 * k
    const hs = Math.round(58 * k)
    const haslo = fit(txt(r.haslo, 80), `600 ${hs}px ${serif}`, W - 200, 2)
    const hasloY = subY + 88 * k
    let last = hasloY + (haslo.length - 1) * hs * 1.08
    const is = Math.round(36 * k)
    const ik = fit(txt(r.ikigai, 300), `italic 500 ${is}px ${serif}`, W - 220, 5)
    const ikY = last + 72 * k
    last = ikY + (ik.length - 1) * is * 1.28
    let pot: string[] | null = null
    let ps = 0
    let potLY = 0
    let potY = 0
    if (r.potencjal?.nazwa) {
      ps = Math.round(34 * k)
      pot = fit(txt(r.potencjal.nazwa, 100), `600 ${ps}px ${serif}`, W - 220, 2)
      potLY = last + 60 * k
      potY = potLY + 44 * k
      last = potY + (pot.length - 1) * ps * 1.2
    }
    const vs = Math.round(30 * k)
    const cellV = cells.map((c) => fit(txt(c[2], 60), `600 ${vs}px ${serif}`, cw - 48, 2))
    const rowH = [0, 1].map((row) => {
      const n = Math.max(cellV[row * 2].length, cellV[row * 2 + 1].length)
      return 86 * k + (n - 1) * vs * 1.15 + 32 * k
    })
    const cellTop = last + 44 * k
    const gap = 24 * k
    return {
      k,
      symY,
      symH,
      titleY,
      subY,
      hs,
      haslo,
      hasloY,
      is,
      ik,
      ikY,
      pot,
      ps,
      potLY,
      potY,
      vs,
      cellV,
      rowH,
      cellTop,
      gap,
      bottom: cellTop + rowH[0] + gap + rowH[1],
    }
  }

  let P = plan(1)
  for (const k of [0.94, 0.88, 0.82, 0.76, 0.7, 0.64]) {
    if (P.bottom <= footTop - 28) break
    P = plan(k)
  }

  g.fillStyle = '#F7F4EE'
  g.fillRect(0, 0, W, H)
  g.strokeStyle = '#D9CCB2'
  g.lineWidth = 2
  g.strokeRect(40, 40, W - 80, H - 80)
  const sw = sym?.naturalWidth ? (P.symH * sym.naturalWidth) / sym.naturalHeight : 0
  if (sym && sw) g.drawImage(sym, (W - sw) / 2, P.symY, sw, P.symH)
  g.textAlign = 'center'
  g.textBaseline = 'alphabetic'
  g.fillStyle = '#1E1A14'
  g.font = `600 ${Math.round(64 * P.k)}px ${serif}`
  g.fillText('I K I G A I', W / 2, P.titleY)
  g.font = `500 ${Math.round(24 * P.k)}px ${sans}`
  g.fillStyle = '#6B6254'
  g.fillText(
    `${name ? `${name} · ` : ''}${new Date().toLocaleDateString(lang === 'en' ? 'en-GB' : 'pl-PL')}`,
    W / 2,
    P.subY,
  )
  g.fillStyle = '#8C6A2F'
  g.font = `600 ${P.hs}px ${serif}`
  P.haslo.forEach((l, i) => g.fillText(l, W / 2, P.hasloY + i * P.hs * 1.08))
  g.fillStyle = '#1E1A14'
  g.font = `italic 500 ${P.is}px ${serif}`
  P.ik.forEach((l, i) => g.fillText(l, W / 2, P.ikY + i * P.is * 1.28))
  if (P.pot) {
    g.fillStyle = '#8C6A2F'
    g.font = `700 ${Math.round(20 * P.k)}px ${sans}`
    g.fillText(t.potH.toUpperCase(), W / 2, P.potLY)
    g.fillStyle = '#1E1A14'
    g.font = `600 ${P.ps}px ${serif}`
    P.pot.forEach((l, i) => g.fillText(l, W / 2, P.potY + i * P.ps * 1.2))
  }
  cells.forEach((c, i) => {
    const row = i < 2 ? 0 : 1
    const x = 100 + (i % 2) * (cw + 40)
    const yy = P.cellTop + (row ? P.rowH[0] + P.gap : 0)
    const ch = P.rowH[row]
    g.fillStyle = '#FFFFFF'
    g.fillRect(x, yy, cw, ch)
    g.strokeStyle = '#DDD6C8'
    g.lineWidth = 2
    g.strokeRect(x, yy, cw, ch)
    g.fillStyle = c[1]
    g.fillRect(x, yy, 6, ch)
    g.textAlign = 'left'
    g.font = `700 ${Math.round(20 * P.k)}px ${sans}`
    g.fillText(c[0].toUpperCase(), x + 28, yy + 44 * P.k)
    g.fillStyle = '#1E1A14'
    g.font = `600 ${P.vs}px ${serif}`
    P.cellV[i].forEach((l, j) => g.fillText(l, x + 28, yy + 86 * P.k + j * P.vs * 1.15))
  })
  g.textAlign = 'center'
  if (full && fh) g.drawImage(full, (W - fw) / 2, footTop, fw, fh)
  const blob = await new Promise<Blob | null>((res) => cv.toBlob(res, 'image/png'))
  if (!blob) throw new Error('blob')
  return URL.createObjectURL(blob)
}
