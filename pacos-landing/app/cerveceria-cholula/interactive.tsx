"use client";
import { useState } from "react";
import {
  beerStyles,
  menuCategories,
  sampleMenu,
} from "@/data/cerveceria-cholula/content";
import styles from "./styles.module.css";

export function BeerExplorer() {
  const [selected, setSelected] = useState(0);
  const beer = beerStyles[selected];
  return (
    <div className={styles.explorer}>
      <div
        className={styles.choiceBar}
        role="group"
        aria-label="Perfil de sabor"
      >
        {beerStyles.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            {item.label}
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div className={styles.beerDetail} aria-live="polite" aria-atomic="true">
        <div className={styles.beerArt} aria-hidden="true">
          <span className={styles.artCircle} />
          <div
            className={styles.glass}
            style={{ "--beer-color": beer.tone } as React.CSSProperties}
          >
            <div className={styles.foam} />
            <span>
              CERVECERÍA
              <br />
              <b>CHOLULA</b>
            </span>
          </div>
          <span className={styles.artCaption}>UN ESTILO PARA CADA PALADAR</span>
        </div>
        <div className={styles.beerCopy}>
          <p className={styles.eyebrow}>{beer.style}</p>
          <h3>{beer.name}</h3>
          <p>{beer.body}</p>
          <div className={styles.tasting}>
            <span>{beer.note}</span>
            <span>Amargor: {beer.level}</span>
          </div>
          <a className={styles.textLink} href="#visita">
            Preparar una consulta ↗
          </a>
          <small>
            Guía de estilos ilustrativa. Etiquetas y disponibilidad pendientes
            de confirmar; no es la oferta vigente.
          </small>
        </div>
      </div>
    </div>
  );
}

export function MenuExplorer() {
  const [category, setCategory] = useState<string>("Todo");
  const items = sampleMenu.filter(
    (item) => category === "Todo" || item.category === category,
  );
  return (
    <div>
      <div
        className={styles.menuFilters}
        role="group"
        aria-label="Categorías de la carta"
      >
        {menuCategories.map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className={styles.menuCount} aria-live="polite">
        {items.length} {items.length === 1 ? 'propuesta de muestra' : 'propuestas de muestra'} · Sin precios confirmados
      </p>
      <div className={styles.menuList}>
        {items.map((item, index) => (
          <article key={item.name}>
            <span className={styles.menuNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3>{item.name}</h3>
              <p>{item.detail}</p>
            </div>
            <span className={styles.sampleLabel}>EJEMPLO</span>
          </article>
        ))}
      </div>
    </div>
  );
}

export function VisitPlanner() {
  const [reason, setReason] = useState("Una visita al restaurante");
  const [group, setGroup] = useState("2 personas");
  const [preview, setPreview] = useState(false);
  const message = `Hola, Cervecería Cholula. Me interesa: ${reason.toLowerCase()}. Seríamos ${group.toLowerCase()}. ¿Me pueden compartir horarios, disponibilidad y cómo organizar la visita?`;
  return (
    <div className={styles.planner}>
      <p className={styles.eyebrow}>TU PLAN, EN DOS PASOS</p>
      <h3>
        ¿Qué tienes
        <br />
        en mente?
      </h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setPreview(true);
        }}
      >
        <label htmlFor="visit-reason">Me interesa</label>
        <select
          id="visit-reason"
          value={reason}
          onChange={(event) => {
            setReason(event.target.value);
            setPreview(false);
          }}
        >
          <option>Una visita al restaurante</option>
          <option>Conocer la fábrica</option>
          <option>Organizar un evento privado</option>
        </select>
        <label htmlFor="visit-group">Vamos en grupo de</label>
        <select
          id="visit-group"
          value={group}
          onChange={(event) => {
            setGroup(event.target.value);
            setPreview(false);
          }}
        >
          <option>2 personas</option>
          <option>3 a 6 personas</option>
          <option>7 a 12 personas</option>
          <option>Más de 12 personas</option>
        </select>
        <button type="submit" className={styles.button}>
          Ver consulta de ejemplo <span aria-hidden="true">↗</span>
        </button>
      </form>
      <div role="status" aria-live="polite">
        {preview && (
          <div className={styles.messagePreview}>
            <strong>Así se prepararía tu mensaje</strong>
            <p>{message}</p>
            <small>
              No se envió ningún mensaje. Esta demostración no confirma una
              reserva.
            </small>
          </div>
        )}
      </div>
      <p className={styles.fine}>
        Modo demostración. No pedimos datos personales ni enviamos mensajes.
        Servicios y capacidad sujetos a confirmación.
      </p>
    </div>
  );
}
