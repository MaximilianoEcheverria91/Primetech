import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CartProvider, useCart } from './CartContext';
import type { ProductResponse } from '../types/product.type';

const mockProduct: ProductResponse = {
  id: 1,
  name: 'Samsung Odyssey G4',
  description: 'Monitor Gamer 240Hz',
  price: 250000,
  stock: 5,
  status: 'AVAILABLE',
  onSale: false,
  offerPrice: null,
  brandId: 1,
  brandName: 'Samsung',
  categoryId: 1,
  categoryName: 'Monitores',
  images: [],
};

const mockProduct2: ProductResponse = {
  id: 2,
  name: 'AMD Ryzen 9 7950X',
  description: 'Procesador gamer',
  price: 594000,
  stock: 3,
  status: 'AVAILABLE',
  onSale: false,
  offerPrice: null,
  brandId: 2,
  brandName: 'AMD',
  categoryId: 2,
  categoryName: 'Procesadores',
  images: [],
};

describe('CartContext & useCart Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it('debe iniciar con el carrito vacío', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.subtotal).toBe(0);
    expect(result.current.total).toBe(0);
  });

  it('debe agregar productos y persistirlos en localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.subtotal).toBe(500000);
    expect(localStorage.getItem('primetech_cart')).toContain('Samsung Odyssey G4');
  });

  it('debe incrementar la cantidad si el producto ya existe en el carrito sin exceder el stock', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 3);
    });

    act(() => {
      result.current.addToCart(mockProduct, 4); // Stock máx = 5
    });

    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.totalItems).toBe(5);
  });

  it('debe actualizar la cantidad y eliminar si la cantidad llega a 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 2);
    });

    act(() => {
      result.current.updateQuantity(mockProduct.id, 4);
    });
    expect(result.current.items[0].quantity).toBe(4);

    act(() => {
      result.current.updateQuantity(mockProduct.id, 0);
    });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
  });

  it('debe remover un producto específico', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 1);
      result.current.addToCart(mockProduct2, 1);
    });

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.removeFromCart(mockProduct.id);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.id).toBe(mockProduct2.id);
  });

  it('debe vaciar el carrito por completo', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 2);
      result.current.clearCart();
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(localStorage.getItem('primetech_cart')).toBe('[]');
  });
});