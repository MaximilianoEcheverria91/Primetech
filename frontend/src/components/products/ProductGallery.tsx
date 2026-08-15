import { useState, useEffect } from 'react';
import type { ProductImage } from '../../types/product.type';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images?: ProductImage[];
  productName: string;
  onSale?: boolean;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80';

export const ProductGallery = ({ images = [], productName, onSale }: ProductGalleryProps) => {
  const imageList = images.length > 0 ? images : [{ id: 0, url: DEFAULT_IMAGE, isPrimary: true }];

  const initialImage = imageList.find((img) => img.isPrimary)?.url || imageList[0]?.url || DEFAULT_IMAGE;

  const [selectedImage, setSelectedImage] = useState<string>(initialImage);

  useEffect(() => {
    const primary = imageList.find((img) => img.isPrimary)?.url || imageList[0]?.url || DEFAULT_IMAGE;
    setSelectedImage(primary);
  }, [images]);

  const currentIndex = imageList.findIndex((img) => img.url === selectedImage);

  const handlePrev = () => {
    if (imageList.length <= 1) return;
    const prevIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    setSelectedImage(imageList[prevIndex].url);
  };

  const handleNext = () => {
    if (imageList.length <= 1) return;
    const nextIndex = (currentIndex + 1) % imageList.length;
    setSelectedImage(imageList[nextIndex].url);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Visor Principal */}
      <div className="relative bg-white rounded-3xl p-8 flex items-center justify-center min-h-[380px] md:min-h-[460px] border border-slate-200 shadow-lg overflow-hidden group">
        <img
          src={selectedImage}
          alt={productName}
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
          }}
          className="max-h-[320px] md:max-h-[400px] w-auto object-contain transition-all duration-300"
        />

        {/* Badge de Oferta */}
        {onSale && (
          <div className="absolute bottom-6 right-6 bg-gradient-to-r from-[#F59E0B] to-[#FF0000] text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-md">
            -15%
          </div>
        )}

        {/* Dots de paginación centrados abajo del visor */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#0A1A2F]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#0C6A6F]/50">
          {imageList.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setSelectedImage(img.url)}
              aria-label={`Ver imagen ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                selectedImage === img.url ? 'w-6 bg-[#00BBFF]' : 'w-2 bg-slate-500 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Carrusel de Miniaturas (Thumbnails) */}
      <div className="flex items-center justify-center gap-3 px-2">
        <button
          onClick={handlePrev}
          className="p-2 text-[#CBCED4] hover:text-white transition-colors"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-4 overflow-x-auto py-1 scrollbar-hide">
          {imageList.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setSelectedImage(img.url)}
              className={`bg-white rounded-2xl p-2 w-24 h-24 flex items-center justify-center border-2 transition-all overflow-hidden flex-shrink-0 ${
                selectedImage === img.url
                  ? 'border-[#00BBFF] shadow-[0_0_12px_rgba(0,187,255,0.4)] scale-105'
                  : 'border-transparent hover:border-slate-300'
              }`}
            >
              <img
                src={img.url}
                alt={`${productName} thumbnail ${idx + 1}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
                }}
                className="max-h-full max-w-full object-contain"
              />
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-2 text-[#CBCED4] hover:text-white transition-colors"
          aria-label="Imagen siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
