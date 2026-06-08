import { useState } from 'react';
import { menuItems, categories } from '../data/menu';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { ShoppingBag } from 'lucide-react';

function Card({ item }) {
  const { add, setIsOpen } = useCart();
  const handleAdd = () => {
    add(item);
    toast.success(`${item.name} added!`, { icon: item.emoji, style: { background:'#1A1308', color:'#F5EDD8', border:'1px solid #332A16' } });
    setIsOpen(true);
  };
  return (
    <div className="group bg-ink-3/40 border border-ink-4/50 rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(200,146,42,0.1)] hover:-translate-y-1 flex flex-col">
      <div className="h-44 bg-gradient-to-br from-ink-4 to-ink-3 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500 relative">
        {item.emoji}
        {item.popular && <span className="absolute top-3 right-3 bg-gold text-ink text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider">POPULAR</span>}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] tracking-[2px] uppercase text-gold">{item.category}</span>
          {item.veg && <span className="text-[9px] bg-green-900/30 text-green-400 px-1.5 py-0.5 rounded">Veg</span>}
          {item.spice > 0 && <span className="text-[10px]">{'🌶'.repeat(item.spice)}</span>}
        </div>
        <h3 className="font-display text-xl text-cream-light mb-0.5">{item.name}</h3>
        {item.nameKh && <p className="text-cream-muted text-xs mb-2">{item.nameKh}</p>}
        <p className="text-cream-muted text-sm leading-relaxed flex-1 mb-4">{item.desc}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-display text-2xl text-gold">${item.price.toFixed(2)}</span>
          <button onClick={handleAdd} className="flex items-center gap-2 bg-gold hover:bg-gold-light text-ink text-[10px] font-semibold tracking-[2px] uppercase px-4 py-2 rounded-full transition-all duration-200 hover:shadow-[0_0_16px_rgba(200,146,42,0.4)]">
            <ShoppingBag size={12}/> Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? menuItems : menuItems.filter(i => i.category === active);

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[4px] uppercase text-gold mb-3">Our Kitchen</p>
          <h1 className="font-display font-light text-6xl md:text-7xl text-cream-light mb-4">The Menu</h1>
          <p className="text-cream-muted max-w-md mx-auto">Every dish tells a story of Cambodia — rooted in tradition, made fresh every day.</p>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap justify-center mb-12">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} className={`text-[10px] tracking-[2px] uppercase px-5 py-2.5 rounded-full transition-all duration-200 border ${active === cat ? 'bg-gold border-gold text-ink font-semibold shadow-[0_0_16px_rgba(200,146,42,0.3)]' : 'border-ink-4/60 text-cream-muted hover:border-gold/40 hover:text-cream'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(item => <Card key={item.id} item={item}/>)}
        </div>
      </div>
    </div>
  );
}
