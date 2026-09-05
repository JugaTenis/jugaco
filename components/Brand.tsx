import Link from "next/link";

/** Company lockup: player mark + wordmark. Links home unless `asHeading`. */
export function BrandLockup({ asHeading = false }: { asHeading?: boolean }) {
  const lockup = (
    <>
      <img src="/assets/logo-mark.svg" alt="" aria-hidden className="h-14 w-auto md:h-16" />
      <img src="/assets/logo-jugacompany.svg" alt="JugáCompany" className="h-auto w-[min(280px,60vw)]" />
    </>
  );
  const className = "flex items-center justify-center gap-3";
  return asHeading ? (
    <h1 className={className}>{lockup}</h1>
  ) : (
    <Link href="/" className={className}>{lockup}</Link>
  );
}

export function Stat({ value, label, hint }: { value: React.ReactNode; label: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-jt-lg bg-jt-surface p-4 text-center shadow-jt-2 md:p-6">
      <div className="mb-1 text-3xl font-semibold text-jt-brand-700 md:text-4xl">{value}</div>
      <div className="text-jt-body-sm md:text-jt-body">{label}</div>
      {hint && <div className="mt-0.5 text-jt-caption text-jt-ink-50">{hint}</div>}
    </div>
  );
}
