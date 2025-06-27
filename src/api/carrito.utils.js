// Utilidades para manejar el carrito en localStorage

export function getCarrito() {
  const carrito = localStorage.getItem('carritoServicios');
  return carrito ? JSON.parse(carrito) : [];
}

export function addToCarrito(servicio) {
  const carrito = getCarrito();
  carrito.push(servicio);
  localStorage.setItem('carritoServicios', JSON.stringify(carrito));
}

export function removeFromCarrito(index) {
  const carrito = getCarrito();
  carrito.splice(index, 1);
  localStorage.setItem('carritoServicios', JSON.stringify(carrito));
}

export function clearCarrito() {
  localStorage.removeItem('carritoServicios');
}
