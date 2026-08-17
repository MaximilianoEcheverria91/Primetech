import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useProductDetail } from './useProductDetail';
import { productService } from '../services/product.service';
import type { ProductResponse } from '../types/product.type';

vi.mock('../services/product.service', () => ({
  productService: {
    getProductById: vi.fn(),
  },
}));

const mockProduct: ProductResponse = {
  id: 1,
  name: 'Samsung Odyssey G4',
  description: 'Monitor Gamer 240Hz IPS',
  price: 250000,
  stock: 7,
  status: 'AVAILABLE',
  onSale: true,
  offerPrice: 210000,
  brandId: 6,
  brandName: 'Samsung',
  categoryId: 6,
  categoryName: 'Monitores',
  images: [
    { id: 1, url: 'https://example.com/g4-front.jpg', isPrimary: true },
    { id: 2, url: 'https://example.com/g4-side.jpg', isPrimary: false },
  ],
};

describe('useProductDetail Custom Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('debe iniciar cargando y luego retornar los datos del producto solicitado', async () => {
    vi.mocked(productService.getProductById).mockResolvedValueOnce(mockProduct);

    const { result } = renderHook(() => useProductDetail('1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.product).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.product).toEqual(mockProduct);
    expect(result.current.error).toBeNull();
  });

  it('debe manejar error cuando la API falla o el producto no existe', async () => {
    vi.mocked(productService.getProductById).mockRejectedValueOnce(new Error('Product not found'));

    const { result } = renderHook(() => useProductDetail('999'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.product).toBeNull();
    expect(result.current.error).toBe('No se pudo cargar la información del producto.');
  });

  it('debe setear error inmediato si el ID provisto es undefined o vacío', async () => {
    const { result } = renderHook(() => useProductDetail(undefined));

    expect(result.current.loading).toBe(false);
    expect(result.current.product).toBeNull();
    expect(result.current.error).toBe('ID de producto no válido');
  });
});