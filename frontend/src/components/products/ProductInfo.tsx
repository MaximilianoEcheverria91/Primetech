import { useState } from 'react';
import type { ProductResponse } from '../../types/product.type';
import { formatCurrency } from '../../utils/formatCurrency';
import {
  Star,
  Truck,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  ShieldCheck,
  CreditCard,
  Lock,
} from 'lucide-react';

interface ProductInfoProps {
  product: ProductResponse;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const isOutOfStock = product.stock <= 0;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const cashPrice = product.price * 0.9;
  const installmentPrice = product.price / 12;

  return (
    <div className="flex flex-col gap-6 text-[#CBCED4] w-full">
      {/* Top Header: Brand Tag & Rating */}
      <div className="flex items-center justify-between gap-4">
        <span className="border border-[#0C6A6F] bg-[#0C6A6F]/10 text-[#00BBFF] text-xs font-semibold px-4 py-1.5 rounded-lg">
          {product.brandName || 'PrimeTech'}
        </span>
        <div className="flex items-center gap-1.5 text-sm">
          <div className="flex items-center text-blue-500">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 text-slate-500" />
          </div>
          <span className="text-[#A3A1A1] text-xs ml-1">(239)</span>
        </div>
      </div>

      {/* Title & SKU */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
          {product.name}
        </h1>
        <p className="text-xs text-[#A3A1A1]">
          SKU: SAM-OD-G4-{product.id}
        </p>
      </div>

      {/* Price Box */}
      <div className="bg-[#0A1A2F] border border-[#0C6A6F] rounded-2xl p-5 md:p-6 relative flex flex-col gap-4">
        {product.onSale && (
          <span className="absolute top-5 right-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded">
            -17%
          </span>
        )}

        <div className="flex items-baseline gap-3">
          <span className="text-3xl md:text-4xl font-bold text-white">
            {formatCurrency(product.price)}
          </span>
          {product.onSale && (
            <span className="text-[#A3A1A1] text-base line-through">
              {formatCurrency(product.price * 1.16)}
            </span>
          )}
        </div>

        {/* Subcaja con borde punteado */}
        <div className="border border-dashed border-[#0C6A6F] rounded-xl p-3.5 bg-[#071322]/60 flex items-center justify-between gap-2 flex-wrap text-sm">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#00BBFF]" />
            <span className="text-white font-medium">
              Precio en efectivo / Transferencia :
            </span>
            <span className="text-white font-bold">{formatCurrency(cashPrice)}</span>
          </div>
          <span className="bg-blue-600/30 text-[#00BBFF] text-xs font-semibold px-2 py-0.5 rounded border border-[#00BBFF]/30">
            -10% OFF
          </span>
        </div>

        <p className="text-xs text-[#A3A1A1]">
          O hasta 12 cuotas sin interés de {formatCurrency(installmentPrice)}
        </p>
      </div>

      {/* Availability Status */}
      <div className="flex items-center gap-3 text-sm">
        {!isOutOfStock ? (
          <>
            <div className="flex items-center gap-2 text-[#00B822] font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00B822] animate-pulse inline-block" />
              <span>{product.stock} unidades en stock</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5 text-[#CBCED4]">
              <Truck className="w-4 h-4 text-blue-400" />
              <span>Envio gratis</span>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 text-red-500 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
            <span>Sin stock disponible</span>
          </div>
        )}
      </div>

      {/* Actions & Quantity */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center bg-[#0A1A2F] border border-[#0C6A6F] rounded-xl p-1">
            <button
              onClick={handleDecrease}
              disabled={quantity <= 1 || isOutOfStock}
              className="p-2 text-[#CBCED4] hover:text-white disabled:opacity-40 transition-colors"
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 font-bold text-white min-w-[2.5rem] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              disabled={quantity >= product.stock || isOutOfStock}
              className="p-2 text-[#CBCED4] hover:text-white disabled:opacity-40 transition-colors"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            disabled={isOutOfStock}
            className={`flex-grow flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white text-sm transition-all duration-200 shadow-lg ${
              isOutOfStock
                ? 'bg-slate-700 cursor-not-allowed opacity-50'
                : 'bg-blue-700 hover:bg-blue-600 active:scale-[0.98]'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Agregar al carrito</span>
          </button>

          {/* Favorite Button */}
          <button
            className="p-3 border border-[#0C6A6F] bg-[#0A1A2F] hover:bg-[#0C6A6F]/20 text-[#CBCED4] hover:text-white rounded-xl transition-colors"
            aria-label="Agregar a favoritos"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Buy Now Button */}
        <button
          disabled={isOutOfStock}
          className="w-full py-3 border border-blue-600 bg-[#071322] hover:bg-blue-600/20 text-white font-bold text-sm tracking-wider rounded-xl transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed"
        >
          COMPRAR AHORA
        </button>
      </div>

      {/* Trust Stamps / Cards */}
      <div className="grid grid-cols-3 gap-3 pt-2">
        <div className="bg-[#0A1A2F] border border-[#0C6A6F]/60 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2">
          <ShieldCheck className="w-6 h-6 text-blue-500" />
          <span className="text-xs text-[#CBCED4] font-medium">Garantía 3 años</span>
        </div>
        <div className="bg-[#0A1A2F] border border-[#0C6A6F]/60 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2">
          <CreditCard className="w-6 h-6 text-blue-500" />
          <span className="text-xs text-[#CBCED4] font-medium">Pago Seguro</span>
        </div>
        <div className="bg-[#0A1A2F] border border-[#0C6A6F]/60 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2">
          <Lock className="w-6 h-6 text-blue-500" />
          <span className="text-xs text-[#CBCED4] font-medium">Devolución 30d</span>
        </div>
      </div>
    </div>
  );
};
