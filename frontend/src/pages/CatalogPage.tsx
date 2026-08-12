import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { FilterSidebar } from '../components/filters/FilterSidebar';
import { ProductGrid } from '../components/products/ProductGrid';
import { useProducts } from '../hooks/useProducts';

export const CatalogPage = () => {
  const { products, loading, error } = useProducts();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-pt-bg-dark transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-[280px] flex-shrink-0">
            <FilterSidebar />
          </div>
          
          {/* Main Content */}
          <div className="flex-grow">
            <ProductGrid 
              products={products}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
