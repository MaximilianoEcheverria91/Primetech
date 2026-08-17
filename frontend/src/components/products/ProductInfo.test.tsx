import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductInfo } from './ProductInfo';
import type { ProductResponse } from '../../types/product.type';

const mockProduct: ProductResponse = {
  id: 1,
  name: 'Samsung Odyssey G4',
  description: 'Monitor 240Hz',
  price: 250000,
  stock: 5,
  status: 'AVAILABLE',
  onSale: true,
  offerPrice: 210000,
  brandId: 6,
  brandName: 'Samsung',
  categoryId: 6,
  categoryName: 'Monitores',
};

describe('ProductInfo Component', () => {
  it('debe renderizar el nombre, marca, precio y cálculo de cuotas', () => {
    render(<ProductInfo product={mockProduct} />);

    expect(screen.getByText('Samsung')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Samsung Odyssey G4' })).toBeInTheDocument();
    expect(screen.getByText(/5 unidades en stock/i)).toBeInTheDocument();
    expect(screen.getByText(/12 cuotas sin interés/i)).toBeInTheDocument();
  });

  it('debe incrementar y decrementar la cantidad respetando límites', () => {
    render(<ProductInfo product={mockProduct} />);

    const decreaseBtn = screen.getByRole('button', { name: /disminuir cantidad/i });
    const increaseBtn = screen.getByRole('button', { name: /aumentar cantidad/i });

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(decreaseBtn).toBeDisabled();

    fireEvent.click(increaseBtn);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(decreaseBtn).not.toBeDisabled();
  });

  it('debe deshabilitar botones de compra cuando no hay stock', () => {
    const outOfStock: ProductResponse = { ...mockProduct, stock: 0, status: 'OUT_OF_STOCK' };
    render(<ProductInfo product={outOfStock} />);

    expect(screen.getByText(/sin stock disponible/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar al carrito/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /comprar ahora/i })).toBeDisabled();
  });
});