import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductCard } from './ProductCard';
import type { ProductResponse } from '../../types/product.type';

// Mock de producto para las pruebas
const mockProduct: ProductResponse = {
  id: 1,
  name: 'Placa de Video RTX 4070',
  description: 'Excelente placa para gaming 1440p',
  price: 1000,
  stock: 10,
  status: 'AVAILABLE',
  onSale: true,
  offerPrice: 850,
  brandId: 1,
  brandName: 'Nvidia',
  categoryId: 1,
  categoryName: 'Placas de Video',
  images: [
    { id: 1, url: 'https://example.com/rtx4070.jpg', isPrimary: true },
  ],
};

describe('ProductCard Component', () => {
  it('debe renderizar el nombre, precio y stock del producto correctamente', () => {
    render(<ProductCard product={mockProduct} />);

    // Verificamos que el título esté en pantalla
    expect(screen.getByText('Placa de Video RTX 4070')).toBeInTheDocument();

    // Verificamos que se muestre el stock disponible
    expect(screen.getByText(/Stock disponible \(10\)/i)).toBeInTheDocument();

    // Verificamos que el botón de "Agregar al carrito" esté habilitado
    const button = screen.getByRole('button', { name: /agregar al carrito/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('debe mostrar el badge de descuento cuando el producto está en oferta (onSale = true)', () => {
    render(<ProductCard product={mockProduct} />);

    // Verificamos que aparezca el badge de oferta -15%
    expect(screen.getByText('-15%')).toBeInTheDocument();
  });

  it('debe deshabilitar el botón y mostrar el mensaje de "Sin Stock" cuando el stock es 0', () => {
    const outOfStockProduct: ProductResponse = {
      ...mockProduct,
      stock: 0,
      status: 'OUT_OF_STOCK',
    };

    render(<ProductCard product={outOfStockProduct} />);

    // Verificamos el texto de falta de stock
    expect(screen.getByText(/Sin Stock/i)).toBeInTheDocument();

    // Verificamos que el botón esté deshabilitado
    const button = screen.getByRole('button', { name: /agregar al carrito/i });
    expect(button).toBeDisabled();
  });
});