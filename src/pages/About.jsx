import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-24">
          <p className="text-[10px] tracking-[4px] uppercase text-gold mb-3">Our Story</p>
          <h1 className="font-display font-light mb-6 text-cream-light leading-tight" style={{fontSize:'clamp(3rem,8vw,6rem)'}}>
            More Than a Meal,<br /><em className="text-gradient not-italic">A Legacy</em>
          </h1>
          <p className="text-cream-muted max-w-xl mx-auto text-lg leading-relaxed">
            For over a decade, One More Restaurant has kept the heart of Cambodian cuisine beating in Phnom Penh.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-28">
          <div>
            <div className="aspect-square bg-ink-3 border border-ink-4/50 rounded-3xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#3D2A0A_0%,#0D0A06_100%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center relative z-10">
                  <div className="text-8xl mb-4 animate-float">🍲</div>
                  <div className="font-display text-5xl text-gold tracking-widest">ONE MORE</div>
                  <div className="text-[10px] tracking-[5px] text-cream-muted mt-2 uppercase">Since 2014</div>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 bg-gold text-ink w-20 h-20 rounded-full flex flex-col items-center justify-center">
                <span className="text-[9px] tracking-wide uppercase">Since</span>
                <span className="font-display text-2xl font-bold">2014</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-display font-light text-4xl text-cream-light">Rooted in Tradition</h2>
            <p className="text-cream-muted leading-relaxed">One More Restaurant was born from a simple belief: that authentic Cambodian food, prepared with care and served with love, can connect people to the soul of a culture. Every dish we serve carries the flavours of generations.</p>
            <p className="text-cream-muted leading-relaxed">We roast daily. We never use preservatives. Our ingredients are sourced fresh, our recipes are time-honoured, and our kitchen is run with pride by a team that genuinely cares about every plate that leaves it.</p>
            <p className="text-cream-muted leading-relaxed">With two locations in Phnom Penh — Boeung Kak and Toul Kork — we have become a destination for locals and travellers alike who want a true taste of Cambodia.</p>
            <Link to="/menu" className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm tracking-wide group transition-colors">
              Explore the Menu <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>
        </div>

        {/* Values */}
        <div className="mb-28">
          <div className="text-center mb-12">
            <h2 className="font-display font-light text-4xl text-cream-light">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              ['🌿','No Preservatives','Everything on our menu is freshly prepared every single day. No shortcuts, no shortcuts — just real food.'],
              ['🤝','Genuine Hospitality','We treat every guest like family. From your first visit to your hundredth, you will always feel welcome.'],
              ['🇰🇭','Cambodian Heritage','We are proud guardians of Khmer culinary tradition — preserving recipes and techniques passed down through generations.'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="bg-ink-3/40 border border-ink-4/50 rounded-2xl p-8 text-center hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl mb-5">{icon}</div>
                <h3 className="font-display text-xl text-cream-light mb-3">{title}</h3>
                <p className="text-cream-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-ink-2 border border-ink-4/40 rounded-3xl p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[['10+','Years of Service'],['2','Locations'],['468+','Google Reviews'],['4.5★','Average Rating']].map(([num, label]) => (
              <div key={label}>
                <div className="font-display text-5xl text-gold mb-2">{num}</div>
                <div className="text-[10px] tracking-[2px] uppercase text-cream-muted">{label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
