import { describe, it, expect } from 'vitest';
import { formatCurrency } from './formatCurrency';

describe('formatCurrency Utility', () => {
  it('debe formatear un número a formato de moneda en pesos argentinos (ARS)', () => {
    const amount = 1000;
    const formatted = formatCurrency(amount);

    // Verificamos que contenga el símbolo $ y el monto formateado
    expect(formatted).toContain('$');
    expect(formatted).toContain('1.000');
  });

  it('debe manejar correctamente el valor 0', () => {
    const formatted = formatCurrency(0);
    expect(formatted).toContain('$');
    expect(formatted).toContain('0');
  });
});