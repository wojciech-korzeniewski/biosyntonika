import { z } from 'zod'

export const SECONDS = 30
export const TOTAL = 20
export const CIRCLES = ['love', 'good', 'world', 'paid'] as const
export type CircleId = (typeof CIRCLES)[number]
export type VersionId = 'indiv' | 'youth' | 'biz'
export type Lang = 'pl' | 'en'
export type Answers = Record<CircleId, string[]>

/** Wynik finału – ten sam kształt, który zwracało AI w oryginale. */
export const ResultSchema = z.object({
  haslo: z.string().describe('Krótkie hasło-podsumowanie (do 6 słów)'),
  ikigai: z.string().describe('Jedno zdanie: twoje ikigai (do 40 słów)'),
  pasja: z.string().describe('Pasja: 1–3 słowa'),
  misja: z.string().describe('Misja: 1–3 słowa'),
  profesja: z.string().describe('Profesja: 1–3 słowa'),
  powolanie: z.string().describe('Powołanie: 1–3 słowa'),
  analiza: z.object({
    kochasz: z.string(),
    dobry: z.string(),
    swiat: z.string(),
    placa: z.string(),
  }),
  rozdzwiek: z.string().describe('Największa luka między kręgami'),
  potencjal: z.object({ nazwa: z.string(), opis: z.string() }),
  blokady: z
    .array(
      z.object({
        nazwa: z.string(),
        przekonanie: z.string(),
        sygnal: z.string(),
        praca: z.string(),
      }),
    )
    .describe('Dokładnie 3 blokady/przekonania do przepracowania'),
  mocne_strony: z.array(z.string()).describe('Dokładnie 3 mocne strony'),
  kroki: z.array(z.string()).describe('Dokładnie 3 kroki planu na 7 dni'),
  pytanie: z.string().describe('Jedno pytanie końcowe do refleksji'),
})
export type IkigaiResult = z.infer<typeof ResultSchema> & { offline?: boolean }

export const CoachSchema = z.object({
  komentarz: z.string().describe('Krótki komentarz trenera do odpowiedzi z kręgu (2–3 zdania)'),
  pytanie: z.string().describe('Jedno pytanie pogłębiające (do 20 słów)'),
})
export type CoachReply = z.infer<typeof CoachSchema>

export const ReflectSchema = z.object({
  odpowiedz: z.string().describe('Krótka odpowiedź trenera na refleksję klienta (2–4 zdania)'),
})

/** Treść żądania do /api/ikigai/ai – walidowana na serwerze. */
const str = (max: number) => z.string().max(max)
const Item = z.object({ c: z.enum(CIRCLES), q: str(300), a: str(220) })
export const AiRequestSchema = z.object({
  kind: z.enum(['coach', 'final', 'reflect']),
  lang: z.enum(['pl', 'en']),
  version: z.enum(['indiv', 'youth', 'biz']),
  age: z.number().int().min(0).max(120).optional().default(0),
  name: str(40).optional().default(''),
  items: z.array(Item).max(20),
  deep: z.array(Item).max(4),
  circle: z.number().int().min(0).max(3).optional(),
  ikigai: str(300).optional(),
  pytanie: str(220).optional(),
  potencjal: str(100).optional(),
  refl: str(820).optional(),
})
export type AiRequest = z.infer<typeof AiRequestSchema>

export type Consent = {
  signature: string
  at: string
  regulamin: true
  dane: true
  lang: Lang
  version: VersionId
  parent: string | null
}

export type Session = {
  id: string
  name: string
  createdAt: string
  lang: Lang
  version: VersionId
  age: number | null
  consent: Consent | null
  answers: Answers
  deepQ: Partial<Record<CircleId, string>>
  deep: Partial<Record<CircleId, string>>
  result: IkigaiResult | null
  refl: string
  reflReply: string
  sent: boolean
}
