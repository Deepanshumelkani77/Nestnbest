import React from 'react'
import { Calculator, Home, Paintbrush, TrendingUp, Lightbulb, ArrowRight, DollarSign, FileText, BarChart3, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'

const TOOLS = [
  {
    id: 1,
    title: 'EMI Calculator',
    description: 'Calculate your monthly EMI for home loans with our easy-to-use calculator',
    icon: Calculator,
    color: '#193C06',
    bgColor: 'rgba(25, 60, 6, 0.1)',
    popular: true,
  },
  {
    id: 2,
    title: 'Best Home Loan Offers',
    description: 'Compare and find the best home loan interest rates from top banks',
    icon: DollarSign,
    color: '#1E88E5',
    bgColor: 'rgba(30, 136, 229, 0.1)',
    popular: true,
  },
  {
    id: 3,
    title: 'Interior Budget Estimator',
    description: 'Estimate your interior design budget for your dream home',
    icon: Paintbrush,
    color: '#9333EA',
    bgColor: 'rgba(147, 51, 234, 0.1)',
    popular: false,
  },
  {
    id: 4,
    title: 'Rates & Trends',
    description: 'Stay updated with the latest property rates and market trends',
    icon: TrendingUp,
    color: '#DC2626',
    bgColor: 'rgba(220, 38, 38, 0.1)',
    popular: true,
  },
  {
    id: 5,
    title: 'Research Insights',
    description: 'Get expert insights and analysis on real estate market conditions',
    icon: Lightbulb,
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    popular: false,
  },
  {
    id: 6,
    title: 'Property Valuation',
    description: 'Get an estimated value of your property based on market data',
    icon: Home,
    color: '#059669',
    bgColor: 'rgba(5, 150, 105, 0.1)',
    popular: false,
  },
  {
    id: 7,
    title: 'Rent vs Buy Calculator',
    description: 'Decide whether to rent or buy based on your financial situation',
    icon: BarChart3,
    color: '#7C3AED',
    bgColor: 'rgba(124, 58, 237, 0.1)',
    popular: false,
  },
  {
    id: 8,
    title: 'Area Converter',
    description: 'Convert property area between different units easily',
    icon: FileText,
    color: '#0891B2',
    bgColor: 'rgba(8, 145, 178, 0.1)',
    popular: false,
  },
]

const ToolCard = ({ tool }) => {
  const Icon = tool.icon
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: tool.bgColor }}
          >
            <Icon size={28} style={{ color: tool.color }} />
          </div>
          {tool.popular && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
              <Sparkles size={12} />
              Popular
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-2">{tool.title}</h3>
        <p className="text-sm text-slate-500 mb-4 leading-relaxed">{tool.description}</p>

        <button
          className="flex items-center gap-2 text-sm font-semibold transition-colors duration-200 hover:gap-3"
          style={{ color: tool.color }}
        >
          Use Tool
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

const Tools = () => {
  const scrollRef = React.useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Real Estate Tools</h2>
            <p className="text-slate-500">Powerful tools to help you make informed property decisions</p>
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg" style={{ backgroundColor: '#193C06' }}>
            View All Tools
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} className="text-slate-600" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-8"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {TOOLS.map((tool) => (
              <div key={tool.id} className="snap-start">
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} className="text-slate-600" />
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default Tools
