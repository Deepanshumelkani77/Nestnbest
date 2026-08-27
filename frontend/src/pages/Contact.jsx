import React, { useState } from 'react'
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building2,
  ChevronDown,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'

const NAVY = '#193C06'
const BLUE = '#1E88E5'

const OFFICE_COORDS = '28.5807941,77.4282933'

const CONTACT_CARDS = [
  {
    icon: Phone,
    title: 'Call Us',
    lines: [ '+91 9999-122-522'],
    note: 'Mon–Sat, 9 AM – 11 PM IST',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: [ 'support@nestnbest.com'],
    note: 'We reply within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['FF 05, Rise Retailia 1, Plot No. SC 01, Sector 1, Greater Noida West, Gautam Buddha Nagar, Uttar Pradesh - 201306'],
    note: '',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    lines: ['Monday – Saturday', '9:00 AM – 7:00 PM'],
    note: 'Sunday: By appointment',
  },
]

const REASONS = ['General Enquiry', 'Buy a Property', 'Rent a Property', 'Sell / List Property', 'Partnership', 'Support']

const OFFICES = [
  { city: 'Gurgaon', label: 'Head Office', address: '123 Business Hub, Sector 18, Gurgaon, Haryana 122015', phone: '+91 98765 43210' },
  { city: 'Delhi', label: 'Regional Office', address: '45 Connaught Circus, Central Delhi, Delhi 110001', phone: '+91 98765 43211' },
  { city: 'Mumbai', label: 'Regional Office', address: '8th Floor, BKC Towers, Bandra East, Mumbai 400051', phone: '+91 98765 43212' },
  { city: 'Bangalore', label: 'Regional Office', address: '2nd Floor, MG Road, Bangalore 560001', phone: '+91 98765 43213' },
  { city: 'Hyderabad', label: 'Regional Office', address: 'Level 4, HITEC City, Hyderabad 500081', phone: '+91 98765 43214' },
  { city: 'Pune', label: 'Regional Office', address: 'Baner Road, Pune, Maharashtra 411045', phone: '+91 98765 43215' },
]

const FAQS = [
  { q: 'How quickly will someone get back to me?', a: 'Our support team responds to all enquiries within 24 hours on business days, and most calls are answered live during working hours.' },
  { q: 'Is listing my property really free?', a: 'Yes — posting a residential or commercial property on Nestnbest is completely free. Optional premium placements are available if you want extra visibility.' },
  { q: 'Do you have offices outside Delhi NCR?', a: 'Yes, we currently operate out of 6 cities including Mumbai, Bangalore, Hyderabad, and Pune, with more launching this year.' },
  { q: 'Can I schedule an in-person consultation?', a: 'Absolutely — mention your preferred city and time in the contact form and our relationship manager will confirm a slot.' },
]

const ChevronDivider = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 6l6 6-6 6" />
  </svg>
)

const FaqItem = ({ q, a, isOpen, onToggle }) => (
  <div className="border border-slate-100 rounded-xl overflow-hidden bg-white">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
    >
      <span className="font-semibold text-sm" style={{ color: NAVY }}>{q}</span>
      <ChevronDown
        size={18}
        className="text-slate-400 flex-shrink-0 transition-transform duration-200"
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
      />
    </button>
    {isOpen && (
      <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed">
        {a}
      </div>
    )}
  </div>
)

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', reason: REASONS[0], message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="w-full bg-white pt-20">
      {/* ---- Hero ---- */}
      <div className="relative w-full h-[300px] sm:h-[360px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&h=700&fit=crop"
          alt="Nestnbest office"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, rgba(25,60,6,0.92), rgba(25,60,6,0.55))` }} />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <span>Home</span>
            <ChevronDivider />
            <span className="text-white font-medium">Contact Us</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white max-w-xl leading-tight">
            We'd love to hear from you.
          </h1>
          <p className="text-white/85 text-base sm:text-lg mt-4 max-w-xl leading-relaxed">
            Questions about buying, renting, or listing a property? Our team is here to help — reach out any way that's convenient.
          </p>
        </div>
      </div>

      {/* ---- Contact info cards — overlaps hero edge ---- */}
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 -translate-y-10">
          {CONTACT_CARDS.map(({ icon: Icon, title, lines, note }) => (
            <div key={title} className="bg-white flex rounded-2xl shadow-xl border border-slate-100 p-6">
              <span className="w-11 h-11 rounded-xl flex  items-center justify-center mb-4" style={{ backgroundColor: 'rgba(30,136,229,0.1)' }}>
                <Icon size={20} style={{ color: BLUE }} />
              </span>
              
              <div className="ml-5"> 
                <h3 className="font-bold text-sm mb-2" style={{ color: NAVY }}>{title}</h3>
              {lines.map((line) => (
                <p key={line} className="text-slate-600 text-sm leading-snug">{line}</p>
              ))}
              <p className="text-slate-400 text-xs mt-2">{note}</p>
              </div>
            
            </div>
          ))}
        </div>
      </div>

      {/* ---- Form + map ---- */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 -mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
            <span className="text-xs font-bold tracking-wider uppercase" style={{ color: BLUE }}>Send a Message</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6" style={{ color: NAVY }}>
              Tell us how we can help
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <span className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(30,136,229,0.1)' }}>
                  <CheckCircle2 size={28} style={{ color: BLUE }} />
                </span>
                <h3 className="font-bold text-lg mb-2" style={{ color: NAVY }}>Message sent!</h3>
                <p className="text-slate-500 text-sm max-w-sm">Thanks for reaching out — our team will get back to you within 24 hours.</p>
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', reason: REASONS[0], message: '' }) }}
                  className="mt-6 text-sm font-semibold hover:underline"
                  style={{ color: BLUE }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange('name')}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#1E88E5] transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#1E88E5] transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#1E88E5] transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">I'm reaching out about</label>
                  <div className="relative">
                    <select
                      value={form.reason}
                      onChange={handleChange('reason')}
                      className="w-full appearance-none px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 focus:outline-none focus:border-[#1E88E5] transition-colors duration-200"
                    >
                      {REASONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={2}
                    value={form.message}
                    onChange={handleChange('message')}
                    placeholder="Tell us a bit about what you're looking for..."
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#1E88E5] transition-colors duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ backgroundColor: BLUE }}
                >
                  Send Message
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>

          {/* Map + quick chat card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Right: Map */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100 relative h-[400px]">
              <iframe
                src={`https://www.google.com/maps?q=${OFFICE_COORDS}&z=17&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nestnbest Office Location"
              ></iframe>
              <div className="absolute top-4 right-4">
                <a
                  href={`https://www.google.com/maps?q=${OFFICE_COORDS}&z=17`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 text-white rounded-lg transition-colors text-sm font-medium hover:opacity-90 shadow-lg"
                  style={{ backgroundColor: NAVY }}
                >
                  Open in Maps
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${BLUE} 0%, ${NAVY} 100%)` }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30" style={{ backgroundColor: '#FFFFFF' }} />
              <div className="relative z-10">
                <span className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white/20 backdrop-blur-sm">
                  <MessageSquare size={22} className="text-white" />
                </span>
                <h3 className="text-white font-bold text-lg mb-2">Prefer to chat?</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-5">
                  Our support team is online during business hours and typically replies in under 5 minutes.
                </p>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg" style={{ color: BLUE }}>
                  Start Live Chat
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Contact