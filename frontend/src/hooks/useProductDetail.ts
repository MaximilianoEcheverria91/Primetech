import { useState, useEffect } from 'react';
import type { ProductResponse } from '../types/product.type';
import { productService } from '../services/product.service';

export const useProductDetail = (id: string | number | undefined) => {
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID de producto no válido');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProductById(Number(id));
        setProduct(data);
      } catch (err: any) {
        console.error('Error al cargar el detalle del producto:', err);
        setError('No se pudo cargar la información del producto.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};
