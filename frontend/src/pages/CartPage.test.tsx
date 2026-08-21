import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CartPage } from './CartPage';
import { CartProvider, useCart } from '../contexts/CartContext';
import { useEffect } from 'react';
import type { ProductResponse } from '../types/product.type';

const mockProduct: ProductResponse = {
  id: 1,
  name: 'Samsung Odyssey G4',
  description: 'Monitor',
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

const CartWithSeed = () => {
  const { addToCart } = useCart();
  useEffect(() => {
    addToCart(mockProduct, 1);
  }, []);
  return <CartPage />;
};

describe('CartPage Component', () => {
  it('debe mostrar el estado vacío si el carrito no tiene elementos', () => {
    localStorage.clear();
    render(
      <MemoryRouter>
        <CartProvider>
          <CartPage />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/vacío/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ver catalogo/i })).toBeInTheDocument();
  });

  it('debe mostrar los productos agregados y abrir modal al hacer clic en vaciar', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <CartWithSeed />
        </CartProvider>
      </MemoryRouter>
    );

    const productTitles = screen.getAllByText(/Samsung Odyssey G4/i);
    expect(productTitles.length).toBeGreaterThanOrEqual(1);

    const clearBtn = screen.getByRole('button', { name: /vaciar carrito/i });
    expect(clearBtn).toBeInTheDocument();

    fireEvent.click(clearBtn);
    expect(screen.getByText(/deseas vaciar tu carrito/i)).toBeInTheDocument();
  });
});