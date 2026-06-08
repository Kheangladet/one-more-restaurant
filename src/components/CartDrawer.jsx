import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function CartDrawer() {
  const { cart, change, remove, clear, total, count, isOpen, setIsOpen } = useCart();

  const handleOrder = async () => {
    const name = prompt('Your name for the order:');
    if (!name) return;
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name,
          items: cart.map(i => ({ name: i.name, price: i.price, quantity: i.qty })),
          totalAmount: total,
          orderType: 'dine-in'
        })
      });
    } catch {}
    toast.success(`Order placed! Thank you, ${name}! 🎉`, { style: { background: '#1A1308', color: '#F5EDD8', border: '1px solid #332A16' } });
    clear();
    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div onClick={() => setIsOpen(false)} className={`fixed inset-0 bg-ink/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />

      {/* Drawer */}
      <div className={`fixed right-0 top-0 bottom-0 w-full max-w-sm z-50 glass border-l border-ink-4/50 flex flex-col transition-transform duration-400 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-ink-4/50">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-gold" />
            <span className="font-display text-xl text-cream-light">Your Order</span>
            {count > 0 && <span className="bg-gold text-ink text-xs font-bold px-2 py-0.5 rounded-full">{count}</span>}
          </div>
          <button onClick={() => setIsOpen(false)} className="text-cream-muted hover:text-cream transition-colors p-1"><X size={20} /></button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-cream-muted">
              <ShoppingBag size={40} strokeWidth={1} />
              <p className="text-sm tracking-wide">Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="bg-ink-3/60 rounded-xl p-4 border border-ink-4/50 flex gap-3 items-center">
                <div className="text-2xl w-10 h-10 bg-ink-4 rounded-lg flex items-center justify-center flex-shrink-0">{item.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-cream text-sm font-medium truncate">{item.name}</p>
                  <p className="text-gold text-sm font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => change(item.id, -1)} className="w-7 h-7 rounded-full bg-ink-4 hover:bg-gold hover:text-ink text-cream flex items-center justify-center transition-colors"><Minus size={12} /></button>
                  <span className="text-cream text-sm w-4 text-center">{item.qty}</span>
                  <button onClick={() => change(item.id, 1)} className="w-7 h-7 rounded-full bg-ink-4 hover:bg-gold hover:text-ink text-cream flex items-center justify-center transition-colors"><Plus size={12} /></button>
                </div>
                <button onClick={() => remove(item.id)} className="text-cream-muted hover:text-red-400 transition-colors ml-1"><Trash2 size={14} /></button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-ink-4/50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-cream-muted text-sm tracking-wide uppercase">Total</span>
              <span className="font-display text-2xl text-gold">${total.toFixed(2)}</span>
            </div>
            <button onClick={handleOrder} className="w-full bg-gold hover:bg-gold-light text-ink font-semibold text-sm tracking-widest uppercase py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_24px_rgba(200,146,42,0.4)]">
              Place Order
            </button>
          </div>
        )}
      </div>
    </>
  );
}
