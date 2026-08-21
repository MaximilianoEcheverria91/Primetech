import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

export const EmptyCart = () => {
  return (
    <div className="bg-[#0A1A2F]/80 border border-[#0C6A6F] rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center text-center gap-4 w-full shadow-lg">
      {/* Icono de Carrito */}
      <div className="p-4 rounded-full bg-[#071322] border border-[#0C6A6F]/50 mb-2">
        <ShoppingCart className="w-14 h-14 md:w-16 md:h-16 text-white stroke-[1.5]" />
      </div>

      {/* Título & Subtítulo */}
      <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
        ¡TU CARRITO ESTA VACÍO!
      </h2>
      <p className="text-sm text-[#A3A1A1] max-w-md">
        Cuando agregues un producto, podras verlo aquí.
      </p>

      {/* Botones de acción */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 w-full max-w-sm">
        <Link to="/" className="flex-1 min-w-[140px]">
          <Button variant="outline" className="w-full py-3 text-sm">
            Ver Catalogo
          </Button>
        </Link>
        <Link to="/" className="flex-1 min-w-[140px]">
          <Button variant="primary" className="w-full py-3 text-sm">
            Arma tu PC
          </Button>
        </Link>
      </div>
    </div>
  );
};
