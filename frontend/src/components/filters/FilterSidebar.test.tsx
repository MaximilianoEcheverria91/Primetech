import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FilterSidebar } from './FilterSidebar';

describe('FilterSidebar Component', () => {
  it('debe renderizar el título de Filtros y las categorías principales', () => {
    render(<FilterSidebar />);

    expect(screen.getByRole('heading', { name: /filtros/i })).toBeInTheDocument();
    expect(screen.getByText('Computadoras')).toBeInTheDocument();
    expect(screen.getByText('Notebook')).toBeInTheDocument();
    expect(screen.getByText('Perifericos')).toBeInTheDocument();
  });

  it('debe permitir desplegar y colapsar la categoría de Computadoras al hacer clic', () => {
    render(<FilterSidebar />);

    // Computadoras arranca desplegado en el estado por defecto. Verificamos que se vea 'Intel'
    expect(screen.getByText('Intel')).toBeInTheDocument();

    // Hacemos clic para cerrar el desplegable
    const categoryTitle = screen.getByText('Computadoras');
    fireEvent.click(categoryTitle);

    // Verificamos que las subcategorías se oculten
    expect(screen.queryByText('Intel')).not.toBeInTheDocument();
  });
});