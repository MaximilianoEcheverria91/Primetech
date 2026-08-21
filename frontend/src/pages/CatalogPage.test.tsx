import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CatalogPage } from './CatalogPage';
import { CartProvider } from '../contexts/CartContext';
import { useProducts } from '../hooks/useProducts';

vi.mock('../hooks/useProducts', () => ({
  useProducts: vi.fn(),
}));

describe('CatalogPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderCatalogPage = () => {
    return render(
      <MemoryRouter>
        <CartProvider>
          <CatalogPage />
        </CartProvider>
      </MemoryRouter>
    );
  };

  it('debe renderizar el layout base con Navbar, Sidebar de Filtros y Footer', () => {
    vi.mocked(useProducts).mockReturnValue({
      products: [],
      loading: false,
      error: null,
      refetch: vi.fn(),
    });

    renderCatalogPage();

    expect(screen.getByPlaceholderText(/buscar productos/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /filtros/i })).toBeInTheDocument();
    expect(screen.getByText(/nuestras sucursales/i)).toBeInTheDocument();
  });

  it('debe propagar el estado de carga al ProductGrid', () => {
    vi.mocked(useProducts).mockReturnValue({
      products: [],
      loading: true,
      error: null,
      refetch: vi.fn(),
    });

    renderCatalogPage();

    expect(screen.getByText(/cargando catálogo de productos/i)).toBeInTheDocument();
  });

  it('debe propagar los productos correctamente al ProductGrid', () => {
    vi.mocked(useProducts).mockReturnValue({
      products: [
        {
          id: 1,
          name: 'Placa RTX 4070',
          description: 'GPU Gamer',
          price: 900,
          stock: 4,
          status: 'AVAILABLE',
          onSale: false,
          offerPrice: null,
          brandId: 1,
          brandName: 'Nvidia',
          categoryId: 1,
          categoryName: 'Placas de Video',
          images: [],
        },
      ],
      loading: false,
      error: null,
      refetch: vi.fn(),
    });

    renderCatalogPage();

    expect(screen.getByText('Placa RTX 4070')).toBeInTheDocument();
  });
});