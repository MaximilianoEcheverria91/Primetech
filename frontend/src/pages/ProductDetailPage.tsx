import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ProductGallery } from '../components/products/ProductGallery';
import { ProductInfo } from '../components/products/ProductInfo';
import { ProductDescription } from '../components/products/ProductDescription';
import { useProductDetail } from '../hooks/useProductDetail';
import { Loader2, ArrowLeft } from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProductDetail(id);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#030213] text-[#CBCED4]">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[500px]">
            <Loader2 className="w-12 h-12 text-[#00BBFF] animate-spin mb-4" />
            <p className="text-white font-medium">Cargando detalle del producto...</p>
          </div>
        ) : error || !product ? (
          <div className="flex flex-col items-center justify-center min-h-[450px] p-8 text-center bg-[#0A1A2F]/40 border border-[#0C6A6F] rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">Producto no encontrado</h2>
            <p className="text-[#A3A1A1] mb-6">{error || 'El producto que buscas no existe o fue retirado.'}</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#4AB94E] hover:bg-[#3ea042] text-black font-bold px-6 py-3 rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al catálogo</span>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Breadcrumb Navigation */}
            <nav className="text-xs md:text-sm text-[#A3A1A1] flex items-center gap-2 flex-wrap">
              <Link to="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span className="hover:text-white transition-colors cursor-pointer">
                {product.categoryName || 'Componentes'}
              </span>
              <span>/</span>
              <span className="text-white font-medium line-clamp-1">{product.name}</span>
            </nav>

            {/* Main 2-Column Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <ProductGallery
                images={product.images}
                productName={product.name}
                onSale={product.onSale}
              />
              <ProductInfo product={product} />
            </div>

            {/* Bottom Description Section */}
            <ProductDescription description={product.description} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
