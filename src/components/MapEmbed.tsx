type Props = {
  src: string
  title: string
  linkUrl: string
}

// Mapa Google ładowana leniwie – iframe pobiera się dopiero przy przewinięciu do niego.
export function MapEmbed({ src, title, linkUrl }: Props) {
  return (
    <figure className="map-embed">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <figcaption>
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          Wyznacz trasę w Mapach Google →
        </a>
      </figcaption>
    </figure>
  )
}
