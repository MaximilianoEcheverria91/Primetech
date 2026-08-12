import { useState, useEffect } from 'react';
import type { ProductResponse } from '../types/product.type';
import { productService } from '../services/product.service';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err: any) {
      console.error('Error al cargar productos:', err);
      setError('No se pudo conectar con el servidor de PrimeTech.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};