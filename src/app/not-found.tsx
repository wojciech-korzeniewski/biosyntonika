import Link from 'next/link'

export const metadata = { title: 'Nie znaleziono strony', robots: { index: false } }

export default function NotFound() {
  return (
    <section className="container narrow center page">
      <p className="eyebrow">Błąd 404</p>
      <h1>Nie znaleziono strony</h1>
      <p className="muted">Strona, której szukasz, nie istnieje lub została przeniesiona.</p>
      <p>
        <Link href="/" className="btn btn-outline">
          Wróć na stronę główną
        </Link>
      </p>
    </section>
  )
}
