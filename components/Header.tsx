'use client';

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-4">
          {/* Logo placeholder */}
          <div className="w-12 h-12 rounded-lg bg-[#D4740C] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg font-[var(--font-display)]">ETD</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#D4740C] font-[var(--font-display)]">
              EdTech Marketplace
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              A marketplace where you can explore and discover EdTech practices from across the fraternity, supporting your digital transformation journey.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
