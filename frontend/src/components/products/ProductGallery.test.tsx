import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductGallery } from './ProductGallery';

const mockImages = [
  { id: 1, url: 'https://example.com/foto1.jpg', isPrimary: true },
  { id: 2, url: 'https://example.com/foto2.jpg', isPrimary: false },
];

describe('ProductGallery Component', () => {
  it('debe cambiar la imagen principal al hacer clic en una miniatura', () => {
    render(<ProductGallery images={mockImages} productName="Monitor Gamer" onSale={true} />);

    const mainImg = screen.getByAltText('Monitor Gamer') as HTMLImageElement;
    expect(mainImg.src).toContain('foto1.jpg');

    const thumb2 = screen.getByAltText('Monitor Gamer thumbnail 2');
    fireEvent.click(thumb2);

    expect(mainImg.src).toContain('foto2.jpg');
  });

  it('debe avanzar y retroceder imágenes con las flechas de navegación', () => {
    render(<ProductGallery images={mockImages} productName="Monitor Gamer" />);

    const nextBtn = screen.getByRole('button', { name: /imagen siguiente/i });
    const mainImg = screen.getByAltText('Monitor Gamer') as HTMLImageElement;

    fireEvent.click(nextBtn);
    expect(mainImg.src).toContain('foto2.jpg');

    const prevBtn = screen.getByRole('button', { name: /imagen anterior/i });
    fireEvent.click(prevBtn);
    expect(mainImg.src).toContain('foto1.jpg');
  });
});