import type { Metadata } from "next";
import Image from "next/image";
import { brewery, experiences } from "@/data/cerveceria-cholula/content";
import { BeerExplorer, MenuExplorer, VisitPlanner } from "./interactive";
import styles from "./styles.module.css";

export const metadata: Metadata = {
  title: "Cervecería Cholula · Propuesta de sitio web",
  description:
    "Demo conceptual de LAB: cerveza, cocina y jardín. No es el sitio oficial de Cervecería Cholula.",
  keywords: ["Cervecería Cholula", "propuesta visual", "LAB"],
  alternates: { canonical: null },
  robots: { index: false, follow: false },
  icons: {
    icon: "/cerveceria-cholula/logo.png",
    apple: "/cerveceria-cholula/logo.png",
  },
  openGraph: {
    title: "Cervecería Cholula · Demo LAB",
    description: "Una propuesta visual. No es el sitio oficial.",
    url: "/cerveceria-cholula",
    images: [{ url: "/cerveceria-cholula/logo.png", width: 400, height: 400 }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Cervecería Cholula · Demo LAB",
    description: "Propuesta visual; no es el sitio oficial.",
    images: ["/cerveceria-cholula/logo.png"],
  },
};

export default function BreweryPage() {
  return (
    <div className={styles.site}>
      <div className={styles.demo}>
        <span>LAB / PROPUESTA VISUAL</span>
        <span>Demo independiente · No es el sitio oficial</span>
      </div>
      <header className={styles.header}>
        <a
          className={styles.brand}
          href="#inicio"
          aria-label="Cervecería Cholula, inicio"
        >
          <Image
            src="/cerveceria-cholula/logo.png"
            width={64}
            height={64}
            alt=""
            priority
          />
          <span>
            CERVECERÍA
            <br />
            <strong>CHOLULA</strong>
          </span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#experiencia">El lugar</a>
          <a href="#cervezas">La cerveza</a>
          <a href="#carta">La carta</a>
        </nav>
        <a href="#visita" className={styles.headerCta}>
          Planea tu visita <span aria-hidden="true">↗</span>
        </a>
      </header>
      <main id="contenido">
        <section
          id="inicio"
          className={styles.hero}
          aria-labelledby="hero-title"
        >
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>FÁBRICA · RESTAURANTE · JARDÍN</p>
            <h1 id="hero-title">
              Buena cerveza.
              <br />
              <em>Mejor</em>
              <br />
              compañía.
            </h1>
            <p className={styles.heroIntro}>{brewery.intro}</p>
            <div className={styles.actions}>
              <a className={styles.button} href="#cervezas">
                Encuentra tu estilo <span aria-hidden="true">↗</span>
              </a>
              <a className={styles.textLink} href="#carta">
                Explora la carta <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className={styles.heroBottom}>
              <span>SAN PEDRO CHOLULA, PUEBLA</span>
              <span>Hecho para compartir.</span>
            </div>
          </div>
          <figure className={styles.heroPhoto}>
            <Image
              src={brewery.photo}
              alt="Cerveza servida de barril en una fotografía ilustrativa de ambiente"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <div className={styles.photoTitle} aria-hidden="true">
              NOS VEMOS
              <br />
              EN CHOLULA.
            </div>
            <div className={styles.seal} aria-hidden="true">
              LA BUENA
              <br />
              <b>VIDA</b>
              <br />
              SE COMPARTE
            </div>
            <figcaption>{brewery.photoNote}</figcaption>
          </figure>
        </section>
        <div className={styles.ribbon} aria-hidden="true">
          <span>CERVEZA CON CARÁCTER</span>
          <i>✳</i>
          <span>MESA PARA COMPARTIR</span>
          <i>✳</i>
          <span>SOBREMESA EN EL JARDÍN</span>
        </div>
        <section
          id="experiencia"
          className={styles.experience}
          aria-labelledby="place-title"
        >
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>01 / EL LUGAR</p>
            <h2 id="place-title">
              No solo vienes
              <br />
              por una cerveza.
            </h2>
            <p>
              Vienes por el plan completo.
              <br />
              Descubre tres formas de disfrutar el lugar.
            </p>
          </div>
          <div className={styles.experienceRows}>
            {experiences.map((item) => (
              <article key={item.number}>
                <span className={styles.number}>{item.number}</span>
                <div>
                  <p className={styles.small}>{item.tag}</p>
                  <h3>{item.title}</h3>
                </div>
                <div>
                  <h4>{item.subtitle}</h4>
                  <p>{item.text}</p>
                </div>
                <span className={styles.rowArrow} aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </section>
        <section
          id="cervezas"
          className={styles.beerSection}
          aria-labelledby="beer-title"
        >
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>02 / EXPLORA LA CERVEZA</p>
            <h2 id="beer-title">
              Tu siguiente favorita
              <br />
              empieza con un sabor.
            </h2>
            <p>
              No necesitas saber de estilos.
              <br />
              Empieza por lo que te gusta.
            </p>
          </div>
          <BeerExplorer />
        </section>
        <section
          id="carta"
          className={styles.menuSection}
          aria-labelledby="menu-title"
        >
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>03 / A LA MESA</p>
            <h2 id="menu-title">
              Lo bueno
              <br />
              <em>se comparte.</em>
            </h2>
            <p>
              Carta de muestra para explorar el diseño.
              <br />
              Platillos, ingredientes y precios por confirmar.
            </p>
          </div>
          <MenuExplorer />
        </section>
        <section className={styles.gathering}>
          <p className={styles.eyebrow}>
            HAY PLANES QUE MERECEN SU PROPIA MESA
          </p>
          <h2>
            ¿Se arma
            <br />
            <em>en Cholula?</em>
          </h2>
          <div>
            <p>
              Una comida entre amigos, una celebración o una visita para conocer
              más de cerveza. Cuéntale al equipo qué tienes en mente.
            </p>
            <a href="#visita" className={styles.button}>
              Prepara tu consulta <span aria-hidden="true">↗</span>
            </a>
            <small>
              Visitas a fábrica y eventos sujetos a confirmación del negocio.
            </small>
          </div>
        </section>
        <section
          id="visita"
          className={styles.visit}
          aria-labelledby="visit-title"
        >
          <div>
            <p className={styles.eyebrow}>04 / NOS VEMOS AQUÍ</p>
            <h2 id="visit-title">
              El próximo plan
              <br />
              tiene dirección.
            </h2>
            <address>{brewery.address}</address>
            <p className={styles.fine}>{brewery.addressNote}</p>
            <a
              className={styles.textLink}
              href={brewery.map}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver ubicación en Maps ↗
            </a>
            <div className={styles.visitNotes}>
              <h3>Antes de salir</h3>
              <p>
                Consulta los horarios vigentes y la disponibilidad directamente
                con el negocio.
              </p>
              <a
                href={brewery.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram oficial ↗
              </a>
              <a
                href={brewery.linktree}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enlaces del negocio ↗
              </a>
            </div>
          </div>
          <VisitPlanner />
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerWord}>CHOLULA.</div>
        <div className={styles.footerBottom}>
          <span>Cerveza · Cocina · Jardín</span>
          <span>Propuesta independiente de LAB · No oficial</span>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
        <p>
          Contenido de muestra. Sin reservas, pedidos ni pagos activos. Los
          estilos de cerveza son orientativos y no representan una carta
          confirmada. Consumo de alcohol exclusivo para mayores de edad; evita
          el exceso.
        </p>
      </footer>
      <div className={styles.mobileBar}>
        <a href="#carta">Ver carta de muestra</a>
        <a href="#visita">Planear visita ↗</a>
      </div>
    </div>
  );
}
