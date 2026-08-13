import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useProducts } from './useProducts';
import { productService } from '../services/product.service';
import type { ProductResponse } from '../types/product.type';

// 1. Mockear la capa de servicios para interceptar las llamadas a Spring Boot
vi.mock('../services/product.service', () => ({
  productService: {
    getAllProducts: vi.fn(),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
  // Silencia las impresiones de console.error durante la prueba para limpiar la consola
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

// Datos simulados de respuesta de la API
const mockProductsList: ProductResponse[] = [
  {
    id: 1,
    name: 'Samsung Odyssey G4',
    description: 'Monitor Gamer 240Hz',
    price: 125.53,
    stock: 10,
    status: 'AVAILABLE',
    onSale: false,
    offerPrice: null,
    brandId: 1,
    brandName: 'Samsung',
    categoryId: 1,
    categoryName: 'Monitores',
    images: [{ id: 1, url: 'https://example.com/g4.jpg', isPrimary: true }],
  },
];

describe('useProducts Custom Hook', () => {
  beforeEach(() => {
    // Limpiamos los mocks antes de cada test para evitar interferencias
    vi.clearAllMocks();
  });

  it('debe iniciar con estado de carga (loading = true) y luego obtener los productos con éxito', async () => {
    // Simulamos que el backend responde con éxito devolviendo nuestro listado
    vi.mocked(productService.getAllProducts).mockResolvedValueOnce(mockProductsList);

    // Renderizamos el hook usando helper de React Testing Library
    const { result } = renderHook(() => useProducts());

    // 1. Verificamos el estado inicial antes de que termine la Promesa
    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBeNull();

    // 2. Esperamos a que el useEffect asíncrono se resuelva
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // 3. Verificamos el estado final tras la respuesta exitosa
    expect(result.current.products).toEqual(mockProductsList);
    expect(result.current.products.length).toBe(1);
    expect(result.current.error).toBeNull();
  });

  it('debe capturar errores de la API y actualizar el estado de error (error != null)', async () => {
    // Simulamos un fallo del servidor (ejemplo: HTTP 500 o Backend apagado)
    vi.mocked(productService.getAllProducts).mockRejectedValueOnce(
      new Error('Network Error')
    );

    const { result } = renderHook(() => useProducts());

    // Esperamos a que termine el estado de carga
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Verificamos que el hook ataje el error correctamente
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe('No se pudo conectar con el servidor de PrimeTech.');
  });
});