export type MenuItem = {
  id: string
  category: string
  name: string
  description: string
  price?: number
}
export const menuCategories = [
  { id: 'wings', label: 'Alitas & boneless' },
  { id: 'sides', label: 'Para compartir' },
  { id: 'drinks', label: 'Bebidas' },
]
// Contenido de muestra, no carta oficial ni oferta comercial del restaurante.
export const menuItems: MenuItem[] = [
  { id: 'classic', category: 'wings', name: 'Classic wings', description: 'Alitas y tu salsa favorita. Un clásico para abrir la mesa.' },
  { id: 'bbq', category: 'wings', name: 'Wings BBQ', description: 'Una propuesta de sabor ahumado, para quienes prefieren el toque dulce.' },
  { id: 'boneless', category: 'wings', name: 'Boneless', description: 'Bocados de pollo para acompañar con salsa y compartir al centro.' },
  { id: 'fries', category: 'sides', name: 'Papas para compartir', description: 'El acompañamiento de la mesa. Presentación y complementos por confirmar.' },
  { id: 'mix', category: 'sides', name: 'Alitas para el grupo', description: 'Una selección para probar entre todos. Porciones por confirmar.' },
  { id: 'beer', category: 'drinks', name: 'Cervezas & bebidas', description: 'La selección de bebidas del negocio aparecerá aquí con sus presentaciones.' },
]
