import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
});

const description =
  "Jugadores creando para jugadores: creamos productos para conectar personas a través del deporte. La casa de JugáTenis y JugáPádel.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jugacompany.com"),
  title: { default: "JugáCompany | El juego nos une", template: "%s | JugáCompany" },
  description,
  icons: { icon: "/assets/favicon.svg" },
  openGraph: { title: "JugáCompany", description, url: "https://jugacompany.com", type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${robotoFlex.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <footer className="mt-auto border-t border-jt-ink-10 px-6 py-7 text-center text-jt-body-sm text-jt-ink-70">
          <p>
            © 2026 JugáCompany · <a href="/nosotros" className="underline-offset-2 hover:underline">Nosotros</a> ·{" "}
            <a href="https://www.jugatenis.com" className="underline-offset-2 hover:underline">jugatenis.com</a> ·{" "}
            <a href="https://www.jugapadel.app" className="underline-offset-2 hover:underline">jugapadel.app</a> ·{" "}
            <a href="mailto:contacto@jugacompany.com" className="underline-offset-2 hover:underline">contacto@jugacompany.com</a>
          </p>
          <p className="mt-1.5 text-jt-ink-50">JugáTenis y JugáPádel son marcas de JugáCompany.</p>
        </footer>
      </body>
    </html>
  );
}
