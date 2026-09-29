"use client";
import { useState, type CSSProperties } from "react";
import {
  beerStyles, brewery,
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
            style={{ "--beer-color": beer.tone } as CSSProperties}
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
            Organiza tu visita ↗
          </a>
          <small>
            Los perfiles describen estilos cerveceros, no un catálogo. Consulta con el equipo las etiquetas disponibles.
          </small>
        </div>
      </div>
    </div>
  );
}

export function VisitPlanner() {
  const [reason, setReason] = useState("Una visita al restaurante");
  const [group, setGroup] = useState("2 personas");
  const [preview, setPreview] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
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
          setCopyStatus("");
        }}
      >
        <label htmlFor="visit-reason">Me interesa</label>
        <select
          id="visit-reason"
          value={reason}
          onChange={(event) => {
            setReason(event.target.value);
            setPreview(false);
            setCopyStatus("");
          }}
        >
          <option>Una visita al restaurante</option>
          <option>Consultar sobre la fábrica</option>
          <option>Consultar opciones para una reunión</option>
        </select>
        <label htmlFor="visit-group">Vamos en grupo de</label>
        <select
          id="visit-group"
          value={group}
          onChange={(event) => {
            setGroup(event.target.value);
            setPreview(false);
            setCopyStatus("");
          }}
        >
          <option>2 personas</option>
          <option>3 a 6 personas</option>
          <option>7 a 12 personas</option>
          <option>Más de 12 personas</option>
        </select>
        <button type="submit" className={styles.button}>
          Preparar mi consulta <span aria-hidden="true">↗</span>
        </button>
      </form>
      <div role="status" aria-live="polite">
        {preview && (
          <div className={styles.messagePreview}>
            <strong>Tu consulta, lista para revisar</strong>
            <p>{message}</p>
            <button type="button" className={styles.copyButton} onClick={async () => {
              try {
                await navigator.clipboard.writeText(message);
                setCopyStatus("Consulta copiada. Ya puedes pegarla en el canal que elijas.");
              } catch {
                setCopyStatus("Puedes seleccionar y copiar el texto de tu consulta manualmente.");
              }
            }}>Copiar consulta</button>
            {copyStatus ? <p>{copyStatus}</p> : null}
            <a href={brewery.linktree} target="_blank" rel="noopener noreferrer" className={styles.textLink}>Abrir canales de contacto ↗</a>
            <small>
              Copia esta consulta y compártela con el equipo por sus canales de contacto. La disponibilidad se confirma directamente con el negocio.
            </small>
          </div>
        )}
      </div>
      <p className={styles.fine}>
        La consulta se prepara en tu pantalla. No se envía ni se guarda ningún dato.
      </p>
    </div>
  );
}
