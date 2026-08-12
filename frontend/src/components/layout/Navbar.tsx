import { Search, Sun, User, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import logoIcon from '../../assets/logo_icon.png';
import logoText from '../../assets/logo_text.png';

export const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  

  return (
    <header className="w-full bg-[#0F172A] border-b border-[#0C6A6F]/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-6">
        
        {/* LOGO RESPONSIVO */}
        <div className="flex items-center gap-3 cursor-pointer flex-shrink-0">
          <img 
            src={logoIcon} 
            alt="PrimeTech Icon" 
            className="h-18 w-25 object-contain hover:scale-105 transition-transform duration-300" 
          />
          <img 
            src={logoText} 
            alt="PrimeTech" 
            className="h-25 w-auto object-contain hidden md:block hover:scale-105 transition-transform duration-300" 
          />
        </div>

        {/* Search */}
        <div className="flex-grow max-w-xl relative hidden md:block">
          <Search className="h-4 w-4 text-[#CBCED4] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            className="w-full pl-9 pr-3 py-2 border border-[#0C6A6F] rounded-lg bg-[#0A1A2F] text-white placeholder-[#CBCED4]/60 text-sm outline-none focus:border-[#00BBFF]"
            placeholder="Buscar productos"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5 text-sm text-white">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="flex items-center gap-2 hover:opacity-80">
            <Sun className="w-5 h-5" />
            <span className="hidden lg:block">Modo claro</span>
          </button>

          <button className="flex items-center gap-2 border border-[#0C6A6F] bg-[#0A1A2F] rounded-full px-4 py-1.5 hover:border-[#00BBFF]">
            <User className="w-4 h-4" />
            <span>Iniciar sesión</span>
          </button>

          <button className="relative p-1">
            <ShoppingCart className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Submenu */}
      <div className="bg-[#0F172A] border-t border-slate-800">
        <div className="container mx-auto px-4 h-11 flex items-center gap-6 text-sm text-[#CBCED4]">
          <a href="#" className="hover:text-white">Arma tu PC</a>
          <a href="#" className="hover:text-white">Computadoras</a>
          <a href="#" className="hover:text-white">Notebook</a>
          <a href="#" className="hover:text-white">Perifericos</a>
          <a href="#" className="hover:text-white">Consolas</a>
          <a href="#" className="hover:text-white">Accesorios</a>
          
          <a href="#" className="ml-auto bg-gradient-to-r from-[#28E1F5] to-[#585AB5] text-white px-5 py-1 rounded-full font-semibold text-xs shadow-[0_0_10px_rgba(40,225,245,0.3)]">
            Ofertas
          </a>
        </div>
      </div>
    </header>
  );
};