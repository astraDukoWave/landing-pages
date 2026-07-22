export type MenuItem = {
  name: string
  badge?: string
  // Sin foto real todavía: el componente cae al gradiente de marca (nunca imagen rota).
  imageUrl?: string
}

export const menuItems: MenuItem[] = [
  { name: 'CLASSIC WINGS', badge: 'EL MÁS PEDIDO' },
  { name: 'WINGS BBQ AHUMADAS' },
  { name: 'BONELESS PICOSOS', badge: '🔥 FAVORITO' },
  { name: 'CUBETA DE CHELAS', badge: 'MEJOR OFERTA' },
  { name: 'PAPAS LOADED' },
  { name: 'ALITAS MIX 50 PZS', badge: 'PARA EL GRUPO' },
]
