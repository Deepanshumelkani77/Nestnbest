import React from 'react'
import { Mail, Phone, MapPin, ArrowRight, ArrowUpRight, Building2, Users, ShieldCheck, Award, Send } from 'lucide-react'

const NAVY = '#193C06'
const BLUE = '#1E88E5'

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const STATS = [
  { icon: Building2, value: '10,000+', label: 'Properties Listed' },
  { icon: Users, value: '25,000+', label: 'Happy Customers' },
  { icon: Award, value: '50+', label: 'Cities Covered' },
  { icon: ShieldCheck, value: 'RERA', label: 'Registered Agency' },
]

const LINK_COLUMNS = [
  {
    heading: 'Company',
    links: ['About Us', 'Careers', 'Blog & Insights', 'Press & Media', 'Contact Us'],
  },
  {
    heading: 'Property Types',
    links: ['Residential Properties', 'Commercial Properties', 'Plots & Land', 'PG / Co-Living', 'New Launch Projects'],
  },
  {
    heading: 'Our Services',
    links: ['Buy a Property', 'Rent a Property', 'Sell / List for Free', 'Property Valuation', 'Home Loans', 'Legal Assistance'],
  },
]

const SOCIAL_LINKS = [
  { icon: FacebookIcon, href: '#', name: 'Facebook' },
  { icon: TwitterIcon, href: '#', name: 'Twitter' },
  { icon: InstagramIcon, href: '#', name: 'Instagram' },
  { icon: LinkedinIcon, href: '#', name: 'LinkedIn' },
]

const LinkColumn = ({ heading, links }) => (
  <div>
    <h4 className="text-sm font-bold tracking-wide uppercase text-slate-400 mb-5">{heading}</h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link}>
          <a
            href="#"
            className="text-slate-600 hover:text-[#1E88E5] transition-colors duration-200 text-sm flex items-center gap-1.5 group"
          >
            <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0" style={{ color: BLUE }} />
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

const Footer = () => {
  return (
    <footer className="relative bg-white mt-24">
      {/* CTA strip — overlaps the top edge of the footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-2xl px-6 sm:px-10 py-8 -translate-y-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
          style={{ background: `linear-gradient(120deg, ${NAVY}, #2E5C10)` }}
        >
          <div className="text-center md:text-left">
            <h3 className="text-white text-xl sm:text-2xl font-bold">Ready to find your next property?</h3>
            <p className="text-white/80 text-sm mt-1">Talk to our real estate experts — free consultation, zero obligation.</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="#"
              className="px-5 py-2.5 rounded-lg bg-white text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap"
              style={{ color: NAVY }}
            >
              Post Property — Free
            </a>
            <a
              href="#"
              className="px-5 py-2.5 rounded-lg border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition-colors duration-200 whitespace-nowrap"
            >
              Talk to Us
            </a>
          </div>
        </div>
      </div>

  
      <div className="h-px bg-slate-100" />

      {/* Main footer grid */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] gap-10">
          {/* Brand + contact */}
          <div className="space-y-5">
            <div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>Nestnbest</h3>
             
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-600 text-sm leading-snug">
                FF 05, Rise Retailia 1, Plot No. SC 01, Sector 1, Greater Noida West, Gautam Buddha Nagar, Uttar Pradesh - 201306
                </p>
              </div>
              <a href="tel:+919876543210" className="flex items-center gap-2.5 text-slate-600 hover:text-[#1E88E5] transition-colors duration-200 w-fit">
                <Phone size={16} className="text-slate-400 flex-shrink-0" />
                <span className="text-sm">+91 9355544664</span>
              </a>
              <a href="mailto:info@nestnbest.com" className="flex items-center gap-2.5 text-slate-600 hover:text-[#1E88E5] transition-colors duration-200 w-fit">
                <Mail size={16} className="text-slate-400 flex-shrink-0" />
                <span className="text-sm">info@nestnbest.com</span>
              </a>
            </div>

            <div className="flex gap-2 pt-1">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-white transition-all duration-200"
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = NAVY)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                  aria-label={social.name}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {LINK_COLUMNS.map((col) => (
            <LinkColumn key={col.heading} heading={col.heading} links={col.links} />
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold tracking-wide uppercase text-slate-400 mb-5">Stay Updated</h4>
            <p className="text-slate-500 text-sm mb-4 leading-relaxed">
              Get the latest listings, price trends, and exclusive offers straight to your inbox.
            </p>
            <form className="space-y-2.5" onSubmit={(e) => e.preventDefault()}>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus-within:border-[#1E88E5] transition-colors duration-200">
                <Mail size={15} className="text-slate-400 flex-shrink-0" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-transparent text-slate-700 placeholder-slate-400 text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ backgroundColor: BLUE }}
              >
                Subscribe
                <Send size={14} />
              </button>
            </form>
            <p className="text-slate-400 text-xs mt-3">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* Bottom bar */}
      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Nestnbest Realty Pvt. Ltd. All rights reserved. &nbsp;|&nbsp; RERA Reg. No. HRERA-GGM-2024-XXXX
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-slate-500 hover:text-[#1E88E5] transition-colors duration-200 text-sm flex items-center gap-1 group"
                >
                  {label}
                  <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer