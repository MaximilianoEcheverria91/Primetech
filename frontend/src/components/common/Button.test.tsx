import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  it('debe renderizar el texto y manejar clics', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Comprar</Button>);

    const button = screen.getByRole('button', { name: /comprar/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('debe respetar el estado disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Comprar</Button>);

    const button = screen.getByRole('button', { name: /comprar/i });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});