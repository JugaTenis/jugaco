import AnimatedNumber from "@/components/AnimatedNumber";
import { BrandLockup, Stat } from "@/components/Brand";
import { getBrandStats, type Stats } from "@/lib/stats";

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-5 shrink-0">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-5 shrink-0">
    <path d="M3.61 1.81 13.79 12 3.6 22.19c-.36-.19-.6-.57-.6-1.01V2.83c0-.45.24-.83.61-1.02zm11.6 8.77L5.62 1.02l11.16 6.44-1.57 3.12zm2.9-2.35 3.05 1.76c.78.45.78 1.57 0 2.02l-3.05 1.76L16.2 12l1.91-3.77zM5.62 22.98l9.59-9.56 1.57 3.12L5.62 22.98z" />
  </svg>
);

const TennisCourt = () => (
  <svg viewBox="-20 -20 400 820" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="5" aria-hidden
    className="pointer-events-none absolute left-1/2 top-[2%] z-0 h-[96%] -translate-x-1/2 rotate-[9deg] text-jt-brand-500">
    <rect x="0" y="0" width="360" height="780" rx="2" />
    <line x1="45" y1="0" x2="45" y2="780" /><line x1="315" y1="0" x2="315" y2="780" />
    <line x1="45" y1="180" x2="315" y2="180" /><line x1="45" y1="600" x2="315" y2="600" />
    <line x1="180" y1="180" x2="180" y2="600" />
    <line x1="0" y1="390" x2="360" y2="390" strokeWidth="7" />
    <line x1="180" y1="0" x2="180" y2="14" /><line x1="180" y1="766" x2="180" y2="780" />
  </svg>
);

const PadelCourt = () => (
  <svg viewBox="-20 -20 240 440" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="3" aria-hidden
    className="pointer-events-none absolute left-1/2 top-[2%] z-0 h-[96%] -translate-x-1/2 -rotate-[9deg] text-jt-brand-500">
    <rect x="0" y="0" width="200" height="400" rx="2" />
    <line x1="0" y1="130.5" x2="200" y2="130.5" /><line x1="0" y1="269.5" x2="200" y2="269.5" />
    <line x1="100" y1="130.5" x2="100" y2="269.5" />
    <line x1="0" y1="200" x2="200" y2="200" strokeWidth="4.5" />
  </svg>
);

function BrandStats({ stats }: { stats: Stats }) {
  const items = [
    [stats.userCount, "jugadores"],
    [stats.friendshipCount, "amistades"],
    [stats.matchCount, "encuentros"],
  ] as const;
  const nonZero = items.filter(([value]) => value > 0);
  return (
    <dl className="flex flex-wrap justify-center gap-x-6 gap-y-2">
      {nonZero.map(([value, label]) => (
        <div key={label} className="flex items-baseline gap-1.5">
          <dd className="text-jt-h3 font-semibold text-jt-brand-700"><AnimatedNumber value={value} /></dd>
          <dt className="text-jt-body-sm text-jt-ink-70">{label}</dt>
        </div>
      ))}
    </dl>
  );
}

const cardClass =
  "relative flex flex-1 flex-col items-center justify-center gap-6 overflow-hidden rounded-jt-3xl bg-jt-brand-50 px-6 py-12 text-center md:px-8 md:py-14 [&>*:not(svg)]:relative [&>*:not(svg)]:z-10";
const webLinkClass = "text-jt-body-sm text-jt-ink-50 underline-offset-2 hover:text-jt-brand-700 hover:underline";

const StoreLink = ({ href, icon, name, hint }: { href: string; icon: React.ReactNode; name: string; hint: string }) => (
  <a href={href}
    className="inline-flex items-center gap-2.5 rounded-jt-pill bg-jt-brand-500 px-5 py-2.5 text-left text-jt-body font-bold leading-tight text-jt-brand-ink transition duration-150 ease-jt-out hover:-translate-y-0.5 hover:bg-jt-brand-hover hover:shadow-jt-3">
    {icon}<span>{name}<small className="block text-[11px] font-normal opacity-85">{hint}</small></span>
  </a>
);

export default async function HomePage() {
  const stats = await getBrandStats();

  return (
    <>
      <header className="px-6 pb-9 pt-12 text-center">
        <BrandLockup asHeading />
        <p className="mt-3 text-jt-body-lg font-medium text-jt-ink-70">
          Jugadores creando para jugadores · Creamos productos para conectar personas a través del deporte
        </p>
      </header>

      <main className="mx-auto w-full max-w-[1280px] px-4 pb-6 md:px-6">
        {stats && (
          <section aria-labelledby="impacto" className="mb-8 md:mb-10">
            <div className="mx-auto max-w-[760px] text-center">
              <p className="text-jt-eyebrow font-semibold uppercase text-jt-brand-700">El juego nos une</p>
              <h2 id="impacto" className="mt-2 text-jt-h1 font-semibold md:text-jt-display-xl">
                Personas que hoy se conocen y juegan gracias a nuestras comunidades
              </h2>
              <p className="mt-3 text-jt-body text-jt-ink-70 md:text-jt-body-lg">
                Cada número es una persona real que encontró con quién jugar. Datos en vivo de JugáTenis y JugáPádel.
              </p>
            </div>
            <div className="mx-auto mt-8 grid max-w-[1000px] grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
              <Stat value={<AnimatedNumber value={stats.global.userCount} />} label="Jugadores" hint="cuentas verificadas" />
              <Stat value={<AnimatedNumber value={stats.global.friendshipCount} />} label="Amistades" hint="creadas en la app" />
              <Stat value={<AnimatedNumber value={stats.global.matchCount} />} label="Encuentros" hint="partidos registrados" />
              <Stat value={<AnimatedNumber value={stats.global.clubCount} />} label="Clubes" hint="en la plataforma" />
              <Stat value={<AnimatedNumber value={stats.global.cityCount} />} label="Ciudades" hint="con jugadores" />
            </div>
            <p className="mt-4 text-center text-jt-caption text-jt-ink-50">
              Actualizado el {stats.fetchedAt.toLocaleString("es-AR", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Argentina/Buenos_Aires" })} ·
              ¿Inversor o aliado? Escribinos a <a href="mailto:contacto@jugacompany.com" className="underline">contacto@jugacompany.com</a>
            </p>
          </section>
        )}

        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <section aria-label="JugáTenis" className={cardClass}>
            <TennisCourt />
            <img src="/assets/logo-jugatenis.svg" alt="JugáTenis" className="w-[min(320px,78%)]" />
            <p className="max-w-[34ch] text-jt-body-lg text-jt-ink-70">
              La comunidad de tenis amateur más activa. Encontrá rivales de tu nivel, cargá tus partidos y escalá en el ranking.
            </p>
            {stats && <BrandStats stats={stats.tenis} />}
            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-wrap justify-center gap-2.5">
                <StoreLink href="https://apps.apple.com/app/id6756391352" icon={<AppleIcon />} name="App Store" hint="Descargala para iPhone" />
                <StoreLink href="https://play.google.com/store/apps/details?id=com.jugatenis.app" icon={<PlayIcon />} name="Google Play" hint="Descargala para Android" />
              </div>
              <a href="https://www.jugatenis.com" className={webLinkClass}>o usala desde la web en jugatenis.com</a>
            </div>
          </section>

          <section aria-label="JugáPádel" data-sport="padel" className={cardClass}>
            <PadelCourt />
            <img src="/assets/logo-jugapadel.svg" alt="JugáPádel" className="w-[min(320px,78%)]" />
            <p className="max-w-[34ch] text-jt-body-lg text-jt-ink-70">
              Ranking, encuentros y comunidad para el pádel amateur. Sumate desde cualquier dispositivo.
            </p>
            {stats && <BrandStats stats={stats.padel} />}
            <div className="flex flex-col items-center gap-3">
              <StoreLink href="https://apps.apple.com/app/id6799821373" icon={<AppleIcon />} name="App Store" hint="Descargala para iPhone" />
              <p className="text-jt-body-sm italic text-jt-ink-70">La versión para Android estará disponible muy pronto.</p>
              <a href="https://www.jugapadel.app" className={webLinkClass}>o usala desde la web en jugapadel.app</a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
