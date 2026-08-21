import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ClearCartModal } from './ClearCartModal';

describe('ClearCartModal Component', () => {
  it('no debe renderizarse si isOpen es false', () => {
    render(<ClearCartModal isOpen={false} onClose={vi.fn()} onConfirm={vi.fn()} />);
    expect(screen.queryByText(/deseas vaciar tu carrito/i)).not.toBeInTheDocument();
  });

  it('debe responder a las acciones de confirmación y cancelación', () => {
    const handleClose = vi.fn();
    const handleConfirm = vi.fn();

    render(<ClearCartModal isOpen={true} onClose={handleClose} onConfirm={handleConfirm} />);

    expect(screen.getByText(/deseas vaciar tu carrito/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /vaciar/i }));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });
});