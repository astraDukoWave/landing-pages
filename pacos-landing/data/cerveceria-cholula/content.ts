// Demo editorial. No catalog, prices or service availability is asserted.
export const brewery = {
  name: "Cervecería Cholula",
  instagram: "https://www.instagram.com/cerveceria.cholula/",
  linktree: "https://linktr.ee/cerveceriacholula",
  address: "13 Oriente 412, San Pablo Tecámac, San Pedro Cholula, Puebla.",
  map: "https://www.google.com/maps/search/?api=1&query=19.054945%2C-98.306349",
  addressNote: "Ubicación de la ficha municipal; por confirmar con el negocio.",
  intro:
    "Cerveza artesanal, cocina y jardín en San Pedro Cholula. Un lugar para encontrarse, descubrir sabores y alargar la sobremesa.",
  photo: "/cerveceria-cholula/beer.jpg",
  photoNote: "Fotografía ilustrativa · no representa el producto del negocio",
};
export const beerStyles = [
  {
    id: "suave",
    label: "Ligera y fresca",
    name: "Un comienzo ligero.",
    style: "Familia lager",
    body: "Perfil limpio, notas de cereal y un final refrescante. Una referencia para quienes buscan sabores suaves.",
    note: "Cereal · frescura · equilibrio",
    tone: "#e5ab3a",
    level: "Suave",
  },
  {
    id: "lupulo",
    label: "Lúpulo y carácter",
    name: "Un poco más de carácter.",
    style: "Familia pale ale / IPA",
    body: "Aromas cítricos o herbales, con amargor más presente. Una referencia para explorar la expresión del lúpulo.",
    note: "Cítricos · lúpulo · aroma",
    tone: "#bc6426",
    level: "Marcado",
  },
  {
    id: "tostada",
    label: "Malta y tostados",
    name: "El lado de la malta.",
    style: "Familia porter / stout",
    body: "Notas tostadas que pueden recordar al cacao o al café. Una referencia para quienes prefieren profundidad de sabor.",
    note: "Tostados · cacao · malta",
    tone: "#51332b",
    level: "Variable",
  },
];
export const menuCategories = [
  "Todo",
  "Para compartir",
  "Plato fuerte",
  "Sin alcohol",
] as const;
export const sampleMenu = [
  {
    name: "Algo para el centro",
    category: "Para compartir",
    detail: "Una entrada para abrir la mesa y acompañar la conversación.",
  },
  {
    name: "Pizza para compartir",
    category: "Para compartir",
    detail:
      "Aquí se mostrarían ingredientes, tamaño y precio de la carta vigente.",
  },
  {
    name: "Hamburguesa de la casa",
    category: "Plato fuerte",
    detail: "Espacio de muestra para el plato, sus acompañamientos y opciones.",
  },
  {
    name: "Una opción sin carne",
    category: "Plato fuerte",
    detail:
      "Ejemplo de cómo identificar alternativas y consultar sus ingredientes.",
  },
  {
    name: "Algo fresco, sin alcohol",
    category: "Sin alcohol",
    detail:
      "Espacio para aguas, refrescos y otras bebidas que confirme el negocio.",
  },
];
export const experiences = [
  {
    number: "01",
    title: "La cerveza",
    subtitle: "El origen de la conversación",
    text: "Una fábrica de cerveza artesanal en Cholula. Conoce el lugar donde empieza la experiencia.",
    tag: "Fábrica",
  },
  {
    number: "02",
    title: "La mesa",
    subtitle: "Se disfruta en compañía",
    text: "La cocina forma parte del plan. Una carta fácil de explorar antes de decidir qué pedir.",
    tag: "Restaurante",
  },
  {
    number: "03",
    title: "El jardín",
    subtitle: "Que la sobremesa se alargue",
    text: "Un espacio al aire libre para encontrarse. Consulta con el equipo las opciones para tu visita.",
    tag: "Jardín",
  },
];
