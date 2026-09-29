import type { Metadata } from 'next'
import Image from 'next/image'
import { brewery } from '@/data/cerveceria-cholula/content'
import { BeerExplorer, VisitPlanner } from './interactive'
import styles from './styles.module.css'

export const metadata: Metadata = {
  title: 'Cervecería Cholula · Buena cerveza, buena vida',
  description: 'Propuesta independiente de sitio web: fábrica, restaurante y jardín en Cholula.',
  keywords: ['Cervecería Cholula', 'propuesta visual'],
  alternates: { canonical: null },
  robots: { index: false, follow: false },
  icons: { icon: '/cerveceria-cholula/logo.png', apple: '/cerveceria-cholula/logo.png' },
  openGraph: { title: 'Cervecería Cholula · Propuesta LAB', description: 'Cerveza, cocina y jardín. Propuesta no oficial.', url: '/cerveceria-cholula', images: [{url:'/cerveceria-cholula/fiesta-original.webp',width:1254,height:1254}], type:'website' },
  twitter: { card:'summary_large_image', title:'Cervecería Cholula · Propuesta LAB', description:'Cerveza, cocina y jardín. Propuesta no oficial.', images:['/cerveceria-cholula/fiesta-original.webp'] },
}
const official = {target:'_blank',rel:'noopener noreferrer'}
export default function BreweryPage(){
 return <div className={styles.site}>
  <div className={styles.demo}>Propuesta de sitio por LAB · No oficial</div>
  <header className={styles.header}>
   <a className={styles.brand} href="#inicio" aria-label="Cervecería Cholula, inicio"><Image src="/cerveceria-cholula/logo.png" width={64} height={64} alt="" priority/><span>CERVECERÍA<br/><strong>CHOLULA</strong></span></a>
   <nav aria-label="Navegación principal"><a href="#experiencia">La casa</a><a href="#cervezas">La cerveza</a><a href="#carta">La cocina</a><a href="#visita">Visítanos</a></nav>
   <a href={brewery.linktree} {...official} className={styles.headerCta}>Contacto ↗</a>
  </header>
  <main id="contenido">
   <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
    <div className={styles.heroText}><p className={styles.eyebrow}>TU PUNTO DE ENCUENTRO EN CHOLULA</p><h1 id="hero-title">BUENA<br/>CERVEZA.<br/><em>BUENA VIDA.</em></h1><p className={styles.heroIntro}>Una cerveza con carácter. Una mesa con amigos.<br/>Y toda la tarde por delante.</p><div className={styles.actions}><a className={styles.button} href="#experiencia">Conoce la casa ↗</a><a className={styles.textLink} href="#cervezas">¿Cuál es tu estilo? ↓</a></div><span className={styles.heroStamp}>FÁBRICA<br/>RESTAURANTE<br/>JARDÍN</span></div>
    <figure className={styles.heroPhoto}><Image src="/cerveceria-cholula/fiesta-original.webp" alt="Ilustración original: personajes geométricos brindan entre agaves y colores de Cholula" fill priority sizes="(max-width:760px) 100vw, 53vw"/></figure>
   </section>
   <div className={styles.ribbon} aria-hidden="true"><span>HECHA PARA ENCONTRARNOS</span><i>✳</i><span>CERVEZA • COCINA • JARDÍN</span><i>✳</i><span>NOS VEMOS EN CHOLULA</span></div>
   <section id="experiencia" className={styles.experience} aria-labelledby="place-title">
    <div className={styles.sectionHeading}><p className={styles.eyebrow}>PASA, ESTÁS EN CHOLULA</p><h2 id="place-title">UNA CASA.<br/><em>MUCHOS PLANES.</em></h2><p>Empieza por una cerveza.<br/>Quédate por todo lo demás.</p></div>
    <div className={styles.experienceRows}>
     <article><span className={styles.tileSymbol} aria-hidden="true">✳</span><p className={styles.small}>01 / FÁBRICA</p><h3>De aquí,<br/>con carácter.</h3><p>La cerveza artesanal es el corazón de la casa. Pregunta por las etiquetas disponibles y encuentra la que va contigo.</p><a href="#cervezas">Explora los sabores ↗</a></article>
     <article><span className={styles.tileSymbol} aria-hidden="true">✺</span><p className={styles.small}>02 / RESTAURANTE</p><h3>La mesa<br/>nos reúne.</h3><p>Un lugar para comer, brindar y poner la conversación al día. Consulta la carta directamente con el equipo.</p><a href="#carta">Arma tu plan de comida ↗</a></article>
     <article><span className={styles.tileSymbol} aria-hidden="true">❋</span><p className={styles.small}>03 / JARDÍN</p><h3>Un ratito<br/>se vuelve tarde.</h3><p>La sobremesa también tiene su lugar al aire libre. Ven con tu gente y consulta las opciones para tu visita.</p><a href="#visita">Encuentra la casa ↗</a></article>
    </div>
   </section>
   <section id="cervezas" className={styles.beerSection} aria-labelledby="beer-title"><div className={styles.sectionHeading}><p className={styles.eyebrow}>CURIOSIDAD EN CADA TRAGO</p><h2 id="beer-title">¿A QUÉ SABE<br/><em>TU PRÓXIMO PLAN?</em></h2><p>Una guía breve de sabores cerveceros.<br/>Encuentra tu perfil y pregunta por las etiquetas de la casa.</p></div><BeerExplorer/></section>
   <section id="carta" className={styles.foodSection} aria-labelledby="menu-title"><div className={styles.foodPoster} aria-hidden="true"><span>LA MESA<br/>ESTÁ PUESTA.</span><b>✳</b><span>QUE NO FALTE<br/>TU GENTE.</span></div><div className={styles.foodCopy}><p className={styles.eyebrow}>ALGO RICO. ALGO FRÍO. BUENA COMPAÑÍA.</p><h2 id="menu-title">EL ANTOJO<br/>TAMBIÉN<br/><em>TIENE PLAN.</em></h2><p>Consulta la carta de comida y bebidas con el equipo. Te ayudarán con las opciones disponibles y las dudas sobre ingredientes.</p><a className={styles.button} href={brewery.linktree} {...official}>Pide la carta al equipo ↗</a><p className={styles.fine}>Abre los canales de contacto de Cervecería Cholula.</p></div></section>
   <section className={styles.gathering}><p className={styles.eyebrow}>¿CUMPLEAÑOS, REUNIÓN O UNA BUENA EXCUSA?</p><h2>JUNTA<br/>A TU <em>GENTE.</em></h2><div><p>Los mejores planes empiezan con un “¿y si nos vemos?”. Cuéntale al equipo qué quieres organizar y consulta las posibilidades del espacio.</p><a href="#visita" className={styles.button}>Dale forma a tu plan ↗</a><a className={styles.eventsLink} href={brewery.instagram} {...official}>Novedades en Instagram ↗</a></div></section>
   <section id="visita" className={styles.visit} aria-labelledby="visit-title"><div><p className={styles.eyebrow}>NOS VEMOS EN LA CASA</p><h2 id="visit-title">CHOLULA<br/><em>TE ESPERA.</em></h2><address>{brewery.address}</address><a className={styles.button} href={brewery.map} {...official}>Cómo llegar ↗</a><div className={styles.visitNotes}><h3>Antes de salir</h3><p>Confirma los horarios de hoy, la disponibilidad y las opciones para grupos con el equipo de Cervecería Cholula.</p><a href={brewery.linktree} {...official}>Canales de contacto ↗</a><a href={brewery.instagram} {...official}>Lo que pasa en la casa ↗</a></div></div><VisitPlanner/></section>
  </main>
  <footer className={styles.footer}><div className={styles.footerWord}>BUENA VIDA.</div><div className={styles.footerBottom}><span>CERVECERÍA CHOLULA · CERVEZA / COCINA / JARDÍN</span><a href="#inicio">Arriba ↑</a></div><p>Propuesta independiente de LAB, no es el sitio oficial. Ilustración original de concepto. Contenido y ubicación sujetos a validación del negocio. No se registran reservas ni se procesan pagos desde esta propuesta. Alcohol exclusivo para mayores de edad. Evita el exceso.</p></footer>
  <div className={styles.mobileBar}><a href={brewery.linktree} {...official}>Pedir la carta ↗</a><a href="#visita">Armar un plan ↗</a></div>
 </div>
}
