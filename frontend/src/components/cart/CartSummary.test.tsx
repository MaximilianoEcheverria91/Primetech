import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartSummary } from './CartSummary';

describe('CartSummary Component', () => {
  it('debe mostrar el estado sin productos cuando items está vacío', () => {
    render(
      <CartSummary
        items={[]}
        subtotal={0}
        discount={0}
        total={0}
        onCheckout={vi.fn()}
      />
    );

    expect(screen.getByText(/no tienes productos en tu carrito/i)).toBeInTheDocument();
  });

  it('debe mostrar los montos y ejecutar onCheckout al presionar el botón de compra', () => {
    const handleCheckout = vi.fn();
    const mockItems = [
      {
        quantity: 1,
        product: {
          id: 1,
          name: 'Ryzen 9 7950X',
          description: '',
          price: 594000,
          stock: 5,
          status: 'AVAILABLE' as const,
          onSale: false,
          offerPrice: null,
          brandId: 1,
          brandName: 'AMD',
          categoryId: 1,
          categoryName: 'Procesadores',
          images: [],
        },
      },
    ];

    render(
      <CartSummary
        items={mockItems}
        subtotal={594000}
        discount={0}
        total={594000}
        onCheckout={handleCheckout}
      />
    );

    expect(screen.getByText('RESUMEN DEL PEDIDO')).toBeInTheDocument();
    const checkoutBtn = screen.getByRole('button', { name: /comprar ahora/i });
    expect(checkoutBtn).toBeInTheDocument();

    fireEvent.click(checkoutBtn);
    expect(handleCheckout).toHaveBeenCalledTimes(1);
  });
});