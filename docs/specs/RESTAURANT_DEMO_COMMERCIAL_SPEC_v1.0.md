# Goal y especificación — demo comercial reutilizable v1.0

Fecha: 2026-09-24. Alcance autorizado en conversación por el usuario.
Estado: implementación autorizada; revisión de publicación pendiente.

## /goal
Convertir Paco’s en una demostración comercial convincente y una base reutilizable
para restaurantes. Incorporar aprendizajes de Valhalla y principios de claridad,
acceso directo al menú y contacto, sin atribuir conversiones o éxito no medidos.
Paco’s sigue siendo el ejemplo; cada cliente contratado tendrá proyecto independiente.

## Decisiones
Los documentos APPROVED del sprint anterior permanecen congelados. Esta iteración
supersede solamente la aceptación de placeholders vacíos, el CTA de menú hacia
WhatsApp y la indexación del demo. Sin precios del servicio ni estrategia privada.
No se activa contacto real, compra dominio, publica en main ni modifica Valhalla.

## Requisitos y aceptación
| ID | Requisito | Aceptación |
| --- | --- | --- |
| C01 | Identificar propuesta | Aviso visible al entrar y metadata/OG identifican demostración; no se presenta como sitio oficial. |
| C02 | Primera pantalla útil | Menú, ubicación y contacto alcanzables; contenido visible sin esperar animación. |
| C03 | Menú explorable | Categorías y descripciones ilustrativas, sin precios ni afirmaciones de ventas inventados; sin recuadros de imágenes vacíos. |
| C04 | Contacto de demo | Botones abren explicación y muestra del mensaje; no enlace a teléfono personal ni envío. |
| C05 | Ubicación honesta | Dirección/horarios provisionales señalados, mapa derivado de config, Instagram no confirmado no enlazado. |
| C06 | SEO del demo | noindex/nofollow en metadata, sitemap vacío y sin JSON-LD de negocio hasta producción. Permitir rastreo para leer noindex. |
| C07 | Reutilización | Nombre, subtítulo, datos, textos, categorías y colores configurables fuera de componentes; documentar adaptación y gate de producción. |
| C08 | Cartelera | Sin anuncio de evento inexistente; módulo opcional y filtros por fecha local, actualización por solicitud. |
| C09 | Accesibilidad | 360/768/1280 sin overflow; teclado y foco visibles, salto a contenido, reduced-motion, controles con nombres. |
| C10 | Validación | Build, lint y revisión de recorridos en navegador; PR y preview antes de merge. |

## Fuera del alcance
CMS, cobros, pedidos reales, reservas automáticas, testimonios, resultados de ventas,
analítica de terceros activa, plataforma multicliente y fotografías no autorizadas.
El paquete de servicio no implica implementar esos módulos en esta demostración.

## Gate de producción por cliente
Confirmar identidad, dirección, horarios, Instagram, menú/precios y permisos de assets;
proveer contacto comercial en proyecto independiente; verificar dominio del dueño,
alojamiento apto para uso comercial y condiciones de mantenimiento/entrega fuera de
este repo público. Definir medición y privacidad antes de activarla. Habilitar SEO
solo al aprobar contenido y dominio. Revisar enlaces y móvil. Contacto por WhatsApp
no significa pedido o reserva confirmada.
