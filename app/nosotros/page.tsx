import type { Metadata } from "next";
import { BrandLockup } from "@/components/Brand";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Los jugadores detrás de JugáCompany: quiénes somos y por qué creamos JugáTenis y JugáPádel.",
};

const people = [
  {
    initials: "SG",
    name: "Sergio Gregorutti",
    role: "Fundador",
    bio: "Desarrollador de software argentino. Creó JugáTenis buscando con quién jugar, y esa necesidad personal se convirtió en la comunidad de tenis amateur más activa de Argentina.",
    sport: undefined,
  },
  {
    initials: "LG",
    name: "Leo Giovanetti",
    role: "Cofundador",
    bio: "Ingeniero en sistemas uruguayo con más de dos décadas construyendo productos digitales. Impulsa el crecimiento de la comunidad y la expansión de JugáCompany más allá de la cancha.",
    sport: "padel",
  },
];

export default function AboutPage() {
  return (
    <>
      <header className="px-6 pb-8 pt-12 text-center">
        <BrandLockup />
      </header>
      <main className="mx-auto w-full max-w-[880px] px-6 pb-12 text-center">
        <h1 className="text-jt-h1 font-semibold md:text-jt-display-xl">Los jugadores detrás de JugáCompany</h1>
        <p className="mx-auto mt-4 max-w-[52ch] text-jt-body-lg text-jt-ink-70">
          Somos <strong className="text-jt-ink">jugadores creando para jugadores</strong>.{" "}
          <strong className="text-jt-ink">Creamos productos para conectar personas a través del deporte</strong>:
          JugáTenis y JugáPádel nacieron de nuestras propias ganas de salir a jugar.
        </p>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:gap-6">
          {people.map((p) => (
            <section key={p.name} data-sport={p.sport}
              className="flex flex-1 flex-col items-center gap-2 rounded-jt-3xl bg-jt-brand-50 px-6 py-10">
              <span aria-hidden className="mb-2 flex size-24 items-center justify-center rounded-jt-pill bg-jt-brand-500 text-3xl font-bold text-jt-brand-ink">
                {p.initials}
              </span>
              <h2 className="text-jt-h3 font-semibold">{p.name}</h2>
              <p className="text-jt-body-sm font-semibold uppercase tracking-wider text-jt-brand-700">{p.role}</p>
              <p className="max-w-[40ch] text-jt-body text-jt-ink-70">{p.bio}</p>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
