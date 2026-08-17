import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductDescription } from './ProductDescription';

describe('ProductDescription Component', () => {
  it('debe renderizar el título y el texto descriptivo provisto', () => {
    const text = 'Monitor gamer de alta resolución 1440p con panel IPS.';
    render(<ProductDescription description={text} />);

    expect(screen.getByRole('heading', { name: /descripción del producto/i })).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('debe mostrar un mensaje por defecto si la descripción llega vacía', () => {
    render(<ProductDescription description="" />);

    expect(screen.getByText(/no hay descripción disponible para este producto/i)).toBeInTheDocument();
  });
});