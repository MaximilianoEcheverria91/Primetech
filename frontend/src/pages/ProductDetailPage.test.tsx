import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProductDetailPage } from './ProductDetailPage';
import { CartProvider } from '../contexts/CartContext';
import { productService } from '../services/product.service';
import type { ProductResponse } from '../types/product.type';

vi.mock('../services/product.service', () => ({
  productService: {
    getProductById: vi.fn(),
  },
}));

const mockProductDetail: ProductResponse = {
  id: 1,
  name: 'Samsung Odyssey G4',
  description: 'Monitor gamer Full HD 240Hz.',
  price: 250000,
  stock: 5,
  status: 'AVAILABLE',
  onSale: true,
  offerPrice: 210000,
  brandId: 6,
  brandName: 'Samsung',
  categoryId: 6,
  categoryName: 'Monitores',
  images: [{ id: 1, url: 'https://example.com/img1.jpg', isPrimary: true }],
};

describe('ProductDetailPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  const renderComponent = (initialPath = '/product/1') => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <CartProvider>
          <Routes>
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/" element={<div>Catálogo</div>} />
          </Routes>
        </CartProvider>
      </MemoryRouter>
    );
  };

  it('debe mostrar el estado de carga inicialmente', () => {
    vi.mocked(productService.getProductById).mockReturnValue(new Promise(() => {}));
    renderComponent('/product/1');

    expect(screen.getByText(/cargando detalle del producto/i)).toBeInTheDocument();
  });

  it('debe renderizar la información completa del producto cuando la carga es exitosa', async () => {
    vi.mocked(productService.getProductById).mockResolvedValueOnce(mockProductDetail);
    renderComponent('/product/1');

    expect(await screen.findByRole('heading', { name: 'Samsung Odyssey G4' })).toBeInTheDocument();
    expect(screen.getByText('Monitor gamer Full HD 240Hz.')).toBeInTheDocument();
  });

  it('debe mostrar mensaje de error y botón de volver si no encuentra el producto', async () => {
    vi.mocked(productService.getProductById).mockRejectedValueOnce(new Error('Not found'));
    renderComponent('/product/999');

    expect(await screen.findByText(/producto no encontrado/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /volver al catálogo/i })).toBeInTheDocument();
  });
});