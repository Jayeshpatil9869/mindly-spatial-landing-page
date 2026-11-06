import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavigationProps {
  onGetAppClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onGetAppClick }) => {
  const [activeItem, setActiveItem] = useState<string>('Integrations');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = ['Features', 'How it works', 'Integrations', 'Pricing'];

  return (
    <nav className="relative z-30 flex items-center justify-between px-6 sm:px-10 md:px-14 pt-6 md:pt-8 w-full max-w-[1480px] mx-auto select-none">
      {/* Brand Logo */}
      <a
        href="#"
        className="group flex items-baseline text-[21px] font-bold tracking-tight text-[#111111] transition-opacity hover:opacity-85"
        aria-label="Mindly Home"
      >
        <span>Mindly</span>
        <span className="ml-[1px] text-[12px] leading-none text-[#111111] font-semibold -translate-y-2 inline-block">
          °
        </span>
      </a>

      {/* Desktop Floating Pill Navigation */}
      <div className="hidden md:flex items-center bg-[#F1EFEB]/90 p-1 rounded-full border border-black/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] backdrop-blur-sm">
        {navItems.map((item) => {
          const isActive = activeItem === item;
          return (
            <button
              key={item}
              onClick={() => setActiveItem(item)}
              className={`relative px-4 py-1.5 text-[13px] rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-white text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] font-semibold'
                  : 'text-[#6B6761] hover:text-[#111111] font-medium'
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Right Action Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onGetAppClick}
          className="group hidden sm:inline-flex items-center gap-1.5 bg-[#111111] hover:bg-black text-white text-[13px] font-medium px-4.5 py-2 rounded-full shadow-xs transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <span>Get the app</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full bg-black/5 hover:bg-black/10 text-neutral-800 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-6 right-6 mt-2 p-4 bg-white/95 backdrop-blur-lg rounded-2xl border border-black/5 shadow-xl flex flex-col gap-2 z-50">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveItem(item);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm rounded-xl transition-colors ${
                activeItem === item
                  ? 'bg-neutral-100 font-semibold text-black'
                  : 'text-neutral-600 hover:text-black font-medium'
              }`}
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onGetAppClick?.();
            }}
            className="w-full mt-2 flex items-center justify-center gap-1.5 bg-[#111111] text-white text-sm font-medium py-2.5 rounded-xl shadow-xs"
          >
            <span>Get the app</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </nav>
  );
};
