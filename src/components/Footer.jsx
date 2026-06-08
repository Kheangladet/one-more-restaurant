import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Globe, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink-2 border-t border-ink-4/50">
      {/* Top Strip */}
      <div className="bg-gold py-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-4 text-ink text-xs font-medium tracking-wide">
          <span className="flex items-center gap-1.5"><Clock size={12}/> Open Daily · Until 10 PM</span>
          <span className="opacity-40">·</span>
          <span className="flex items-center gap-1.5"><Phone size={12}/> 023 888 222</span>
          <span className="opacity-40">·</span>
          <span className="flex items-center gap-1.5"><MapPin size={12}/> Boeung Kak, Phnom Penh</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <div>
            <div className="font-display text-3xl text-gold tracking-widest">ONE MORE</div>
            <div className="text-[9px] tracking-[4px] text-cream-muted uppercase mt-0.5">Authentic Khmer Cuisine</div>
          </div>
          <p className="text-cream-muted text-sm leading-relaxed max-w-xs">Freshly prepared daily with no preservatives — genuine Cambodian flavour served with heart for over a decade.</p>
          <div className="flex gap-3 pt-1">
            <a href="https://facebook.com/onemorerestaurant" target="_blank" rel="noopener" className="w-9 h-9 rounded-full border border-ink-4 flex items-center justify-center text-cream-muted hover:border-gold hover:text-gold transition-colors"><Globe size={15}/></a>
            <a href="https://instagram.com/onemore.restaurantkh" target="_blank" rel="noopener" className="w-9 h-9 rounded-full border border-ink-4 flex items-center justify-center text-cream-muted hover:border-gold hover:text-gold transition-colors"><Share2 size={15}/></a>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <h4 className="text-[10px] tracking-[3px] uppercase text-gold">Navigate</h4>
          <ul className="space-y-2.5">
            {[['/', 'Home'], ['/menu', 'Menu'], ['/about', 'About Us'], ['/reservations', 'Reservations'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}><Link to={to} className="text-cream-muted hover:text-cream text-sm transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="text-[10px] tracking-[3px] uppercase text-gold">Find Us</h4>
          <div className="space-y-3">
            <div className="flex gap-3 text-sm text-cream-muted"><MapPin size={15} className="text-gold flex-shrink-0 mt-0.5"/><span>63 Street R11 (Betong), Srah Chak, Doun Penh, Phnom Penh</span></div>
            <div className="flex gap-3 text-sm text-cream-muted"><MapPin size={15} className="text-gold flex-shrink-0 mt-0.5"/><span>No. 37, St. 315, Boeung Kak 1, Toul Kork</span></div>
            <div className="flex gap-3 text-sm text-cream-muted"><Phone size={15} className="text-gold flex-shrink-0"/><a href="tel:023888222" className="hover:text-cream transition-colors">023 888 222</a></div>
            <div className="flex gap-3 text-sm text-cream-muted"><Clock size={15} className="text-gold flex-shrink-0"/><span>Daily · Open until 10:00 PM</span></div>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-4/30 py-5 text-center text-cream-muted text-xs tracking-wider">
        © 2025 One More Restaurant. Built with ❤️ in Phnom Penh.
      </div>
    </footer>
  );
}
