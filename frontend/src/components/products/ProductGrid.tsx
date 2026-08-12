import { ProductCard } from './ProductCard';
import type { ProductResponse } from '../../types/product.type';
import { Loader2 } from 'lucide-react';

interface ProductGridProps {
  products: ProductResponse[];
  loading: boolean;
  error: string | null;
}

export const ProductGrid = ({ products, loading, error }: ProductGridProps) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-pt-secondary animate-spin mb-4" />
        <p className="text-pt-text-main">Cargando catálogo de productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center border-2 border-dashed border-red-500/50 rounded-xl">
        <p className="text-red-400 text-lg mb-2">Ocurrió un error al cargar los productos</p>
        <p className="text-pt-text-muted">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center border-2 border-dashed border-pt-border/50 rounded-xl">
        <p className="text-pt-text-main text-lg">No se encontraron productos.</p>
        <p className="text-pt-text-muted">Intenta ajustando tus filtros.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-pt-text-pure mb-1">Productos disponibles</h2>
        <p className="text-pt-text-muted">{products.length} Productos encontrados</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
