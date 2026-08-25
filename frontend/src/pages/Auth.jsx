import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  User,
  Lock,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Home,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  MapPin,
  ShieldCheck,
  Star,
  Quote,
  KeyRound,
} from 'lucide-react'

/* ---- Design tokens ------------------------------------------------------
   INK    – deep architectural charcoal-green, the "blueprint" panel
   BRASS  – warm hardware-gold accent (key, lockset, signage)
   PAPER  – warm document paper for the form panel
   SAGE   – muted foliage green, secondary accent
   CLAY   – warning/weak accent
--------------------------------------------------------------------------- */
const INK = '#152420'
const INK_SOFT = '#1F332C'
const BRASS = '#B8863B'
const BRASS_LIGHT = '#D7AD6C'
const PAPER = '#F6F3EC'
const PAPER_LINE = '#E4DDCC'
const SAGE = '#5F7A5C'
const CLAY = '#B0503A'
const INKTEXT = '#22302A'

const ROLES = [
  { id: 'owner', label: 'Owner', full: 'Property Owner', icon: Home, description: 'List your own properties' },
  { id: 'builder', label: 'Builder', full: 'Builder / Developer', icon: Building2, description: 'Showcase your projects' },
  { id: 'consultant', label: 'Consultant', full: 'Property Consultant', icon: Briefcase, description: 'Provide expert advice' },
]

const COUNTRY_CODES = [
  { code: '+91', country: 'India', countryCode: 'in' },
  { code: '+1', country: 'USA', countryCode: 'us' },
  { code: '+44', country: 'UK', countryCode: 'gb' },
  { code: '+86', country: 'China', countryCode: 'cn' },
  { code: '+971', country: 'UAE', countryCode: 'ae' },
  { code: '+61', country: 'Australia', countryCode: 'au' },
  { code: '+65', country: 'Singapore', countryCode: 'sg' },
  { code: '+974', country: 'Qatar', countryCode: 'qa' },
  { code: '+966', country: 'Saudi Arabia', countryCode: 'sa' },
]

const SPEC_SHEET = [
  { value: '2.4L+', label: 'Listings posted' },
  { value: '18L+', label: 'Verified buyers' },
  { value: '35+', label: 'Cities covered' },
]

const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: '', color: PAPER_LINE }
  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 10) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { score: 1, label: 'Weak', color: CLAY }
  if (score <= 3) return { score: 2, label: 'Fair', color: BRASS }
  return { score: 3, label: 'Strong', color: SAGE }
}

/* Ledger-style field: mono micro-label, inline icon, underline focus */
const LedgerField = ({ label, icon: Icon, rightIcon, onRightIconClick, ...props }) => (
  <div>
    <label
      className="block text-[10px] font-semibold tracking-[0.14em] uppercase mb-1.5"
      style={{ color: '#8A8272', fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {label}
    </label>
    <div className="relative flex items-center border-b-2 group" style={{ borderColor: PAPER_LINE }}>
      <Icon size={16} className="mr-3 flex-shrink-0" style={{ color: '#A39A85' }} />
      <input
        {...props}
        className="w-full bg-transparent py-2.5 pr-8 outline-none text-sm placeholder-[#B2A98F] transition-colors"
        style={{ color: INKTEXT }}
        onFocus={(e) => {
          e.target.closest('.group')?.style.setProperty('border-color', BRASS)
        }}
      />
      {rightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="absolute right-0 text-[#A39A85] hover:text-[#6B6350] transition-colors"
        >
          {rightIcon}
        </button>
      )}
    </div>
  </div>
)

const Auth = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [selectedRole, setSelectedRole] = useState('owner')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotError, setForgotError] = useState('')
  const [forgotSuccess, setForgotSuccess] = useState(false)
  const [emailOtpSent, setEmailOtpSent] = useState(false)
  const [emailOtp, setEmailOtp] = useState('')
  const [emailOtpVerified, setEmailOtpVerified] = useState(false)
  const [showEmailOtpVerificationModal, setShowEmailOtpVerificationModal] = useState(false)
  const [mobileOtpSent, setMobileOtpSent] = useState(false)
  const [mobileOtp, setMobileOtp] = useState('')
  const [mobileOtpVerified, setMobileOtpVerified] = useState(false)
  const [otpError, setOtpError] = useState('')
  const [otpMode, setOtpMode] = useState('sms')
  const [showOtpModeModal, setShowOtpModeModal] = useState(false)
  const [showOtpVerificationModal, setShowOtpVerificationModal] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    password: '',
    confirmPassword: '',
  })

  const [showCountryDropdown, setShowCountryDropdown] = useState(false)

  const passwordStrength = useMemo(() => getPasswordStrength(signupData.password), [signupData.password])

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      if (loginData.email && loginData.password) {
        const userData = {
          id: 1,
          name: loginData.email.split('@')[0],
          email: loginData.email,
          role: selectedRole,
          avatar: `https://ui-avatars.com/api/?name=${loginData.email.split('@')[0]}&background=${INK.replace('#', '')}&color=fff`,
        }
        login(userData)
        navigate('/dashboard')
      } else {
        setError('Please fill in all fields')
      }
      setLoading(false)
    }, 1000)
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    setTimeout(() => {
      if (signupData.name && signupData.email && signupData.phone && signupData.password) {
        const userData = {
          id: Date.now(),
          name: signupData.name,
          email: signupData.email,
          phone: signupData.phone,
          role: selectedRole,
          avatar: `https://ui-avatars.com/api/?name=${signupData.name.replace(/\s/g, '+')}&background=${INK.replace('#', '')}&color=fff`,
        }
        login(userData)
        navigate('/dashboard')
      } else {
        setError('Please fill in all required fields')
      }
      setLoading(false)
    }, 1000)
  }

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    setForgotError('')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(forgotEmail)) {
      setForgotError('Please enter a valid email address')
      return
    }

    console.log('Forgot password for:', forgotEmail)
    setForgotSuccess(true)
    setForgotEmail('')
  }

  const sendEmailOtp = () => {
    setOtpError('')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(signupData.email)) {
      setOtpError('Please enter a valid email address first')
      return
    }
    setEmailOtp('')
    console.log('Sending OTP to email:', signupData.email)
    setEmailOtpSent(true)
    setShowEmailOtpVerificationModal(true)
  }

  const verifyEmailOtp = () => {
    setOtpError('')
    if (emailOtp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP')
      return
    }
    console.log('Verifying email OTP:', emailOtp)
    setEmailOtpVerified(true)
    setShowEmailOtpVerificationModal(false)
  }

  const sendMobileOtp = (mode) => {
    setOtpError('')
    const phoneRegex = /^\+?[0-9]+$/
    if (!phoneRegex.test(signupData.phone)) {
      setOtpError('Please enter a valid phone number first')
      return
    }
    setOtpMode(mode)
    setShowOtpModeModal(false)
    setMobileOtp('')
    console.log('Sending OTP to mobile via', mode, ':', signupData.phone)
    setMobileOtpSent(true)
    setShowOtpVerificationModal(true)
  }

  const verifyMobileOtp = () => {
    setOtpError('')
    if (mobileOtp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP')
      return
    }
    console.log('Verifying mobile OTP:', mobileOtp)
    setMobileOtpVerified(true)
    setShowOtpVerificationModal(false)
  }

  return (
    <div className="h-screen w-full flex overflow-hidden" style={{ backgroundColor: PAPER }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-mono-ui { font-family: 'IBM Plex Mono', monospace; }
        body, .font-body { font-family: 'Inter', sans-serif; }
        @keyframes drawLine { to { stroke-dashoffset: 0; } }
        .blueprint-draw { stroke-dasharray: 900; stroke-dashoffset: 900; animation: drawLine 2.2s ease-out forwards; }
      `}</style>

      {/* ---- Left: blueprint panel ---- */}
      <div className="hidden lg:flex lg:w-[46%] relative overflow-y-auto font-body" style={{ backgroundColor: INK }}>
        {/* graph-paper grid */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(215,173,108,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(215,173,108,0.5) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(120% 90% at 15% 0%, ${INK_SOFT} 0%, ${INK} 60%)` }}
        />

        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 text-white w-full">
          {/* Mark */}
          <div className={`flex items-center gap-2.5 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
            <span
              className="w-8 h-8 flex items-center justify-center border"
              style={{ borderColor: BRASS, color: BRASS_LIGHT }}
            >
              <KeyRound size={15} />
            </span>
            <span className="font-display text-lg tracking-tight">Nestnbest</span>
          </div>

          {/* Headline + blueprint illustration */}
          <div className={`max-w-md transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            <span
              className="inline-flex items-center gap-2 text-[10px] font-mono-ui tracking-[0.18em] uppercase mb-5"
              style={{ color: BRASS_LIGHT }}
            >
              <span className="w-4 h-px" style={{ backgroundColor: BRASS_LIGHT }} />
              Property access
            </span>
            <h1 className="font-display text-3xl xl:text-[2.35rem] leading-[1.15] mb-4" style={{ fontWeight: 500 }}>
              {isLogin ? 'Every listing, one dashboard.' : 'List it right. Sell it faster.'}
            </h1>
            <p className="text-white/65 text-sm leading-relaxed font-body">
              {isLogin
                ? 'Track enquiries, update listings, and hear from verified buyers — all from one account.'
                : 'Owners, agents and builders use EstateHub to put properties in front of serious, verified buyers.'}
            </p>

            {/* Blueprint house diagram */}
            <div className="mt-8 mb-8">
              <svg viewBox="0 0 340 170" className="w-full h-auto" fill="none">
                {/* ground line with dimension ticks */}
                <line x1="20" y1="140" x2="320" y2="140" stroke={BRASS} strokeOpacity="0.5" strokeWidth="1" />
                {[20, 320].map((x) => (
                  <line key={x} x1={x} y1="135" x2={x} y2="145" stroke={BRASS} strokeOpacity="0.5" strokeWidth="1" />
                ))}
                <text x="170" y="158" textAnchor="middle" fill={BRASS_LIGHT} fontSize="9" fontFamily="IBM Plex Mono, monospace" opacity="0.7">
                  12.4M FRONTAGE
                </text>

                {/* house outline, drawn on load */}
                <path
                  className="blueprint-draw"
                  d="M60 140 V80 L170 30 L280 80 V140 M60 90 H280 M170 30 V140 M110 140 V95 H150 V140 M210 100 H250 V125 H210 Z"
                  stroke={BRASS_LIGHT}
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />

                {/* vertical dimension marker */}
                <line x1="300" y1="80" x2="300" y2="140" stroke={BRASS} strokeOpacity="0.5" strokeWidth="1" />
                <text x="308" y="113" fill={BRASS_LIGHT} fontSize="9" fontFamily="IBM Plex Mono, monospace" opacity="0.7">
                  4.1M
                </text>
              </svg>
            </div>

          
            {/* Testimonial tag */}
            <div className="mt-7 relative pl-5 py-4 pr-4 border" style={{ borderColor: 'rgba(215,173,108,0.35)', borderStyle: 'dashed' }}>
              <span
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: INK, border: `1px solid ${BRASS}` }}
              />
              <Quote size={14} style={{ color: BRASS }} className="mb-2 opacity-70" />
              <p className="text-sm text-white/85 leading-relaxed mb-3 font-body">
                Posted the listing on a Monday, had three verified enquiries by the weekend — sold within three weeks.
              </p>
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-mono-ui uppercase tracking-wide text-white/50">Rakesh Malhotra — Owner</p>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} size={10} fill={BRASS} strokeWidth={0} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className={`text-white/35 text-[10px] font-mono-ui tracking-wider transition-all duration-700 delay-200 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            EST. LISTINGS PLATFORM — VERIFIED SINCE DAY ONE
          </p>
        </div>
      </div>

      {/* ---- Right: form panel ---- */}
      <div className="flex-1 flex items-center justify-center px-4 py-6 relative font-body overflow-y-auto h-screen">
        <div className="w-full max-w-md">
          {/* Mobile mark */}
          <div className="flex lg:hidden items-center gap-2.5 justify-center mb-8">
            <span className="w-8 h-8 flex items-center justify-center border" style={{ borderColor: BRASS, color: BRASS }}>
              <KeyRound size={15} />
            </span>
            <span className="font-display text-lg" style={{ color: INKTEXT }}>EstateHub</span>
          </div>

          <div
            className={`relative bg-white border p-6 sm:p-7 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ borderColor: PAPER_LINE }}
          >
            {/* corner tag */}
            <div
              className="hidden sm:flex absolute -top-3 -right-3 items-center gap-1.5 px-2.5 py-1 text-white text-[9px] font-mono-ui uppercase tracking-wider"
              style={{ backgroundColor: BRASS, transform: 'rotate(3deg)' }}
            >
              <ShieldCheck size={10} />
              Verified platform
            </div>

            {/* Ledger tabs */}
            <div className="flex border-b mb-5" style={{ borderColor: PAPER_LINE }}>
              {[{ k: true, t: 'Sign In' }, { k: false, t: 'Sign Up' }].map((tab) => (
                <button
                  key={tab.t}
                  onClick={() => { setIsLogin(tab.k); setError('') }}
                  className="flex-1 pb-3 text-sm font-semibold font-mono-ui uppercase tracking-wide transition-colors relative"
                  style={{ color: isLogin === tab.k ? INKTEXT : '#B2A98F' }}
                >
                  {tab.t}
                  {isLogin === tab.k && (
                    <span className="absolute left-0 right-0 -bottom-[1px] h-[2px]" style={{ backgroundColor: BRASS }} />
                  )}
                </button>
              ))}
            </div>

            <div className="mb-5">
              <h2 className="font-display text-[1.7rem] mb-1.5" style={{ color: INKTEXT, fontWeight: 500 }}>
                {isLogin ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="text-[#8A8272] text-sm">
                {isLogin ? 'Choose your role and enter your credentials.' : 'Choose your role to get started.'}
              </p>
            </div>

            {/* Role selection */}
            <div className="mb-5">
              <label
                className="block text-[10px] font-semibold tracking-[0.14em] uppercase mb-3 font-mono-ui"
                style={{ color: '#8A8272' }}
              >
                I am a —
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ROLES.map((role) => {
                  const Icon = role.icon
                  const isActive = selectedRole === role.id
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      title={role.description}
                      className="relative py-3 border transition-all duration-200"
                      style={{
                        borderColor: isActive ? BRASS : PAPER_LINE,
                        backgroundColor: isActive ? 'rgba(184,134,59,0.06)' : 'transparent',
                      }}
                    >
                      {isActive && (
                        <CheckCircle2 size={12} className="absolute top-1.5 right-1.5" style={{ color: BRASS }} />
                      )}
                      <Icon size={18} className="mx-auto mb-1.5" style={{ color: isActive ? BRASS : '#A39A85' }} />
                      <span
                        className="block text-[11px] font-semibold text-center font-mono-ui uppercase tracking-wide"
                        style={{ color: isActive ? INKTEXT : '#8A8272' }}
                      >
                        {role.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {error && (
              <div
                className="flex items-center gap-2 px-4 py-3 border text-xs font-medium mb-6"
                style={{ borderColor: CLAY, color: CLAY, backgroundColor: 'rgba(176,80,58,0.06)' }}
              >
                <AlertCircle size={15} className="flex-shrink-0" />
                {error}
              </div>
            )}

            {isLogin ? (
              /* ---- Login Form ---- */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <LedgerField
                  label="Email address"
                  icon={Mail}
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="you@example.com"
                  required
                />

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      className="text-[10px] font-semibold tracking-[0.14em] uppercase font-mono-ui"
                      style={{ color: '#8A8272' }}
                    >
                      Password
                    </label>
                    <button type="button" onClick={() => setShowForgotPassword(true)} className="text-xs font-semibold" style={{ color: BRASS }}>
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative flex items-center border-b-2" style={{ borderColor: PAPER_LINE }}>
                    <Lock size={16} className="mr-3 flex-shrink-0" style={{ color: '#A39A85' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      placeholder="Enter your password"
                      required
                      className="w-full bg-transparent py-2.5 pr-8 outline-none text-sm placeholder-[#B2A98F]"
                      style={{ color: INKTEXT }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 text-[#A39A85] hover:text-[#6B6350] transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-white text-sm font-semibold font-mono-ui uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                  style={{ backgroundColor: INK }}
                >
                  {loading ? 'Signing in…' : 'Sign In'}
                  {!loading && <ArrowRight size={15} />}
                </button>
              </form>
            ) : (
              /* ---- Signup Form ---- */
              <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                <LedgerField
               
                  icon={User}
                  type="text"
                  name="name"
                  value={signupData.name}
                  onChange={handleSignupChange}
                  placeholder="Full name *"
                  required
                />

                <div>

                  <div className="flex gap-2">
                    <div className="relative">
                      <div className="relative flex items-center border-b-2" style={{ borderColor: PAPER_LINE, minWidth: '85px' }}>
                        <button
                          type="button"
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          className="flex items-center gap-1 px-2 py-3 bg-transparent outline-none text-sm w-full"
                          style={{ color: INKTEXT }}
                        >
                          <span className={`fi fi-${COUNTRY_CODES.find(c => c.code === signupData.countryCode)?.countryCode || 'in'} rounded`}></span>
                          <span className="text-xs">{signupData.countryCode}</span>
                        </button>
                      </div>
                      {showCountryDropdown && (
                        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-10 max-h-48 overflow-y-auto w-40">
                          {COUNTRY_CODES.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => {
                                setSignupData({ ...signupData, countryCode: country.code })
                                setShowCountryDropdown(false)
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-left text-sm"
                            >
                              <span className={`fi fi-${country.countryCode} rounded`}></span>
                              <span>{country.code}</span>
                              <span className="text-xs text-gray-500">{country.country}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="relative flex items-center border-b-2" style={{ borderColor: PAPER_LINE }}>
                        <input
                          type="tel"
                          name="phone"
                          value={signupData.phone}
                          onChange={handleSignupChange}
                          placeholder="Phone number *"
                          required
                          className="w-full bg-transparent py-2.5 pr-8 outline-none text-sm placeholder-[#B2A98F]"
                          style={{ color: INKTEXT }}
                        />
                      </div>
                    </div>
                    {!mobileOtpVerified && (
                      <button
                        type="button"
                        onClick={() => setShowOtpModeModal(true)}
                        disabled={mobileOtpSent}
                        className="px-3 py-2 text-white text-xs font-semibold font-mono-ui uppercase tracking-wide rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: INK, marginTop: '1.6rem' }}
                      >
                        {mobileOtpSent ? 'Sent' : 'Send OTP'}
                      </button>
                    )}
                    {mobileOtpVerified && (
                      <div
                        className="px-3 py-2 text-xs font-semibold font-mono-ui uppercase tracking-wide rounded-md flex items-center gap-1"
                        style={{ backgroundColor: 'rgba(95,122,92,0.15)', color: SAGE, marginTop: '1.6rem' }}
                      >
                        <CheckCircle2 size={12} />
                        Verified
                      </div>
                    )}
                  </div>
                  {otpError && <div className="text-[11px] font-semibold mt-1.5" style={{ color: CLAY }}>{otpError}</div>}
                </div>

                <div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                    
                      <div className="relative flex items-center border-b-2" style={{ borderColor: PAPER_LINE }}>
                        <Mail size={16} className="mr-1 flex-shrink-0" style={{ color: '#A39A85' }} />
                        <input
                          type="email"
                          name="email"
                          value={signupData.email}
                          onChange={handleSignupChange}
                          placeholder="   Email address *"
                          required
                          className="w-full bg-transparent py-2.5 pr-8 outline-none text-sm placeholder-[#B2A98F]"
                          style={{ color: INKTEXT }}
                        />
                      </div>
                    </div>
                    {!emailOtpVerified && (
                      <button
                        type="button"
                        onClick={sendEmailOtp}
                        disabled={emailOtpSent}
                        className="px-3 py-2 text-white text-xs font-semibold font-mono-ui uppercase tracking-wide rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: INK, marginTop: '1.6rem' }}
                      >
                        {emailOtpSent ? 'Sent' : 'Send OTP'}
                      </button>
                    )}
                    {emailOtpVerified && (
                      <div
                        className="px-3 py-2 text-xs font-semibold font-mono-ui uppercase tracking-wide rounded-md flex items-center gap-1"
                        style={{ backgroundColor: 'rgba(95,122,92,0.15)', color: SAGE, marginTop: '1.6rem' }}
                      >
                        <CheckCircle2 size={12} />
                        Verified
                      </div>
                    )}
                  </div>
                  {otpError && <div className="text-[11px] font-semibold mt-1.5" style={{ color: CLAY }}>{otpError}</div>}
                </div>

                <div>

                  <div className="relative flex items-center border-b-2" style={{ borderColor: PAPER_LINE }}>
                    <Lock size={16} className="mr-3 flex-shrink-0" style={{ color: '#A39A85' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      placeholder="Create a password"
                      required
                      className="w-full bg-transparent py-2.5 pr-8 outline-none text-sm placeholder-[#B2A98F]"
                      style={{ color: INKTEXT }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 text-[#A39A85] hover:text-[#6B6350] transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {signupData.password && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-[3px]" style={{ backgroundColor: PAPER_LINE }}>
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${(passwordStrength.score / 3) * 100}%`,
                            backgroundColor: passwordStrength.color,
                          }}
                        />
                      </div>
                      <span
                        className="text-[10px] font-semibold font-mono-ui uppercase tracking-wide"
                        style={{ color: passwordStrength.color }}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="relative flex items-center border-b-2" style={{ borderColor: PAPER_LINE }}>
                    <Lock size={16} className="mr-3 flex-shrink-0" style={{ color: '#A39A85' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      placeholder="Confirm password"
                      required
                      className="w-full bg-transparent py-2.5 pr-8 outline-none text-sm placeholder-[#B2A98F]"
                      style={{ color: INKTEXT }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-white text-sm font-semibold font-mono-ui uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                  style={{ backgroundColor: INK }}
                >
                  {loading ? 'Creating account…' : 'Create Account'}
                  {!loading && <ArrowRight size={15} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Email OTP Verification Modal */}
      {showEmailOtpVerificationModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(21,36,32,0.6)' }}
            onClick={() => setShowEmailOtpVerificationModal(false)}
          />
          <div
            className="relative w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl p-6 border"
            style={{ borderColor: PAPER_LINE }}
          >
            <button
              onClick={() => setShowEmailOtpVerificationModal(false)}
              className="absolute top-4 right-4 text-[#A39A85] hover:text-[#6B6350] transition-colors"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(184,134,59,0.15)' }}>
                <Mail size={24} style={{ color: BRASS }} />
              </div>
              <h2 className="font-display text-lg mb-2" style={{ color: INKTEXT, fontWeight: 500 }}>
                Verify Your Email
              </h2>
              <p className="text-sm" style={{ color: '#8A8272' }}>
                Enter the 6-digit code sent to your email
              </p>
              <p className="text-xs mt-1" style={{ color: '#8A8272' }}>
                {signupData.email}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2 justify-center">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={emailOtp[index] || ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      if (value) {
                        const newOtp = emailOtp.split('')
                        newOtp[index] = value
                        setEmailOtp(newOtp.join(''))
                        if (index < 5) {
                          e.target.nextElementSibling?.focus()
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !emailOtp[index] && index > 0) {
                        e.target.previousElementSibling?.focus()
                      }
                    }}
                    className="w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg outline-none transition-all focus:border-opacity-100"
                    style={{
                      borderColor: PAPER_LINE,
                      color: INKTEXT,
                    }}
                  />
                ))}
              </div>

              {otpError && (
                <div className="text-[11px] font-semibold text-center" style={{ color: CLAY }}>
                  {otpError}
                </div>
              )}

              <button
                type="button"
                onClick={verifyEmailOtp}
                className="w-full py-3 text-white text-sm font-semibold font-mono-ui uppercase tracking-wide rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: INK }}
              >
                Verify
              </button>

              <button
                type="button"
                onClick={() => setShowEmailOtpVerificationModal(false)}
                className="w-full py-2 text-xs font-semibold transition-all hover:opacity-70"
                style={{ color: '#8A8272' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOtpVerificationModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(21,36,32,0.6)' }}
            onClick={() => setShowOtpVerificationModal(false)}
          />
          <div
            className="relative w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl p-6 border"
            style={{ borderColor: PAPER_LINE }}
          >
            <button
              onClick={() => setShowOtpVerificationModal(false)}
              className="absolute top-4 right-4 text-[#A39A85] hover:text-[#6B6350] transition-colors"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: otpMode === 'whatsapp' ? 'rgba(37,211,102,0.15)' : 'rgba(21,36,32,0.1)' }}>
                {otpMode === 'whatsapp' ? (
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                ) : (
                  <Phone size={24} style={{ color: INK }} />
                )}
              </div>
              <h2 className="font-display text-lg mb-2" style={{ color: INKTEXT, fontWeight: 500 }}>
                Verify Your Number
              </h2>
              <p className="text-sm" style={{ color: '#8A8272' }}>
                Enter the 6-digit code sent to you via {otpMode === 'whatsapp' ? 'WhatsApp' : 'SMS'}
              </p>
              <p className="text-xs mt-1" style={{ color: '#8A8272' }}>
                {signupData.countryCode} {signupData.phone}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2 justify-center">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={mobileOtp[index] || ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      if (value) {
                        const newOtp = mobileOtp.split('')
                        newOtp[index] = value
                        setMobileOtp(newOtp.join(''))
                        if (index < 5) {
                          e.target.nextElementSibling?.focus()
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !mobileOtp[index] && index > 0) {
                        e.target.previousElementSibling?.focus()
                      }
                    }}
                    className="w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg outline-none transition-all focus:border-opacity-100"
                    style={{
                      borderColor: PAPER_LINE,
                      color: INKTEXT,
                    }}
                  />
                ))}
              </div>

              {otpError && (
                <div className="text-[11px] font-semibold text-center" style={{ color: CLAY }}>
                  {otpError}
                </div>
              )}

              <button
                type="button"
                onClick={verifyMobileOtp}
                className="w-full py-3 text-white text-sm font-semibold font-mono-ui uppercase tracking-wide rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: INK }}
              >
                Verify
              </button>

              <button
                type="button"
                onClick={() => setShowOtpVerificationModal(false)}
                className="w-full py-2 text-xs font-semibold transition-all hover:opacity-70"
                style={{ color: '#8A8272' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Mode Selection Modal */}
      {showOtpModeModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(21,36,32,0.6)' }}
            onClick={() => setShowOtpModeModal(false)}
          />
          <div
            className="relative w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl p-6 border"
            style={{ borderColor: PAPER_LINE }}
          >
            <button
              onClick={() => setShowOtpModeModal(false)}
              className="absolute top-4 right-4 text-[#A39A85] hover:text-[#6B6350] transition-colors"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <h2 className="font-display text-lg mb-2" style={{ color: INKTEXT, fontWeight: 500 }}>Choose OTP Method</h2>
              <p className="text-sm" style={{ color: '#8A8272' }}>
                How would you like to receive your OTP?
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => sendMobileOtp('sms')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all hover:bg-gray-50"
                style={{ borderColor: otpMode === 'sms' ? INK : PAPER_LINE, backgroundColor: otpMode === 'sms' ? 'rgba(21,36,32,0.05)' : 'transparent' }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(21,36,32,0.1)' }}>
                  <Phone size={18} style={{ color: INK }} />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm" style={{ color: INKTEXT }}>SMS</div>
                  <div className="text-xs" style={{ color: '#8A8272' }}>Receive via text message</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => sendMobileOtp('whatsapp')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all hover:bg-gray-50"
                style={{ borderColor: otpMode === 'whatsapp' ? '#25D366' : PAPER_LINE, backgroundColor: otpMode === 'whatsapp' ? 'rgba(37,211,102,0.05)' : 'transparent' }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(37,211,102,0.1)' }}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm" style={{ color: INKTEXT }}>WhatsApp</div>
                  <div className="text-xs" style={{ color: '#8A8272' }}>Receive via WhatsApp</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(21,36,32,0.6)' }}
            onClick={() => setShowForgotPassword(false)}
          />
          <div
            className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl p-8 border"
            style={{ borderColor: PAPER_LINE }}
          >
            <button
              onClick={() => setShowForgotPassword(false)}
              className="absolute top-4 right-4 text-[#A39A85] hover:text-[#6B6350] transition-colors"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(184,134,59,0.15)' }}>
                <Lock size={20} style={{ color: BRASS }} />
              </div>
              <h2 className="font-display text-xl mb-2" style={{ color: INKTEXT, fontWeight: 500 }}>Forgot Password?</h2>
              <p className="text-sm" style={{ color: '#8A8272' }}>
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {!forgotSuccess ? (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label
                    className="block text-[10px] font-semibold tracking-[0.14em] uppercase mb-1.5 font-mono-ui"
                    style={{ color: '#8A8272' }}
                  >
                    Email address
                  </label>
                  <div className="relative flex items-center border-b-2" style={{ borderColor: PAPER_LINE }}>
                    <Mail size={16} className="mr-3 flex-shrink-0" style={{ color: '#A39A85' }} />
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full bg-transparent py-2.5 pr-8 outline-none text-sm placeholder-[#B2A98F]"
                      style={{ color: INKTEXT }}
                    />
                  </div>
                </div>
                {forgotError && <div className="text-[11px] font-semibold" style={{ color: CLAY }}>{forgotError}</div>}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-white text-sm font-semibold font-mono-ui uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5"
                  style={{ backgroundColor: INK }}
                >
                  Send Reset Link
                </button>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="w-full py-2 text-sm font-semibold transition-colors"
                  style={{ color: '#8A8272' }}
                >
                  Back to Login
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(95,122,92,0.15)' }}
                >
                  <CheckCircle2 size={24} style={{ color: SAGE }} />
                </div>
                <h3 className="font-display text-lg" style={{ color: INKTEXT, fontWeight: 500 }}>Check Your Email</h3>
                <p className="text-sm" style={{ color: '#8A8272' }}>
                  We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
                </p>
                <button
                  onClick={() => { setShowForgotPassword(false); setForgotSuccess(false) }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-white text-sm font-semibold font-mono-ui uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5"
                  style={{ backgroundColor: INK }}
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Auth