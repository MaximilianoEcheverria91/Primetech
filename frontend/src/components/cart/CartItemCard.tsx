import type { CartItem } from '../../types/cart.type';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { Trash2, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartItemCardProps {
  item: CartItem;
}

export const CartItemCard = ({ item }: CartItemCardProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const primaryImage =
    item.product.images?.find((img) => img.isPrimary)?.url ||
    item.product.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80';

  const brand = (item.product.brandName || 'SAMSUNG').toUpperCase();
  const category = (item.product.categoryName || 'PRODUCTO').toUpperCase();

  return (
    <div className="bg-[#0A1A2F] border border-[#0C6A6F] rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-5 relative group transition-all duration-300">
      
      {/* Izquierda: Contenedor de Imagen */}
      <Link 
        to={`/product/${item.product.id}`}
        className="w-full sm:w-28 h-28 bg-white rounded-xl p-2 flex items-center justify-center flex-shrink-0"
      >
        <img
          src={primaryImage}
          alt={item.product.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80';
          }}
          className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
        />
      </Link>

      {/* Centro: Info del Producto */}
      <div className="flex-grow flex flex-col gap-1 w-full text-left">
        <span className="text-[11px] font-bold text-[#A3A1A1] tracking-wider">
          {brand} - {category}
        </span>
        <Link
          to={`/product/${item.product.id}`}
          className="text-white text-base md:text-lg font-semibold hover:text-[#00BBFF] transition-colors line-clamp-1"
        >
          {item.product.name}
        </Link>
        <span className="text-[#00BBFF] font-bold text-lg md:text-xl mt-1">
          {formatCurrency(item.product.price)}
        </span>
      </div>

      {/* Derecha: Botón Borrar + Controles + Subtotal */}
      <div className="flex flex-col sm:items-end justify-between w-full sm:w-auto h-full gap-4 sm:gap-2">
        {/* Tacho de Basura */}
        <button
          onClick={() => removeFromCart(item.product.id)}
          className="self-end text-red-500 hover:text-red-400 p-1 transition-colors"
          title="Eliminar producto"
          aria-label="Eliminar producto"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-auto">
          {/* Selector de cantidad */}
          <div className="flex items-center bg-[#071322] border border-[#0C6A6F] rounded-lg overflow-hidden">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="p-2 text-[#CBCED4] hover:text-white hover:bg-[#0C6A6F]/20 transition-colors"
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 py-1 font-bold text-white text-sm min-w-[2rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              disabled={item.quantity >= item.product.stock}
              className="p-2 text-[#CBCED4] hover:text-white hover:bg-[#0C6A6F]/20 disabled:opacity-40 transition-colors"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Subtotal del item */}
          <span className="text-[#00B822] font-bold text-lg md:text-xl whitespace-nowrap">
            {formatCurrency(item.product.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
};
