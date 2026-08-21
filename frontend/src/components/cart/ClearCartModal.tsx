import { AlertTriangle } from 'lucide-react';
import { Button } from '../common/Button';

interface ClearCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ClearCartModal = ({ isOpen, onClose, onConfirm }: ClearCartModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0A1A2F] border border-[#0C6A6F] rounded-2xl p-6 md:p-8 max-w-md w-full flex flex-col items-center text-center gap-5 shadow-2xl relative">
        
        {/* Ícono de Advertencia Hexagonal / Ámbar */}
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <AlertTriangle className="w-10 h-10" />
        </div>

        {/* Texto principal */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">
            ¿Estás seguro de que deseas vaciar tu carrito?
          </h3>
          <p className="text-xs md:text-sm text-[#A3A1A1]">
            Esta acción eliminará todos los productos seleccionados y no se podrá deshacer.
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex items-center justify-center gap-4 w-full mt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 py-3 text-sm"
          >
            NO, CANCELAR
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            className="flex-1 py-3 text-sm uppercase tracking-wide"
          >
            SÍ, VACIAR
          </Button>
        </div>
      </div>
    </div>
  );
};
