import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductGrid } from './ProductGrid';
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

describe('ProductGrid Component', () => {
  it('debe mostrar el spinner y mensaje de carga cuando loading es true', () => {
    render(<ProductGrid products={[]} loading={true} error={null} />);
    
    expect(screen.getByText(/cargando catálogo de productos/i)).toBeInTheDocument();
  });

  it('debe mostrar el mensaje de error cuando ocurre un fallo', () => {
    render(<ProductGrid products={[]} loading={false} error="Error de servidor" />);
    
    expect(screen.getByText(/ocurrió un error al cargar los productos/i)).toBeInTheDocument();
    expect(screen.getByText(/error de servidor/i)).toBeInTheDocument();
  });

  it('debe mostrar el estado vacío cuando no hay productos', () => {
    render(<ProductGrid products={[]} loading={false} error={null} />);
    
    expect(screen.getByText(/no se encontraron productos/i)).toBeInTheDocument();
  });

  it('debe renderizar la lista de productos correctamente cuando hay datos', () => {
    render(<ProductGrid products={mockProducts} loading={false} error={null} />);
    
    expect(screen.getByText(/productos disponibles/i)).toBeInTheDocument();
    expect(screen.getByText(/1 productos encontrados/i)).toBeInTheDocument();
    expect(screen.getByText('Monitor Samsung')).toBeInTheDocument();
  });
});