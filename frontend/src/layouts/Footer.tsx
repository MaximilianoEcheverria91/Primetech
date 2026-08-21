import { Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#0F172A] text-[#CBCED4] border-t border-[#0C6A6F]/20 mt-auto pt-10 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
          
          {/* 1. Nuestras Sucursales */}
          <div>
            <h4 className="text-white font-normal text-base mb-3">Nuestras Sucursales</h4>
            <div className="space-y-3 text-xs text-[#CBCED4]/80 leading-relaxed">
              <div>
                <p>Remedios de escalada 1123 (CABA)</p>
                <p>L a V de 9 a 17hs - sabados de 9 a 14hs</p>
              </div>
              <div>
                <p>Av. Hypolito Yrigoyen 3212 Lomas de Zamora</p>
                <p>L a V de 9 a 17hs - sabados de 9 a 14:30hs</p>
              </div>
            </div>
          </div>

          {/* 2. Soporte */}
          <div>
            <h4 className="text-white font-normal text-base mb-3">Soporte</h4>
            <ul className="space-y-2 text-xs text-[#CBCED4]/80">
              <li><a href="#" className="hover:text-white transition-colors">Preguntas frecuentes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Garantias</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Seguir mi pedido</a></li>
            </ul>
          </div>

          {/* 3. Contactanos */}
          <div>
            <h4 className="text-white font-normal text-base mb-3">Contactanos</h4>
            <ul className="space-y-2.5 text-xs text-[#CBCED4]/80">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00BBFF] flex-shrink-0" />
                <span>PrimeTech@tech.com.ar</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00BBFF] flex-shrink-0" />
                <span>11 8923 4582</span>
              </li>
            </ul>
          </div>

          {/* 4. Nuestras redes (SVGs Oficiales) */}
          <div>
            <h4 className="text-white font-normal text-base mb-3">Nuestras redes</h4>
            <ul className="space-y-2.5 text-xs text-[#CBCED4]/80">
              <li>
                <a href="#" className="flex items-center gap-2.5 hover:text-white transition-colors">
                  {/* Facebook Icon */}
                  <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2.5 hover:text-white transition-colors">
                  {/* Instagram Icon */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <radialGradient id="ig-grad" cx="0.3" cy="1.0" r="1.4">
                      <stop offset="0" stopColor="#FFDD55"/>
                      <stop offset="0.3" stopColor="#FF543E"/>
                      <stop offset="0.6" stopColor="#C837AB"/>
                      <stop offset="1" stopColor="#3771C8"/>
                    </radialGradient>
                    <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instgram</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2.5 hover:text-white transition-colors">
                  {/* TikTok Icon */}
                  <svg className="w-4 h-4 fill-[#25F4EE]" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.83.12V9.33a6.33 6.33 0 0 0-1-.08 6.26 6.26 0 0 0-6.25 6.25A6.26 6.26 0 0 0 9.31 21.8a6.26 6.26 0 0 0 6.25-6.25V8.92a8.3 8.3 0 0 0 4.77 1.49v-3.45a4.85 4.85 0 0 1-.74-.27z"/>
                  </svg>
                  <span>Tik-Tok</span>
                </a>
              </li>
            </ul>
          </div>

          {/* 5. Quienes Somos */}
          <div>
            <h4 className="text-white font-normal text-base mb-3">Quienes somos</h4>
            <ul className="space-y-2 text-xs text-[#CBCED4]/80">
              <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terminos y condiciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trabaja con nosotros</a></li>
            </ul>
          </div>

        </div>

        {/* Copyright Centralizado */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-center text-xs text-[#CBCED4]/70 flex flex-col items-center justify-center gap-1">
          <div className="flex items-center justify-center gap-1.5">
            <span className="border border-[#CBCED4]/70 rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">C</span>
            <span>2026 PrimeTech. Todos los derechos resevados</span>
          </div>
          <p className="text-[#CBCED4]/50">Tu tienda de tecnología y gaming de confianza</p>
        </div>

      </div>
    </footer>
  );
};