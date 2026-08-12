import type { ProductResponse } from '../../types/product.type';
import { formatCurrency } from '../../utils/formatCurrency';

interface ProductCardProps {
  product: ProductResponse;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const isOutOfStock = product.stock <= 0 || product.status === 'OUT_OF_STOCK';
  const primaryImage = 
    product.images?.find(img => img.isPrimary)?.url || 
    product.images?.[0]?.url || 
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80'; // Foto genérica de Hardware HD

  return (
    <div className="bg-[#0A1A2F] border border-[#0C6A6F] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,208,255,0.25)] group">
      {/* Imagen + Badge Oferta */}
      <div className="relative bg-white p-4 flex items-center justify-center min-h-[220px]">
        <img 
          src={primaryImage} 
          alt={product.name} 
          onError={(e) => {
            // Si la imagen falla o no carga, la reemplaza por el fallback sin romper la card
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80';
          }}
          className="max-h-[180px] object-contain group-hover:scale-105 transition-transform duration-300" 
        />
        {product.onSale && (
          <div className="absolute bottom-2 right-2 bg-gradient-to-r from-[#F59E0B] to-[#FF0000] text-white text-xs font-bold px-2 py-1 rounded">
            -15%
          </div>
        )}
      </div>

      {/* Contenido de la Card */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-[#CBCED4] text-sm font-normal line-clamp-2 min-h-[40px] mb-2">
            {product.name}
          </h3>

          {/* Precios */}
          <div className="mb-2">
            {product.onSale && (
              <span className="text-[#A3A1A1] text-xs line-through block">
                {formatCurrency(product.price * 1.15)}
              </span>
            )}
            <span className="text-white text-2xl font-bold">
              {formatCurrency(product.price)}
            </span>
          </div>

          {/* Estado de Stock */}
          <div className="mb-3 text-xs">
            {isOutOfStock ? (
              <span className="text-red-500 font-medium">
                Sin Stock (disponible a partir del 12/02/26)
              </span>
            ) : (
              <span className="text-[#00B822] font-medium">
                Stock disponible ({product.stock})
              </span>
            )}
            <p className="text-[#A3A1A1] text-[11px] mt-0.5">
              Precio efectivo s/imp. nac. {formatCurrency(product.price * 0.9)}
            </p>
          </div>
        </div>

        {/* Acciones */}
        <div className="mt-2 space-y-2">
          <button className="text-[#31A7A7] text-xs font-semibold hover:underline block w-full text-left">
            VER DETALLE...
          </button>
          
          <button 
            disabled={isOutOfStock}
            className={`w-full py-2 rounded-lg text-black font-semibold text-sm transition-colors ${
              isOutOfStock 
                ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                : 'bg-[#4AB94E] hover:bg-[#3ea042]'
            }`}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};