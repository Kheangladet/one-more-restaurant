import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronDown } from 'lucide-react';
import { menuItems } from '../data/menu';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

function MenuCard({ item }) {
  const { add, setIsOpen } = useCart();
  const handleAdd = () => {
    add(item);
    toast.success(`${item.name} added!`, { icon: item.emoji, style: { background: '#1A1308', color: '#F5EDD8', border: '1px solid #332A16' } });
    setIsOpen(true);
  };
  return (
    <div className="group bg-ink-3/40 border border-ink-4/50 rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(200,146,42,0.12)] hover:-translate-y-1">
      <div className="h-36 bg-ink-4/60 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300 relative">
        {item.emoji}
        {item.popular && <span className="absolute top-3 right-3 bg-gold text-ink text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider">POPULAR</span>}
      </div>
      <div className="p-4">
        <div className="text-[9px] tracking-[2px] uppercase text-gold mb-1">{item.category}</div>
        <h3 className="font-display text-lg text-cream-light mb-0.5">{item.name}</h3>
        <p className="text-[11px] text-cream-muted mb-3 line-clamp-2">{item.desc}</p>
        <div className="flex items-center justify-between">
          <span className="font-display text-xl text-gold">${item.price}</span>
          <button onClick={handleAdd} className="bg-ink-4 hover:bg-gold text-cream hover:text-ink text-xs px-3 py-1.5 rounded-full transition-all duration-200 font-medium">Add +</button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const popular = menuItems.filter(i => i.popular).slice(0, 6);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Layered BG */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,#3D2A0A_0%,#1A1008_40%,#0D0A06_100%)]" />
        <div className="absolute inset-0 opacity-30" style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C8922A' fill-opacity='0.08'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z'/%3E%3C/g%3E%3C/svg%3E\")"}} />
        {/* Floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-gold/8 rounded-full blur-3xl animate-float" style={{animationDelay:'3s'}} />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-gold/30 text-gold text-[10px] tracking-[4px] uppercase px-4 py-2 rounded-full mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
            Est. Phnom Penh · Authentic Khmer
          </div>

          <h1 className="font-display font-light text-cream-light mb-6 animate-fade-up leading-[1.05]" style={{fontSize:'clamp(3.5rem,9vw,7rem)'}}>
            A Taste of<br />
            <em className="text-gradient not-italic">Cambodia</em>
          </h1>

          <p className="text-cream-muted text-lg max-w-lg mx-auto mb-10 animate-fade-up animate-delay-100 leading-relaxed">
            Freshly prepared daily, no preservatives — genuine Khmer cuisine crafted with a decade of love.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up animate-delay-200">
            <Link to="/menu" className="flex items-center gap-2 bg-gold hover:bg-gold-light text-ink font-semibold text-[11px] tracking-[3px] uppercase px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,146,42,0.5)] group">
              Explore Menu <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
            <Link to="/reservations" className="border border-cream/20 hover:border-gold text-cream hover:text-gold text-[11px] tracking-[3px] uppercase px-8 py-4 rounded-full transition-all duration-300">
              Reserve a Table
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 flex-wrap animate-fade-up animate-delay-300">
            {[['10+','Years Serving'],['4.5★','Google Rating'],['468+','Happy Reviews']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="font-display text-3xl text-gold">{num}</div>
                <div className="text-[9px] tracking-[2px] uppercase text-cream-muted mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <a href="#popular" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-muted hover:text-gold transition-colors animate-bounce">
          <span className="text-[9px] tracking-[3px] uppercase">Scroll</span>
          <ChevronDown size={16}/>
        </a>
      </section>

      {/* STRIP */}
      <div className="bg-gold py-3 overflow-hidden">
        <div className="flex gap-8 justify-center flex-wrap text-ink text-xs font-medium tracking-wide px-4">
          {['🍀 All-You-Can-Eat Available','📍 63 Street R11, Boeung Kak','⏰ Open Daily · Closes 10 PM','📞 023 888 222'].map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* POPULAR DISHES */}
      <section id="popular" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[4px] uppercase text-gold mb-3">Favourites</p>
            <h2 className="font-display font-light text-5xl md:text-6xl text-cream-light mb-4">Popular Dishes</h2>
            <p className="text-cream-muted max-w-md mx-auto">Dishes our guests keep coming back for — rooted in Cambodian tradition.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {popular.map(item => <MenuCard key={item.id} item={item} />)}
          </div>
          <div className="text-center">
            <Link to="/menu" className="inline-flex items-center gap-2 border border-gold/40 hover:border-gold text-gold hover:text-gold-light text-[11px] tracking-[3px] uppercase px-8 py-3.5 rounded-full transition-all duration-300 group">
              View Full Menu <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="py-24 px-6 bg-ink-2 border-y border-ink-4/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[4px] uppercase text-gold mb-4">Our Story</p>
            <h2 className="font-display font-light text-5xl text-cream-light mb-6 leading-tight">More Than a Meal,<br /><em className="text-gold">A Memory</em></h2>
            <p className="text-cream-muted leading-relaxed mb-4">One More Restaurant has spent over a decade serving authentic Khmer cuisine with heart. Every dish is freshly prepared daily — no preservatives, just real Cambodian flavour.</p>
            <p className="text-cream-muted leading-relaxed mb-8">Located in the heart of Boeung Kak, Phnom Penh, we deliver not just food, but a genuine cultural experience.</p>
            <Link to="/about" className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm tracking-wide group transition-colors">
              Read Our Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[['🌿','No Preservatives','All dishes freshly prepared daily'],['🏆','4.5★ Rating','468+ Google reviews'],['🍽️','All-You-Can-Eat','Generous portions, great value'],['📍','Two Locations','Boeung Kak & Toul Kork']].map(([icon, title, desc]) => (
              <div key={title} className="bg-ink-3/50 border border-ink-4/50 rounded-2xl p-5 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">{icon}</div>
                <div className="font-medium text-cream text-sm mb-1">{title}</div>
                <div className="text-cream-muted text-xs leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEW STRIP */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-4">{[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#C8922A" className="text-gold"/>)}</div>
          <blockquote className="font-display italic text-3xl md:text-4xl text-cream-light leading-snug mb-6">"Best place for Khmer food in Phnom Penh City. Great customer service, wonderful flavours."</blockquote>
          <p className="text-cream-muted text-sm">— Via TripAdvisor · 4.8/5</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-ink-2 border-t border-ink-4/40">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] tracking-[4px] uppercase text-gold mb-4">Reserve a Table</p>
          <h2 className="font-display font-light text-5xl text-cream-light mb-4">Join Us Tonight</h2>
          <p className="text-cream-muted mb-10">Reservations required · All-you-can-eat available · Happy-hour food</p>
          <Link to="/reservations" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-ink font-semibold text-[11px] tracking-[3px] uppercase px-10 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,146,42,0.5)] group">
            Book Your Table <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
          </Link>
        </div>
      </section>
    </div>
  );
}
