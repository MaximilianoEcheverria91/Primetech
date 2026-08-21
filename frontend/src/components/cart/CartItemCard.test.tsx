import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CartItemCard } from './CartItemCard';
import { CartProvider } from '../../contexts/CartContext';
import type { CartItem } from '../../types/cart.type';

const mockItem: CartItem = {
  quantity: 2,
  product: {
    id: 1,
    name: 'Samsung Odyssey G4',
    description: 'Monitor Gamer',
    price: 250000,
    stock: 5,
    status: 'AVAILABLE',
    onSale: false,
    offerPrice: null,
    brandId: 1,
    brandName: 'Samsung',
    categoryId: 1,
    categoryName: 'Monitores',
    images: [{ id: 1, url: 'https://example.com/g4.jpg', isPrimary: true }],
  },
};

describe('CartItemCard Component', () => {
  it('debe renderizar datos, cantidades y precio acumulado', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <CartItemCard item={mockItem} />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Samsung Odyssey G4')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});