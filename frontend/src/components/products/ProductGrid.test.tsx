import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProductGrid } from './ProductGrid';
import { CartProvider } from '../../contexts/CartContext';
import type { ProductResponse } from '../../types/product.type';

const mockProducts: ProductResponse[] = [
  {
    id: 1,
    name: 'Monitor Samsung',
    description: 'Monitor 24',
    price: 150,
    stock: 5,
    status: 'AVAILABLE',
    onSale: false,
    offerPrice: null,
    brandId: 1,
    brandName: 'Samsung',
    categoryId: 1,
    categoryName: 'Monitores',
    images: [],
  },
];

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <CartProvider>{ui}</CartProvider>
    </MemoryRouter>
  );
};

describe('ProductGrid Component', () => {
  it('debe mostrar el spinner y mensaje de carga cuando loading es true', () => {
    renderWithProviders(<ProductGrid products={[]} loading={true} error={null} />);
    expect(screen.getByText(/cargando catálogo de productos/i)).toBeInTheDocument();
  });

  it('debe mostrar el mensaje de error cuando ocurre un fallo', () => {
    renderWithProviders(<ProductGrid products={[]} loading={false} error="Error de servidor" />);
    expect(screen.getByText(/ocurrió un error al cargar los productos/i)).toBeInTheDocument();
  });

  it('debe mostrar el estado vacío cuando no hay productos', () => {
    renderWithProviders(<ProductGrid products={[]} loading={false} error={null} />);
    expect(screen.getByText(/no se encontraron productos/i)).toBeInTheDocument();
  });

  it('debe renderizar la lista de productos correctamente cuando hay datos', () => {
    renderWithProviders(<ProductGrid products={mockProducts} loading={false} error={null} />);
    expect(screen.getByText('Monitor Samsung')).toBeInTheDocument();
  });
});