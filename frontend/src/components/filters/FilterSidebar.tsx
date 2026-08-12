import { ChevronDown, Filter } from 'lucide-react';
import { useState } from 'react';

export const FilterSidebar = () => {
  const [openCategory, setOpenCategory] = useState<string | null>('Computadoras');
  const [openSubcategory, setOpenSubcategory] = useState<string | null>('Amd');

  return (
    <aside className="w-full lg:w-[280px] bg-[#1E293B] rounded-xl p-5 border border-slate-700/50 text-[#CBCED4]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700">
        <Filter className="w-5 h-5 text-[#00BBFF]" />
        <h2 className="text-xl font-medium text-[#CBCED4]">Filtros</h2>
        <ChevronDown className="w-5 h-5 ml-auto text-[#CBCED4]" />
      </div>

      {/* Categorias */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-[#CBCED4] mb-4">Categorias</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="category" className="w-4 h-4 accent-[#16969F] bg-black" />
            <span>Todos</span>
          </li>

          <li>
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setOpenCategory(openCategory === 'Computadoras' ? null : 'Computadoras')}
            >
              <input type="radio" name="category" defaultChecked className="w-4 h-4 accent-[#16969F]" />
              <span className="text-white font-medium">Computadoras</span>
              <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${openCategory === 'Computadoras' ? 'rotate-180' : ''}`} />
            </div>

            {openCategory === 'Computadoras' && (
              <ul className="pl-6 mt-3 space-y-3 border-l border-slate-700 ml-2">
                <li className="flex items-center gap-3"><input type="radio" name="sub" className="w-3.5 h-3.5 accent-[#16969F]" /><span>Todos</span></li>
                <li className="flex items-center gap-3"><input type="radio" name="sub" className="w-3.5 h-3.5 accent-[#16969F]" /><span>Intel</span></li>
                <li>
                  <div className="flex items-center gap-3 cursor-pointer" onClick={() => setOpenSubcategory(openSubcategory === 'Amd' ? null : 'Amd')}>
                    <input type="radio" name="sub" defaultChecked className="w-3.5 h-3.5 accent-[#16969F]" />
                    <span>Amd</span>
                  </div>
                  {openSubcategory === 'Amd' && (
                    <ul className="pl-6 mt-3 space-y-2 border-l border-slate-700 ml-2 text-xs">
                      <li className="flex items-center gap-2"><input type="radio" name="amd" defaultChecked className="accent-[#16969F]" /><span className="text-[#00BBFF]">Todos</span></li>
                      <li className="flex items-center gap-2"><input type="radio" name="amd" className="accent-[#16969F]" /><span>Gama Baja</span></li>
                      <li className="flex items-center gap-2"><input type="radio" name="amd" className="accent-[#16969F]" /><span>Gama Media</span></li>
                      <li className="flex items-center gap-2"><input type="radio" name="amd" className="accent-[#16969F]" /><span>Gama Alta</span></li>
                      <li className="flex items-center gap-2"><input type="radio" name="amd" className="accent-[#16969F]" /><span>Gama Prime</span></li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          <li className="flex items-center gap-3"><input type="radio" name="category" className="w-4 h-4 accent-[#16969F]" /><span>Notebook</span></li>
          <li className="flex items-center gap-3"><input type="radio" name="category" className="w-4 h-4 accent-[#16969F]" /><span>Perifericos</span></li>
          <li className="flex items-center gap-3"><input type="radio" name="category" className="w-4 h-4 accent-[#16969F]" /><span>Consolas</span></li>
          <li className="flex items-center gap-3"><input type="radio" name="category" className="w-4 h-4 accent-[#16969F]" /><span>Ofertas</span></li>
        </ul>
      </div>

      {/* Rango de Precios */}
      <div className="pt-4 border-t border-slate-700">
        <h3 className="text-base font-medium text-[#CBCED4] mb-3">Rango de Precios</h3>
        <div className="space-y-3 text-xs">
          <div>
            <label className="block mb-1">Mínimo</label>
            <input type="number" defaultValue={0} className="w-full bg-[#0A1A2F] border border-[#0C6A6F] text-white rounded px-3 py-1.5 outline-none" />
          </div>
          <div>
            <label className="block mb-1">Máximo</label>
            <input type="number" defaultValue={0} className="w-full bg-[#0A1A2F] border border-[#0C6A6F] text-white rounded px-3 py-1.5 outline-none" />
          </div>
        </div>
      </div>
    </aside>
  );
};