import { useState } from 'react';
import { MapPin, Phone, Clock, Mail, ArrowRight, Globe, Share2 } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
    } catch {}
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[4px] uppercase text-gold mb-3">Get in Touch</p>
          <h1 className="font-display font-light text-6xl md:text-7xl text-cream-light mb-4">Find Us</h1>
          <p className="text-cream-muted max-w-md mx-auto">Two locations in Phnom Penh. Come visit, call ahead, or drop us a message.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl text-cream-light mb-6">Our Locations</h2>
              <div className="space-y-4">
                {[
                  { label:'Boeung Kak Branch', addr:'63 Street R11 (St. Betong), Srah Chak, Doun Penh, Phnom Penh 120210' },
                  { label:'Toul Kork Branch', addr:'No. 37, St. 315, Boeung Kak 1, Toul Kork, Phnom Penh' }
                ].map(l => (
                  <div key={l.label} className="flex gap-4 bg-ink-3/30 border border-ink-4/50 rounded-xl p-4">
                    <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5"/>
                    <div>
                      <div className="text-cream font-medium text-sm mb-0.5">{l.label}</div>
                      <div className="text-cream-muted text-sm">{l.addr}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[[Phone,'023 888 222','tel:023888222'],[Clock,'Open Daily','','Until 10:00 PM'],[Mail,'onemorerestaurant.com','https://onemorerestaurant.com'],[Globe,'Facebook','https://facebook.com/onemorerestaurant']].map(([Icon, label, href, sub]) => (
                <a key={label} href={href||'#'} target={href&&!href.startsWith('tel')?"_blank":undefined} rel="noopener" className="flex gap-3 items-start bg-ink-3/30 border border-ink-4/50 rounded-xl p-4 hover:border-gold/30 transition-colors group">
                  <Icon size={16} className="text-gold flex-shrink-0 mt-0.5"/>
                  <div>
                    <div className="text-cream text-sm group-hover:text-gold transition-colors">{label}</div>
                    {sub && <div className="text-cream-muted text-xs">{sub}</div>}
                  </div>
                </a>
              ))}
            </div>

            <div className="flex gap-3">
              {[[Globe,'Facebook','https://facebook.com/onemorerestaurant'],[Share2,'Instagram','https://instagram.com/onemore.restaurantkh']].map(([Icon, label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener" className="flex items-center gap-2 border border-ink-4/50 hover:border-gold text-cream-muted hover:text-gold px-4 py-2.5 rounded-full text-sm transition-all duration-200">
                  <Icon size={14}/> {label}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-ink-2/60 border border-ink-4/50 rounded-3xl p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
                <div className="text-5xl">✅</div>
                <h3 className="font-display text-2xl text-cream-light">Message Sent!</h3>
                <p className="text-cream-muted">We'll get back to you soon.</p>
                <button onClick={() => { setSent(false); setForm({ name:'', email:'', subject:'', message:'' }); }} className="text-gold hover:text-gold-light text-sm underline underline-offset-4 transition-colors">Send another</button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl text-cream-light mb-6">Send a Message</h3>
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] tracking-[2px] uppercase text-cream-muted">Name</label>
                      <input name="name" value={form.name} onChange={update} required placeholder="Your name" className="bg-ink-3 border border-ink-4/70 text-cream placeholder-ink-5 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-gold transition-colors"/>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] tracking-[2px] uppercase text-cream-muted">Email</label>
                      <input name="email" type="email" value={form.email} onChange={update} required placeholder="your@email.com" className="bg-ink-3 border border-ink-4/70 text-cream placeholder-ink-5 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-gold transition-colors"/>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-[2px] uppercase text-cream-muted">Subject</label>
                    <input name="subject" value={form.subject} onChange={update} placeholder="How can we help?" className="bg-ink-3 border border-ink-4/70 text-cream placeholder-ink-5 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-gold transition-colors"/>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-[2px] uppercase text-cream-muted">Message</label>
                    <textarea name="message" value={form.message} onChange={update} required rows={5} placeholder="Write your message…" className="bg-ink-3 border border-ink-4/70 text-cream placeholder-ink-5 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-gold transition-colors resize-none"/>
                  </div>
                  <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-60 text-ink font-semibold text-[11px] tracking-[3px] uppercase py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_24px_rgba(200,146,42,0.4)]">
                    <ArrowRight size={13}/> {loading ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
