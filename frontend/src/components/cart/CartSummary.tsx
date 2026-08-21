import type { CartItem } from '../../types/cart.type';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../common/Button';

interface CartSummaryProps {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  onCheckout: () => void;
}

export const CartSummary = ({
  items,
  subtotal,
  discount,
  total,
  onCheckout,
}: CartSummaryProps) => {
  const hasItems = items.length > 0;

  return (
    <div className="bg-[#0A1A2F] border border-[#0C6A6F] rounded-2xl p-6 flex flex-col justify-between h-fit w-full shadow-lg">
      <div className="flex flex-col gap-4">
        {/* Encabezado */}
        <h2 className="text-[#00BBFF] font-bold text-lg tracking-wider uppercase mb-1">
          RESUMEN DEL PEDIDO
        </h2>

        {hasItems ? (
          <>
            {/* Lista compacta de ítems */}
            <div className="flex flex-col gap-2.5 max-h-60 overflow-y-auto pr-1 text-sm text-[#CBCED4] scrollbar-thin">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-baseline gap-2">
                  <span className="truncate max-w-[200px] text-xs md:text-sm">
                    {item.product.name} <span className="text-[#00BBFF] font-semibold">x{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-white text-xs md:text-sm flex-shrink-0">
                    {formatCurrency(item.product.price)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#0C6A6F]/40 my-1" />

            {/* Subtotal */}
            <div className="flex justify-between items-center text-sm text-[#CBCED4]">
              <span>Subtotal</span>
              <span className="text-white font-semibold">{formatCurrency(subtotal)}</span>
            </div>

            {/* Descuentos */}
            <div className="flex justify-between items-center text-sm text-[#CBCED4]">
              <span>Des. Productos</span>
              <span className="text-[#00B822] font-semibold">
                {discount > 0 ? `- ${formatCurrency(discount)}` : '$ 0'}
              </span>
            </div>

            {/* Envío */}
            <div className="flex justify-between items-center text-sm text-[#CBCED4]">
              <span>Envio</span>
              <span className="text-[#00B822] font-bold tracking-wide">GRATIS</span>
            </div>

            <div className="border-t border-[#0C6A6F]/40 my-1" />

            {/* TOTAL */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-xl md:text-2xl font-bold text-white tracking-wide">TOTAL</span>
              <span className="text-2xl md:text-3xl font-bold text-[#00B822]">
                {formatCurrency(total)}
              </span>
            </div>

            {/* Botón Comprar */}
            <Button
              variant="primary"
              showArrow
              onClick={onCheckout}
              className="w-full py-4 text-base mt-4 uppercase tracking-wider"
            >
              COMPRAR AHORA
            </Button>
          </>
        ) : (
          <>
            <p className="text-xs text-[#A3A1A1] my-2">
              No tienes productos en tu carrito
            </p>

            <div className="border-t border-[#0C6A6F]/40 my-1" />

            <div className="flex justify-between items-center text-sm text-[#CBCED4]">
              <span>Subtotal</span>
              <span className="text-white font-semibold">-</span>
            </div>

            <div className="border-t border-[#0C6A6F]/40 my-1" />

            <div className="flex justify-between items-center pt-4">
              <span className="text-xl md:text-2xl font-bold text-white tracking-wide">TOTAL</span>
              <span className="text-2xl font-bold text-[#00B822]">-</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
