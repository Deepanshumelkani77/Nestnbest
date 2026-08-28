import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import assets from '../assets/assets'
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
  { code: '+93', country: 'Afghanistan', countryCode: 'af' },
  { code: '+355', country: 'Albania', countryCode: 'al' },
  { code: '+213', country: 'Algeria', countryCode: 'dz' },
  { code: '+1', country: 'American Samoa', countryCode: 'as' },
  { code: '+376', country: 'Andorra', countryCode: 'ad' },
  { code: '+244', country: 'Angola', countryCode: 'ao' },
  { code: '+1', country: 'Anguilla', countryCode: 'ai' },
  { code: '+1', country: 'Antigua and Barbuda', countryCode: 'ag' },
  { code: '+54', country: 'Argentina', countryCode: 'ar' },
  { code: '+374', country: 'Armenia', countryCode: 'am' },
  { code: '+297', country: 'Aruba', countryCode: 'aw' },
  { code: '+61', country: 'Australia', countryCode: 'au' },
  { code: '+43', country: 'Austria', countryCode: 'at' },
  { code: '+994', country: 'Azerbaijan', countryCode: 'az' },
  { code: '+1', country: 'Bahamas', countryCode: 'bs' },
  { code: '+973', country: 'Bahrain', countryCode: 'bh' },
  { code: '+880', country: 'Bangladesh', countryCode: 'bd' },
  { code: '+1', country: 'Barbados', countryCode: 'bb' },
  { code: '+375', country: 'Belarus', countryCode: 'by' },
  { code: '+32', country: 'Belgium', countryCode: 'be' },
  { code: '+501', country: 'Belize', countryCode: 'bz' },
  { code: '+229', country: 'Benin', countryCode: 'bj' },
  { code: '+1', country: 'Bermuda', countryCode: 'bm' },
  { code: '+975', country: 'Bhutan', countryCode: 'bt' },
  { code: '+591', country: 'Bolivia', countryCode: 'bo' },
  { code: '+387', country: 'Bosnia and Herzegovina', countryCode: 'ba' },
  { code: '+267', country: 'Botswana', countryCode: 'bw' },
  { code: '+55', country: 'Brazil', countryCode: 'br' },
  { code: '+1', country: 'British Virgin Islands', countryCode: 'vg' },
  { code: '+673', country: 'Brunei', countryCode: 'bn' },
  { code: '+359', country: 'Bulgaria', countryCode: 'bg' },
  { code: '+226', country: 'Burkina Faso', countryCode: 'bf' },
  { code: '+257', country: 'Burundi', countryCode: 'bi' },
  { code: '+855', country: 'Cambodia', countryCode: 'kh' },
  { code: '+237', country: 'Cameroon', countryCode: 'cm' },
  { code: '+1', country: 'Canada', countryCode: 'ca' },
  { code: '+238', country: 'Cape Verde', countryCode: 'cv' },
  { code: '+1', country: 'Cayman Islands', countryCode: 'ky' },
  { code: '+236', country: 'Central African Republic', countryCode: 'cf' },
  { code: '+235', country: 'Chad', countryCode: 'td' },
  { code: '+56', country: 'Chile', countryCode: 'cl' },
  { code: '+86', country: 'China', countryCode: 'cn' },
  { code: '+57', country: 'Colombia', countryCode: 'co' },
  { code: '+269', country: 'Comoros', countryCode: 'km' },
  { code: '+242', country: 'Congo', countryCode: 'cg' },
  { code: '+243', country: 'Congo DR', countryCode: 'cd' },
  { code: '+682', country: 'Cook Islands', countryCode: 'ck' },
  { code: '+506', country: 'Costa Rica', countryCode: 'cr' },
  { code: '+385', country: 'Croatia', countryCode: 'hr' },
  { code: '+53', country: 'Cuba', countryCode: 'cu' },
  { code: '+599', country: 'Curaçao', countryCode: 'cw' },
  { code: '+357', country: 'Cyprus', countryCode: 'cy' },
  { code: '+420', country: 'Czech Republic', countryCode: 'cz' },
  { code: '+45', country: 'Denmark', countryCode: 'dk' },
  { code: '+253', country: 'Djibouti', countryCode: 'dj' },
  { code: '+1', country: 'Dominica', countryCode: 'dm' },
  { code: '+1', country: 'Dominican Republic', countryCode: 'do' },
  { code: '+593', country: 'Ecuador', countryCode: 'ec' },
  { code: '+20', country: 'Egypt', countryCode: 'eg' },
  { code: '+503', country: 'El Salvador', countryCode: 'sv' },
  { code: '+240', country: 'Equatorial Guinea', countryCode: 'gq' },
  { code: '+291', country: 'Eritrea', countryCode: 'er' },
  { code: '+372', country: 'Estonia', countryCode: 'ee' },
  { code: '+251', country: 'Ethiopia', countryCode: 'et' },
  { code: '+500', country: 'Falkland Islands', countryCode: 'fk' },
  { code: '+298', country: 'Faroe Islands', countryCode: 'fo' },
  { code: '+679', country: 'Fiji', countryCode: 'fj' },
  { code: '+358', country: 'Finland', countryCode: 'fi' },
  { code: '+33', country: 'France', countryCode: 'fr' },
  { code: '+594', country: 'French Guiana', countryCode: 'gf' },
  { code: '+689', country: 'French Polynesia', countryCode: 'pf' },
  { code: '+241', country: 'Gabon', countryCode: 'ga' },
  { code: '+220', country: 'Gambia', countryCode: 'gm' },
  { code: '+995', country: 'Georgia', countryCode: 'ge' },
  { code: '+49', country: 'Germany', countryCode: 'de' },
  { code: '+233', country: 'Ghana', countryCode: 'gh' },
  { code: '+350', country: 'Gibraltar', countryCode: 'gi' },
  { code: '+30', country: 'Greece', countryCode: 'gr' },
  { code: '+299', country: 'Greenland', countryCode: 'gl' },
  { code: '+1', country: 'Grenada', countryCode: 'gd' },
  { code: '+1', country: 'Guadeloupe', countryCode: 'gp' },
  { code: '+1', country: 'Guam', countryCode: 'gu' },
  { code: '+502', country: 'Guatemala', countryCode: 'gt' },
  { code: '+44', country: 'Guernsey', countryCode: 'gg' },
  { code: '+224', country: 'Guinea', countryCode: 'gn' },
  { code: '+245', country: 'Guinea-Bissau', countryCode: 'gw' },
  { code: '+592', country: 'Guyana', countryCode: 'gy' },
  { code: '+509', country: 'Haiti', countryCode: 'ht' },
  { code: '+504', country: 'Honduras', countryCode: 'hn' },
  { code: '+852', country: 'Hong Kong', countryCode: 'hk' },
  { code: '+36', country: 'Hungary', countryCode: 'hu' },
  { code: '+354', country: 'Iceland', countryCode: 'is' },
  { code: '+91', country: 'India', countryCode: 'in' },
  { code: '+62', country: 'Indonesia', countryCode: 'id' },
  { code: '+98', country: 'Iran', countryCode: 'ir' },
  { code: '+964', country: 'Iraq', countryCode: 'iq' },
  { code: '+353', country: 'Ireland', countryCode: 'ie' },
  { code: '+44', country: 'Isle of Man', countryCode: 'im' },
  { code: '+972', country: 'Israel', countryCode: 'il' },
  { code: '+39', country: 'Italy', countryCode: 'it' },
  { code: '+1', country: 'Jamaica', countryCode: 'jm' },
  { code: '+81', country: 'Japan', countryCode: 'jp' },
  { code: '+44', country: 'Jersey', countryCode: 'je' },
  { code: '+962', country: 'Jordan', countryCode: 'jo' },
  { code: '+7', country: 'Kazakhstan', countryCode: 'kz' },
  { code: '+254', country: 'Kenya', countryCode: 'ke' },
  { code: '+686', country: 'Kiribati', countryCode: 'ki' },
  { code: '+965', country: 'Kuwait', countryCode: 'kw' },
  { code: '+996', country: 'Kyrgyzstan', countryCode: 'kg' },
  { code: '+856', country: 'Laos', countryCode: 'la' },
  { code: '+371', country: 'Latvia', countryCode: 'lv' },
  { code: '+961', country: 'Lebanon', countryCode: 'lb' },
  { code: '+266', country: 'Lesotho', countryCode: 'ls' },
  { code: '+231', country: 'Liberia', countryCode: 'lr' },
  { code: '+218', country: 'Libya', countryCode: 'ly' },
  { code: '+423', country: 'Liechtenstein', countryCode: 'li' },
  { code: '+370', country: 'Lithuania', countryCode: 'lt' },
  { code: '+352', country: 'Luxembourg', countryCode: 'lu' },
  { code: '+853', country: 'Macau', countryCode: 'mo' },
  { code: '+389', country: 'North Macedonia', countryCode: 'mk' },
  { code: '+261', country: 'Madagascar', countryCode: 'mg' },
  { code: '+265', country: 'Malawi', countryCode: 'mw' },
  { code: '+60', country: 'Malaysia', countryCode: 'my' },
  { code: '+960', country: 'Maldives', countryCode: 'mv' },
  { code: '+223', country: 'Mali', countryCode: 'ml' },
  { code: '+356', country: 'Malta', countryCode: 'mt' },
  { code: '+692', country: 'Marshall Islands', countryCode: 'mh' },
  { code: '+596', country: 'Martinique', countryCode: 'mq' },
  { code: '+222', country: 'Mauritania', countryCode: 'mr' },
  { code: '+230', country: 'Mauritius', countryCode: 'mu' },
  { code: '+262', country: 'Mayotte', countryCode: 'yt' },
  { code: '+52', country: 'Mexico', countryCode: 'mx' },
  { code: '+691', country: 'Micronesia', countryCode: 'fm' },
  { code: '+373', country: 'Moldova', countryCode: 'md' },
  { code: '+377', country: 'Monaco', countryCode: 'mc' },
  { code: '+976', country: 'Mongolia', countryCode: 'mn' },
  { code: '+382', country: 'Montenegro', countryCode: 'me' },
  { code: '+1', country: 'Montserrat', countryCode: 'ms' },
  { code: '+212', country: 'Morocco', countryCode: 'ma' },
  { code: '+258', country: 'Mozambique', countryCode: 'mz' },
  { code: '+95', country: 'Myanmar', countryCode: 'mm' },
  { code: '+264', country: 'Namibia', countryCode: 'na' },
  { code: '+674', country: 'Nauru', countryCode: 'nr' },
  { code: '+977', country: 'Nepal', countryCode: 'np' },
  { code: '+31', country: 'Netherlands', countryCode: 'nl' },
  { code: '+599', country: 'Netherlands Antilles', countryCode: 'an' },
  { code: '+687', country: 'New Caledonia', countryCode: 'nc' },
  { code: '+64', country: 'New Zealand', countryCode: 'nz' },
  { code: '+505', country: 'Nicaragua', countryCode: 'ni' },
  { code: '+227', country: 'Niger', countryCode: 'ne' },
  { code: '+234', country: 'Nigeria', countryCode: 'ng' },
  { code: '+683', country: 'Niue', countryCode: 'nu' },
  { code: '+1', country: 'Northern Mariana Islands', countryCode: 'mp' },
  { code: '+47', country: 'Norway', countryCode: 'no' },
  { code: '+968', country: 'Oman', countryCode: 'om' },
  { code: '+92', country: 'Pakistan', countryCode: 'pk' },
  { code: '+680', country: 'Palau', countryCode: 'pw' },
  { code: '+970', country: 'Palestine', countryCode: 'ps' },
  { code: '+507', country: 'Panama', countryCode: 'pa' },
  { code: '+675', country: 'Papua New Guinea', countryCode: 'pg' },
  { code: '+595', country: 'Paraguay', countryCode: 'py' },
  { code: '+51', country: 'Peru', countryCode: 'pe' },
  { code: '+63', country: 'Philippines', countryCode: 'ph' },
  { code: '+48', country: 'Poland', countryCode: 'pl' },
  { code: '+351', country: 'Portugal', countryCode: 'pt' },
  { code: '+1', country: 'Puerto Rico', countryCode: 'pr' },
  { code: '+974', country: 'Qatar', countryCode: 'qa' },
  { code: '+40', country: 'Romania', countryCode: 'ro' },
  { code: '+7', country: 'Russia', countryCode: 'ru' },
  { code: '+250', country: 'Rwanda', countryCode: 'rw' },
  { code: '+590', country: 'Saint Barthélemy', countryCode: 'bl' },
  { code: '+1', country: 'Saint Kitts and Nevis', countryCode: 'kn' },
  { code: '+1', country: 'Saint Lucia', countryCode: 'lc' },
  { code: '+590', country: 'Saint Martin', countryCode: 'mf' },
  { code: '+508', country: 'Saint Pierre and Miquelon', countryCode: 'pm' },
  { code: '+1', country: 'Saint Vincent and the Grenadines', countryCode: 'vc' },
  { code: '+685', country: 'Samoa', countryCode: 'ws' },
  { code: '+378', country: 'San Marino', countryCode: 'sm' },
  { code: '+239', country: 'Sao Tome and Principe', countryCode: 'st' },
  { code: '+966', country: 'Saudi Arabia', countryCode: 'sa' },
  { code: '+221', country: 'Senegal', countryCode: 'sn' },
  { code: '+381', country: 'Serbia', countryCode: 'rs' },
  { code: '+248', country: 'Seychelles', countryCode: 'sc' },
  { code: '+232', country: 'Sierra Leone', countryCode: 'sl' },
  { code: '+65', country: 'Singapore', countryCode: 'sg' },
  { code: '+1', country: 'Sint Maarten', countryCode: 'sx' },
  { code: '+421', country: 'Slovakia', countryCode: 'sk' },
  { code: '+386', country: 'Slovenia', countryCode: 'si' },
  { code: '+677', country: 'Solomon Islands', countryCode: 'sb' },
  { code: '+252', country: 'Somalia', countryCode: 'so' },
  { code: '+27', country: 'South Africa', countryCode: 'za' },
  { code: '+500', country: 'South Georgia and the South Sandwich Islands', countryCode: 'gs' },
  { code: '+82', country: 'South Korea', countryCode: 'kr' },
  { code: '+211', country: 'South Sudan', countryCode: 'ss' },
  { code: '+34', country: 'Spain', countryCode: 'es' },
  { code: '+94', country: 'Sri Lanka', countryCode: 'lk' },
  { code: '+249', country: 'Sudan', countryCode: 'sd' },
  { code: '+597', country: 'Suriname', countryCode: 'sr' },
  { code: '+47', country: 'Svalbard and Jan Mayen', countryCode: 'sj' },
  { code: '+46', country: 'Sweden', countryCode: 'se' },
  { code: '+41', country: 'Switzerland', countryCode: 'ch' },
  { code: '+963', country: 'Syria', countryCode: 'sy' },
  { code: '+886', country: 'Taiwan', countryCode: 'tw' },
  { code: '+992', country: 'Tajikistan', countryCode: 'tj' },
  { code: '+255', country: 'Tanzania', countryCode: 'tz' },
  { code: '+66', country: 'Thailand', countryCode: 'th' },
  { code: '+670', country: 'Timor-Leste', countryCode: 'tl' },
  { code: '+228', country: 'Togo', countryCode: 'tg' },
  { code: '+690', country: 'Tokelau', countryCode: 'tk' },
  { code: '+676', country: 'Tonga', countryCode: 'to' },
  { code: '+1', country: 'Trinidad and Tobago', countryCode: 'tt' },
  { code: '+216', country: 'Tunisia', countryCode: 'tn' },
  { code: '+90', country: 'Turkey', countryCode: 'tr' },
  { code: '+993', country: 'Turkmenistan', countryCode: 'tm' },
  { code: '+1', country: 'Turks and Caicos Islands', countryCode: 'tc' },
  { code: '+688', country: 'Tuvalu', countryCode: 'tv' },
  { code: '+971', country: 'UAE', countryCode: 'ae' },
  { code: '+44', country: 'UK', countryCode: 'gb' },
  { code: '+1', country: 'USA', countryCode: 'us' },
  { code: '+380', country: 'Ukraine', countryCode: 'ua' },
  { code: '+598', country: 'Uruguay', countryCode: 'uy' },
  { code: '+998', country: 'Uzbekistan', countryCode: 'uz' },
  { code: '+678', country: 'Vanuatu', countryCode: 'vu' },
  { code: '+58', country: 'Venezuela', countryCode: 've' },
  { code: '+84', country: 'Vietnam', countryCode: 'vn' },
  { code: '+1', country: 'Virgin Islands (British)', countryCode: 'vg' },
  { code: '+1', country: 'Virgin Islands (US)', countryCode: 'vi' },
  { code: '+681', country: 'Wallis and Futuna', countryCode: 'wf' },
  { code: '+967', country: 'Yemen', countryCode: 'ye' },
  { code: '+260', country: 'Zambia', countryCode: 'zm' },
  { code: '+263', country: 'Zimbabwe', countryCode: 'zw' },
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

  // Signup email OTP states
  const [emailOtpSent, setEmailOtpSent] = useState(false)
  const [emailOtp, setEmailOtp] = useState('')
  const [emailOtpVerified, setEmailOtpVerified] = useState(false)
  const [showEmailOtpVerificationModal, setShowEmailOtpVerificationModal] = useState(false)

  // Login email OTP states
  const [loginEmailOtpSent, setLoginEmailOtpSent] = useState(false)
  const [loginEmailOtp, setLoginEmailOtp] = useState('')
  const [loginEmailOtpVerified, setLoginEmailOtpVerified] = useState(false)
  const [showLoginEmailOtpVerificationModal, setShowLoginEmailOtpVerificationModal] = useState(false)

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
    firstName: '',
    middleName: '',
    lastName: '',
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
      const fullName = `${signupData.firstName} ${signupData.middleName} ${signupData.lastName}`.trim()
      if (signupData.firstName && signupData.lastName && signupData.email && signupData.phone && signupData.password) {
        const userData = {
          id: Date.now(),
          name: fullName,
          email: signupData.email,
          phone: signupData.phone,
          role: selectedRole,
          avatar: `https://ui-avatars.com/api/?name=${fullName.replace(/\s/g, '+')}&background=${INK.replace('#', '')}&color=fff`,
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

  const sendLoginEmailOtp = () => {
    setOtpError('')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(loginData.email)) {
      setOtpError('Please enter a valid email address first')
      return
    }
    setLoginEmailOtp('')
    console.log('Sending OTP to login email:', loginData.email)
    setLoginEmailOtpSent(true)
    setShowLoginEmailOtpVerificationModal(true)
  }

  const verifyLoginEmailOtp = () => {
    setOtpError('')
    if (loginEmailOtp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP')
      return
    }
    console.log('Verifying login email OTP:', loginEmailOtp)
    setLoginEmailOtpVerified(true)
    setShowLoginEmailOtpVerificationModal(false)
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
            <img src={assets.logo2} alt="Nestnbest" className="h-10 w-auto" />
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
                <div>
                  <label
                    className="block text-[10px] font-semibold tracking-[0.14em] uppercase font-mono-ui mb-1.5"
                    style={{ color: '#8A8272' }}
                  >
                    Email address
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative flex items-center border-b-2" style={{ borderColor: PAPER_LINE }}>
                      <Mail size={16} className="mr-3 flex-shrink-0" style={{ color: '#A39A85' }} />
                      <input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        placeholder="you@example.com"
                        required
                        className="w-full bg-transparent py-2.5 pr-8 outline-none text-sm placeholder-[#B2A98F]"
                        style={{ color: INKTEXT }}
                      />
                    </div>
                    {!loginEmailOtpVerified && (
                      <button
                        type="button"
                        onClick={sendLoginEmailOtp}
                        disabled={loginEmailOtpSent}
                        className="px-3 py-2 text-white text-xs font-semibold font-mono-ui uppercase tracking-wide rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: INK }}
                      >
                        {loginEmailOtpSent ? 'Sent' : 'Send OTP'}
                      </button>
                    )}
                    {loginEmailOtpVerified && (
                      <div
                        className="px-3 py-2 text-xs font-semibold font-mono-ui uppercase tracking-wide rounded-md flex items-center gap-1"
                        style={{ backgroundColor: 'rgba(95,122,92,0.15)', color: SAGE }}
                      >
                        <CheckCircle2 size={12} />
                        Verified
                      </div>
                    )}
                  </div>
                  {otpError && <div className="text-[11px] font-semibold mt-1.5" style={{ color: CLAY }}>{otpError}</div>}
                </div>

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

                {/* Social Login Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px" style={{ backgroundColor: PAPER_LINE }} />
                  <span className="text-xs text-[#8A8272] font-medium">or continue with</span>
                  <div className="flex-1 h-px" style={{ backgroundColor: PAPER_LINE }} />
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border-2 transition-all duration-200 hover:bg-slate-50"
                    style={{ borderColor: PAPER_LINE }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border-2 transition-all duration-200 hover:bg-slate-50"
                    style={{ borderColor: PAPER_LINE }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border-2 transition-all duration-200 hover:bg-slate-50"
                    style={{ borderColor: PAPER_LINE }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#F58529"/>
                        <stop offset="25%" stop-color="#DD2A7F"/>
                        <stop offset="50%" stop-color="#8134AF"/>
                        <stop offset="75%" stop-color="#515BD4"/>
                      </linearGradient>
                      <path fill="url(#instagram-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </button>
                </div>
              </form>
            ) : (
              /* ---- Signup Form ---- */
              <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                <div>
                
                  <div className="grid grid-cols-3 gap-2">
                    <div className="relative flex items-center border-b-2" style={{ borderColor: PAPER_LINE }}>
                      <input
                        type="text"
                        name="firstName"
                        value={signupData.firstName}
                        onChange={handleSignupChange}
                        placeholder="First name *"
                        required
                        className="w-full bg-transparent py-2.5 outline-none text-sm placeholder-[#B2A98F]"
                        style={{ color: INKTEXT }}
                      />
                    </div>
                    <div className="relative flex items-center border-b-2" style={{ borderColor: PAPER_LINE }}>
                      <input
                        type="text"
                        name="middleName"
                        value={signupData.middleName}
                        onChange={handleSignupChange}
                        placeholder="Middle name"
                        className="w-full bg-transparent py-2.5 outline-none text-sm placeholder-[#B2A98F]"
                        style={{ color: INKTEXT }}
                      />
                    </div>
                    <div className="relative flex items-center border-b-2" style={{ borderColor: PAPER_LINE }}>
                      <input
                        type="text"
                        name="lastName"
                        value={signupData.lastName}
                        onChange={handleSignupChange}
                        placeholder="Last name*"
                        required
                        className="w-full bg-transparent py-2.5 outline-none text-sm placeholder-[#B2A98F]"
                        style={{ color: INKTEXT }}
                      />
                    </div>
                  </div>
                </div>

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

                {/* Social Signup Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px" style={{ backgroundColor: PAPER_LINE }} />
                  <span className="text-xs text-[#8A8272] font-medium">or continue with</span>
                  <div className="flex-1 h-px" style={{ backgroundColor: PAPER_LINE }} />
                </div>

                {/* Social Signup Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border-2 transition-all duration-200 hover:bg-slate-50"
                    style={{ borderColor: PAPER_LINE }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border-2 transition-all duration-200 hover:bg-slate-50"
                    style={{ borderColor: PAPER_LINE }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border-2 transition-all duration-200 hover:bg-slate-50"
                    style={{ borderColor: PAPER_LINE }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <linearGradient id="instagram-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#F58529"/>
                        <stop offset="25%" stop-color="#DD2A7F"/>
                        <stop offset="50%" stop-color="#8134AF"/>
                        <stop offset="75%" stop-color="#515BD4"/>
                      </linearGradient>
                      <path fill="url(#instagram-gradient-2)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Login Email OTP Verification Modal */}
      {showLoginEmailOtpVerificationModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(21,36,32,0.6)' }}
            onClick={() => setShowLoginEmailOtpVerificationModal(false)}
          />
          <div
            className="relative w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl p-6 border"
            style={{ borderColor: PAPER_LINE }}
          >
            <button
              onClick={() => setShowLoginEmailOtpVerificationModal(false)}
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
                {loginData.email}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2 justify-center">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={loginEmailOtp[index] || ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      if (value) {
                        const newOtp = loginEmailOtp.split('')
                        newOtp[index] = value
                        setLoginEmailOtp(newOtp.join(''))
                        if (index < 5) {
                          e.target.nextElementSibling?.focus()
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !loginEmailOtp[index] && index > 0) {
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
                onClick={verifyLoginEmailOtp}
                className="w-full py-3 text-white text-sm font-semibold font-mono-ui uppercase tracking-wide rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: INK }}
              >
                Verify
              </button>

              <button
                type="button"
                onClick={() => setShowLoginEmailOtpVerificationModal(false)}
                className="w-full py-2 text-xs font-semibold transition-all hover:opacity-70"
                style={{ color: '#8A8272' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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