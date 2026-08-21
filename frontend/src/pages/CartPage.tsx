import { useState } from 'react';
import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import { CartItemCard } from '../components/cart/CartItemCard';
import { CartSummary } from '../components/cart/CartSummary';
import { EmptyCart } from '../components/cart/EmptyCart';
import { ClearCartModal } from '../components/cart/ClearCartModal';
import { useCart } from '../contexts/CartContext';

export const CartPage = () => {
  const { items, totalItems, subtotal, discount, total, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmClear = () => {
    clearCart();
    setIsModalOpen(false);
  };

  const handleCheckout = () => {
    alert('¡Procesando pedido! Gracias por elegir PrimeTech.');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#030213] text-[#CBCED4]">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {/* Encabezado Principal */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <span className="w-1.5 h-7 bg-[#00BBFF] rounded-full inline-block" />
            <h1 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider">
              CARRITO DE COMPRAS
            </h1>
          </div>
          <p className="text-xs md:text-sm text-[#A3A1A1] pl-4">
            Hardware de alto rendimiento · Envíos a todo el país
          </p>
        </div>

        {/* Fila Subencabezado: Mi Carrito (Count) & Vaciar Carrito */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg font-bold text-white tracking-wide">
            MI CARRITO <span className="text-[#A3A1A1] font-normal text-sm">({totalItems})</span>
          </h2>

          {items.length > 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-500 text-xs px-3.5 py-1.5 rounded-lg uppercase tracking-wider font-semibold transition-all"
            >
              VACIAR CARRITO
            </button>
          )}
        </div>

        {/* Grid Principal: Lista/EmptyCart a la izquierda, Resumen a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Columna Izquierda (span 2 en lg) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.length > 0 ? (
              items.map((item) => (
                <CartItemCard key={item.product.id} item={item} />
              ))
            ) : (
              <EmptyCart />
            )}
          </div>

          {/* Columna Derecha (span 1 en lg) */}
          <div className="lg:col-span-1">
            <CartSummary
              items={items}
              subtotal={subtotal}
              discount={discount}
              total={total}
              onCheckout={handleCheckout}
            />
          </div>

        </div>
      </main>

      <Footer />

      {/* Modal de Confirmación para Vaciar Carrito */}
      <ClearCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmClear}
      />
    </div>
  );
};
