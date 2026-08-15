interface ProductDescriptionProps {
  description: string;
}

export const ProductDescription = ({ description }: ProductDescriptionProps) => {
  return (
    <div className="w-full mt-10">
      {/* Title with vertical cyan bar */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-1.5 h-7 bg-[#00BBFF] rounded-full inline-block" />
        <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">
          DESCRIPCIÓN DEL PRODUCTO
        </h2>
      </div>

      {/* Container */}
      <div className="bg-[#0A1A2F]/60 border border-[#0C6A6F] rounded-2xl p-6 md:p-8 text-[#CBCED4] leading-relaxed text-sm md:text-base whitespace-pre-line shadow-lg">
        {description || 'No hay descripción disponible para este producto.'}
      </div>
    </div>
  );
};
