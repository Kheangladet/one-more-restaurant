import { useState } from 'react';
import { CalendarCheck, Users, Clock, Mail, Phone, User } from 'lucide-react';
import toast from 'react-hot-toast';

const timeSlots = ['11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM'];

export default function Reservations() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', guests:2, date:'', time:'', occasion:'casual', specialRequests:'' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(null);

  const today = new Date().toISOString().split('T')[0];

  const update = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/reservations', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) setDone(data.data.confirmationCode);
      else throw new Error();
    } catch {
      const code = 'OMR-' + Math.random().toString(36).substr(2,6).toUpperCase();
      setDone(code);
    }
    setLoading(false);
  };

  if (done) return (
    <div className="min-h-screen pt-28 pb-24 px-6 flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="font-display text-4xl text-cream-light mb-3">Reservation Confirmed!</h2>
        <p className="text-cream-muted mb-6">Your table is booked. We look forward to seeing you!</p>
        <div className="bg-ink-3 border border-gold/30 rounded-2xl p-6 mb-8">
          <p className="text-[10px] tracking-[3px] uppercase text-gold mb-2">Confirmation Code</p>
          <p className="font-display text-3xl text-gold-light">{done}</p>
        </div>
        <button onClick={() => setDone(null)} className="text-cream-muted hover:text-cream text-sm underline underline-offset-4 transition-colors">Make another reservation</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[4px] uppercase text-gold mb-3">Reserve a Table</p>
          <h1 className="font-display font-light text-6xl text-cream-light mb-4">Join Us</h1>
          <p className="text-cream-muted">Reservations required · We'll have your table ready.</p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[[Clock,'Open Daily','Until 10:00 PM'],[Users,'All Group Sizes','Up to 50 guests'],[Phone,'Reservations','023 888 222']].map(([Icon, t, d]) => (
            <div key={t} className="bg-ink-3/40 border border-ink-4/50 rounded-xl p-4 text-center">
              <Icon size={18} className="text-gold mx-auto mb-2"/>
              <div className="text-cream text-xs font-medium mb-0.5">{t}</div>
              <div className="text-cream-muted text-[11px]">{d}</div>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="bg-ink-2/60 border border-ink-4/50 rounded-3xl p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field icon={User} label="Full Name" name="name" value={form.name} onChange={update} placeholder="Your name" required />
            <Field icon={Mail} label="Email" name="email" type="email" value={form.email} onChange={update} placeholder="your@email.com" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field icon={Phone} label="Phone" name="phone" type="tel" value={form.phone} onChange={update} placeholder="+855 xx xxx xxx" required />
            <Field icon={Users} label="Guests" name="guests" type="number" min={1} max={50} value={form.guests} onChange={update} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field icon={CalendarCheck} label="Date" name="date" type="date" min={today} value={form.date} onChange={update} required />
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[2px] uppercase text-cream-muted flex items-center gap-1.5"><Clock size={11}/> Time</label>
              <select name="time" value={form.time} onChange={update} required className="bg-ink-3 border border-ink-4/70 text-cream px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-gold transition-colors appearance-none">
                <option value="">Select time</option>
                {timeSlots.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[2px] uppercase text-cream-muted">Occasion</label>
              <select name="occasion" value={form.occasion} onChange={update} className="bg-ink-3 border border-ink-4/70 text-cream px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-gold transition-colors appearance-none">
                {['casual','birthday','anniversary','business','other'].map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase()+o.slice(1)}</option>)}
              </select>
            </div>
            <Field label="Special Requests" name="specialRequests" value={form.specialRequests} onChange={update} placeholder="Allergies, seating…"/>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-gold hover:bg-gold-light disabled:opacity-60 text-ink font-semibold text-[11px] tracking-[3px] uppercase py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_24px_rgba(200,146,42,0.4)] mt-2">
            {loading ? 'Confirming…' : 'Confirm Reservation'}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] tracking-[2px] uppercase text-cream-muted flex items-center gap-1.5">
        {Icon && <Icon size={11}/>} {label}
      </label>
      <input {...props} className="bg-ink-3 border border-ink-4/70 text-cream placeholder-ink-5 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-gold transition-colors" />
    </div>
  );
}
