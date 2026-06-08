import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/about' },
  { label: 'Reservations', to: '/reservations' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, setIsOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-ink-4/50 py-3' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group">
            <span className="font-display text-2xl font-semibold tracking-widest text-gold group-hover:text-gold-light transition-colors">ONE MORE</span>
            <span className="text-[9px] tracking-[5px] text-cream-muted uppercase">Restaurant · Phnom Penh</span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <li key={l.to}>
                <Link to={l.to} className={`text-[11px] tracking-[2px] uppercase font-medium transition-colors relative group ${location.pathname === l.to ? 'text-gold' : 'text-cream-muted hover:text-cream'}`}>
                  {l.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${location.pathname === l.to ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button onClick={() => setIsOpen(true)} className="relative p-2 text-cream-muted hover:text-gold transition-colors">
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-ink text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <Link to="/reservations" className="hidden lg:flex items-center gap-2 bg-gold hover:bg-gold-light text-ink text-[11px] font-semibold tracking-[2px] uppercase px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(200,146,42,0.4)]">
              Book Table
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-cream-muted hover:text-cream transition-colors">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="glass border-t border-ink-4/50 px-6 py-4 flex flex-col gap-1">
            {links.map(l => (
              <Link key={l.to} to={l.to} className={`py-3 text-sm tracking-widest uppercase border-b border-ink-4/30 transition-colors ${location.pathname === l.to ? 'text-gold' : 'text-cream-muted hover:text-cream'}`}>
                {l.label}
              </Link>
            ))}
            <Link to="/reservations" className="mt-3 text-center bg-gold text-ink text-[11px] font-semibold tracking-widest uppercase px-5 py-3 rounded-full">
              Book a Table
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />}
    </>
  );
}
