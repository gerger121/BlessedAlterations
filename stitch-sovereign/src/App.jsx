import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Scissors,
  Ruler,
  Clock,
  CheckCircle,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Star,
  Sparkles,
  Heart,
  Shirt,
  Calculator,
  BookOpen,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { api } from './api'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-charcoal/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-muted-gold" />
            <span className="font-serif text-xl font-semibold tracking-wide text-ivory">
              Blessed Alterations
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide transition-colors hover:text-muted-gold text-ivory/80"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="px-6 py-2.5 bg-muted-gold text-charcoal text-sm font-medium tracking-wide rounded-none hover:bg-muted-gold/90 transition-colors"
            >
              Book a Fitting
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-ivory"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal border-t border-ivory/10"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-ivory/80 hover:text-muted-gold transition-colors py-2"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-6 py-3 bg-muted-gold text-charcoal font-medium mt-4"
              >
                Book a Fitting
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-charcoal overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B8956B' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center lg:text-left pt-20 lg:pt-0"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 text-muted-gold text-sm tracking-[0.2em] uppercase">
                <span className="w-8 h-px bg-muted-gold" />
                Est. 1987
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-serif text-5xl md:text-6xl lg:text-7xl text-ivory leading-tight mb-6"
            >
              Precision in<br />
              <span className="italic text-muted-gold">Every Stitch</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-ivory/70 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Where master craftsmanship meets modern elegance. Experience bespoke 
              tailoring that transforms fabric into a statement of your individuality.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-muted-gold text-charcoal font-medium tracking-wide hover:bg-ivory transition-colors"
              >
                Book a Fitting
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-ivory/30 text-ivory font-medium tracking-wide hover:bg-ivory/10 transition-colors"
              >
                Explore Services
              </a>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-ivory/10"
            >
              {[
                { value: '35+', label: 'Years Experience' },
                { value: '12K', label: 'Garments Crafted' },
                { value: '100%', label: 'Satisfaction' }
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-serif text-3xl text-muted-gold mb-1">{stat.value}</div>
                  <div className="text-ivory/50 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[3/4] bg-gradient-to-br from-deep-navy to-charcoal rounded-sm overflow-hidden">
              <div className="absolute inset-4 border border-muted-gold/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Shirt className="w-24 h-24 text-muted-gold/40 mx-auto mb-4" />
                  <p className="text-ivory/30 text-sm tracking-wide">Bespoke Excellence</p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -left-6 bottom-20 bg-ivory p-6 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted-gold/20 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-muted-gold" />
                  </div>
                  <div>
                    <div className="font-serif text-charcoal font-semibold">Award Winning</div>
                    <div className="text-charcoal/60 text-sm">Master Tailors</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-ivory/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-muted-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function ServicesSection() {
  const services = [
    {
      icon: Shirt,
      title: 'Bespoke Suits',
      description: 'Handcrafted suits tailored to your exact measurements, style preferences, and lifestyle needs.',
      features: ['Personal consultation', 'Premium fabrics', 'Multiple fittings', 'Lifetime adjustments']
    },
    {
      icon: Heart,
      title: 'Bridal Alterations',
      description: 'Expert alterations ensuring your wedding dress fits perfectly for your special day.',
      features: ['Delicate handling', 'Preservation care', 'Rush services', 'Accessory fitting']
    },
    {
      icon: Sparkles,
      title: 'Wardrobe Styling',
      description: 'Complete wardrobe consultation and styling services to elevate your personal brand.',
      features: ['Style assessment', 'Wardrobe audit', 'Shopping guidance', 'Seasonal updates']
    }
  ]

  return (
    <section id="services" className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 text-muted-gold text-sm tracking-[0.2em] uppercase mb-4"
          >
            <span className="w-8 h-px bg-muted-gold" />
            Our Services
            <span className="w-8 h-px bg-muted-gold" />
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl text-charcoal mb-6"
          >
            Crafted for <span className="italic">Distinction</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-charcoal/60 text-lg max-w-2xl mx-auto"
          >
            From bespoke suits to bridal perfection, our master tailors bring 
            decades of expertise to every stitch.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group bg-white p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-charcoal/5"
            >
              <div className="w-14 h-14 bg-charcoal/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-muted-gold/20 transition-colors">
                <service.icon className="w-7 h-7 text-charcoal group-hover:text-muted-gold transition-colors" />
              </div>
              
              <h3 className="font-serif text-2xl text-charcoal mb-4">{service.title}</h3>
              <p className="text-charcoal/60 mb-6 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-charcoal/70">
                    <CheckCircle className="w-4 h-4 text-muted-gold flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-charcoal font-medium group-hover:text-muted-gold transition-colors"
              >
                Learn More
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const steps = [
    {
      number: '01',
      icon: Phone,
      title: 'Consultation',
      description: 'Begin with a personal consultation to discuss your vision, style preferences, and requirements.'
    },
    {
      number: '02',
      icon: Ruler,
      title: 'Measurement',
      description: 'Precise measurements taken by our master tailors ensure a perfect, comfortable fit.'
    },
    {
      number: '03',
      icon: Scissors,
      title: 'Crafting',
      description: 'Your garment is meticulously handcrafted using premium materials and time-honored techniques.'
    },
    {
      number: '04',
      icon: CheckCircle,
      title: 'Final Fitting',
      description: 'A final fitting ensures every detail is perfect before you take home your masterpiece.'
    }
  ]

  return (
    <section id="process" className="py-24 lg:py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 text-muted-gold text-sm tracking-[0.2em] uppercase mb-4"
          >
            <span className="w-8 h-px bg-muted-gold" />
            Our Process
            <span className="w-8 h-px bg-muted-gold" />
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl text-ivory mb-6"
          >
            How It <span className="italic text-muted-gold">Works</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-ivory/60 text-lg max-w-2xl mx-auto"
          >
            From first consultation to final fitting, experience a seamless journey 
            to your perfect garment.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative"
        >
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-muted-gold/0 via-muted-gold/50 to-muted-gold/0" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={fadeInUp}
                className="relative text-center"
              >
                <div className="relative inline-flex items-center justify-center w-32 h-32 mb-6">
                  <div className="absolute inset-0 border border-muted-gold/30 rounded-full" />
                  <div className="absolute inset-3 bg-charcoal border border-muted-gold/50 rounded-full flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-muted-gold" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-muted-gold text-charcoal text-sm font-semibold rounded-full flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-serif text-xl text-ivory mb-3">{step.title}</h3>
                <p className="text-ivory/50 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <ChevronRight className="w-6 h-6 text-muted-gold/50 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function InteractiveSection() {
  const [activeTab, setActiveTab] = useState('estimator')
  const [selectedService, setSelectedService] = useState('suit')
  const [selectedFabric, setSelectedFabric] = useState('premium')
  const [selectedOptions, setSelectedOptions] = useState([])

  const services = {
    suit: { name: 'Bespoke Suit', base: 1200 },
    shirt: { name: 'Dress Shirt', base: 250 },
    trousers: { name: 'Trousers', base: 350 },
    alterations: { name: 'Alterations', base: 75 }
  }

  const fabrics = {
    standard: { name: 'Standard', multiplier: 1 },
    premium: { name: 'Premium', multiplier: 1.5 },
    luxury: { name: 'Luxury', multiplier: 2.2 }
  }

  const options = [
    { id: 'rush', name: 'Rush Service', price: 150 },
    { id: 'monogram', name: 'Monogramming', price: 50 },
    { id: 'lining', name: 'Custom Lining', price: 100 }
  ]

  const measurements = [
    { name: 'Chest', description: 'Measure around the fullest part of your chest, keeping the tape level.' },
    { name: 'Waist', description: 'Measure around your natural waistline, keeping one finger between tape and body.' },
    { name: 'Hips', description: 'Measure around the fullest part of your hips.' },
    { name: 'Shoulder', description: 'Measure from the edge of one shoulder to the other across your back.' },
    { name: 'Sleeve', description: 'Measure from shoulder seam to wrist with arm slightly bent.' },
    { name: 'Inseam', description: 'Measure from the crotch to the bottom of the ankle.' }
  ]

  const [estimateSaved, setEstimateSaved] = useState(false)
  const [savingEstimate, setSavingEstimate] = useState(false)

  const calculatePrice = () => {
    const base = services[selectedService].base
    const fabricMultiplier = fabrics[selectedFabric].multiplier
    const optionsTotal = selectedOptions.reduce((sum, optId) => {
      const opt = options.find(o => o.id === optId)
      return sum + (opt ? opt.price : 0)
    }, 0)
    return Math.round(base * fabricMultiplier + optionsTotal)
  }

  const toggleOption = (optId) => {
    setSelectedOptions(prev => 
      prev.includes(optId) 
        ? prev.filter(id => id !== optId)
        : [...prev, optId]
    )
    setEstimateSaved(false)
  }

  const saveEstimate = async () => {
    setSavingEstimate(true)
    try {
      await api.saveEstimate({
        service: selectedService,
        fabric: selectedFabric,
        options: selectedOptions,
        estimated_price: calculatePrice()
      })
      setEstimateSaved(true)
    } catch (error) {
      console.error('Failed to save estimate:', error)
    } finally {
      setSavingEstimate(false)
    }
  }

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 text-muted-gold text-sm tracking-[0.2em] uppercase mb-4"
          >
            <span className="w-8 h-px bg-muted-gold" />
            Interactive Tools
            <span className="w-8 h-px bg-muted-gold" />
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl text-charcoal mb-6"
          >
            Plan Your <span className="italic">Experience</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-charcoal/5 p-1 rounded-sm">
            <button
              onClick={() => setActiveTab('estimator')}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all ${
                activeTab === 'estimator'
                  ? 'bg-charcoal text-ivory'
                  : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Price Estimator
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all ${
                activeTab === 'guide'
                  ? 'bg-charcoal text-ivory'
                  : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Measurement Guide
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'estimator' ? (
            <motion.div
              key="estimator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white p-8 lg:p-12 shadow-sm border border-charcoal/5">
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-3">
                        Select Service
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(services).map(([key, service]) => (
                          <button
                            key={key}
                            onClick={() => setSelectedService(key)}
                            className={`p-4 text-left border transition-all ${
                              selectedService === key
                                ? 'border-muted-gold bg-muted-gold/5'
                                : 'border-charcoal/10 hover:border-charcoal/30'
                            }`}
                          >
                            <div className="font-medium text-charcoal">{service.name}</div>
                            <div className="text-sm text-charcoal/50">From ${service.base}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-3">
                        Fabric Quality
                      </label>
                      <div className="flex gap-3">
                        {Object.entries(fabrics).map(([key, fabric]) => (
                          <button
                            key={key}
                            onClick={() => setSelectedFabric(key)}
                            className={`flex-1 py-3 px-4 text-sm font-medium border transition-all ${
                              selectedFabric === key
                                ? 'border-muted-gold bg-muted-gold text-charcoal'
                                : 'border-charcoal/10 text-charcoal/70 hover:border-charcoal/30'
                            }`}
                          >
                            {fabric.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-3">
                        Additional Options
                      </label>
                      <div className="space-y-3">
                        {options.map((option) => (
                          <label
                            key={option.id}
                            className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                              selectedOptions.includes(option.id)
                                ? 'border-muted-gold bg-muted-gold/5'
                                : 'border-charcoal/10 hover:border-charcoal/30'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={selectedOptions.includes(option.id)}
                                onChange={() => toggleOption(option.id)}
                                className="w-4 h-4 accent-muted-gold"
                              />
                              <span className="text-charcoal">{option.name}</span>
                            </div>
                            <span className="text-charcoal/50">+${option.price}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center lg:items-start lg:pl-12 lg:border-l border-charcoal/10">
                    <div className="text-center lg:text-left">
                      <p className="text-charcoal/50 text-sm mb-2">Estimated Price</p>
                      <div className="font-serif text-6xl text-charcoal mb-4">
                        ${calculatePrice().toLocaleString()}
                      </div>
                      <p className="text-charcoal/50 text-sm mb-8">
                        *Final price may vary based on specific requirements
                      </p>
                      <div className="flex flex-col gap-3">
                        <a
                          href="#contact"
                          onClick={saveEstimate}
                          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-charcoal text-ivory font-medium hover:bg-muted-gold hover:text-charcoal transition-colors"
                        >
                          {savingEstimate ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              Get Exact Quote
                              <ChevronRight className="w-4 h-4" />
                            </>
                          )}
                        </a>
                        {estimateSaved && (
                          <p className="text-green-600 text-sm flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Estimate saved!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="guide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white p-8 lg:p-12 shadow-sm border border-charcoal/5">
                <div className="text-center mb-10">
                  <Ruler className="w-12 h-12 text-muted-gold mx-auto mb-4" />
                  <h3 className="font-serif text-2xl text-charcoal mb-2">
                    How to Take Your Measurements
                  </h3>
                  <p className="text-charcoal/60">
                    For the most accurate fit, have someone assist you with these measurements.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {measurements.map((measurement, index) => (
                    <motion.div
                      key={measurement.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 p-4 bg-ivory/50 rounded-sm"
                    >
                      <div className="w-10 h-10 bg-muted-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-muted-gold font-semibold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-charcoal mb-1">{measurement.name}</h4>
                        <p className="text-sm text-charcoal/60">{measurement.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 text-center">
                  <p className="text-charcoal/50 text-sm mb-4">
                    Prefer professional measurements? Book a fitting with our experts.
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal text-ivory font-medium hover:bg-muted-gold hover:text-charcoal transition-colors"
                  >
                    Schedule Fitting
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "I recommend them 1000%! I had to buy my wedding dress at the last minute, and Blessed Alterations was able to make all the necessary alterations to make my dress perfect the night before my wedding, in just a couple of hours! Thank you so much for your immense help!",
      author: "Nataly Rondon Gamuzza",
      title: "Bride"
    },
    {
      quote: "Great work and attention to detail. Got my items done sooner than the promise date too. Would definitely recommend and use again. Happy Holidays.",
      author: "Deseo",
      title: "Customer"
    },
    {
      quote: "I took 2 pairs of jeans in to be hemmed and they were done within a week. I'm very satisfied with the way my jeans turned out and customer service was wonderful. I highly recommend Blessed Alterations.",
      author: "Linda Sunseri",
      title: "Customer"
    }
  ]

  return (
    <section className="py-24 lg:py-32 bg-deep-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 text-muted-gold text-sm tracking-[0.2em] uppercase mb-4"
          >
            <span className="w-8 h-px bg-muted-gold" />
            Testimonials
            <span className="w-8 h-px bg-muted-gold" />
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl text-ivory"
          >
            Words from Our <span className="italic text-muted-gold">Clients</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.author}
              variants={fadeInUp}
              className="bg-ivory/5 backdrop-blur-sm p-8 border border-ivory/10"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-muted-gold text-muted-gold" />
                ))}
              </div>
              <p className="text-ivory/80 text-lg leading-relaxed mb-6 italic">
                &quot;{testimonial.quote}&quot;
              </p>
              <div>
                <div className="font-medium text-ivory">{testimonial.author}</div>
                <div className="text-ivory/50 text-sm">{testimonial.title}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    service: 'Bespoke Suit',
    message: '',
    rush_order: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await api.createAppointment(formData)
      setSubmitStatus({ type: 'success', message: 'Appointment request submitted successfully! We will contact you soon.' })
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        service: 'Bespoke Suit',
        message: '',
        rush_order: false
      })
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.message || 'Failed to submit. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.span 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-muted-gold text-sm tracking-[0.2em] uppercase mb-4"
            >
              <span className="w-8 h-px bg-muted-gold" />
              Contact Us
            </motion.span>
            <motion.h2 
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl text-charcoal mb-6"
            >
              Begin Your <span className="italic">Journey</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-charcoal/60 text-lg mb-10"
            >
              Ready to experience bespoke tailoring? Schedule a consultation 
              and let us craft something extraordinary for you.
            </motion.p>

            <motion.div variants={fadeInUp} className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-charcoal/5 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-muted-gold" />
                </div>
                <div>
                  <div className="font-medium text-charcoal">Visit Our Shop</div>
                  <div className="text-charcoal/60">12000 SE 82nd Ave, Happy Valley, OR 97086</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-charcoal/5 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-muted-gold" />
                </div>
                <div>
                  <div className="font-medium text-charcoal">Call Us</div>
                  <div className="text-charcoal/60">(971) 717-4555</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-charcoal/5 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-muted-gold" />
                </div>
                <div>
                  <div className="font-medium text-charcoal">Email</div>
                  <div className="text-charcoal/60">appointments@blessedalterations.com</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-charcoal flex items-center justify-center hover:bg-muted-gold transition-colors">
                <Instagram className="w-5 h-5 text-ivory" />
              </a>
              <a href="#" className="w-10 h-10 bg-charcoal flex items-center justify-center hover:bg-muted-gold transition-colors">
                <Facebook className="w-5 h-5 text-ivory" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 lg:p-10 shadow-sm border border-charcoal/5">
              <h3 className="font-serif text-2xl text-charcoal mb-6">Book a Fitting</h3>
              
              {submitStatus && (
                <div className={`mb-6 p-4 flex items-center gap-3 ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitStatus.type === 'success' 
                    ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    : <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  }
                  <span className="text-sm">{submitStatus.message}</span>
                </div>
              )}
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-charcoal/20 focus:border-muted-gold focus:outline-none transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-charcoal/20 focus:border-muted-gold focus:outline-none transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-charcoal/20 focus:border-muted-gold focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-charcoal/20 focus:border-muted-gold focus:outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Service Interest *
                  </label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-charcoal/20 focus:border-muted-gold focus:outline-none transition-colors bg-white"
                  >
                    <option>Bespoke Suit</option>
                    <option>Bridal Alterations</option>
                    <option>Wardrobe Styling</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-charcoal/20 focus:border-muted-gold focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <div className={`p-4 border transition-all cursor-pointer ${
                  formData.rush_order 
                    ? 'border-muted-gold bg-muted-gold/10' 
                    : 'border-charcoal/20 hover:border-charcoal/40'
                }`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rush_order"
                      checked={formData.rush_order}
                      onChange={handleChange}
                      className="w-5 h-5 accent-muted-gold"
                    />
                    <div>
                      <span className="font-medium text-charcoal flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-gold" />
                        Rush Order
                      </span>
                      <p className="text-sm text-charcoal/60 mt-1">
                        Need it faster? Select this option for priority service (additional fees may apply)
                      </p>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-charcoal text-ivory font-medium hover:bg-muted-gold hover:text-charcoal transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Request Appointment'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-charcoal py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <Scissors className="w-6 h-6 text-muted-gold" />
              <span className="font-serif text-xl font-semibold tracking-wide text-ivory">
                Blessed Alterations
              </span>
            </a>
            <p className="text-ivory/50 max-w-sm leading-relaxed">
              Where master craftsmanship meets modern elegance. Bespoke tailoring 
              for those who appreciate the art of fine clothing.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-ivory mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Services', 'Process', 'Pricing', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-ivory/50 hover:text-muted-gold transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-ivory mb-4">Hours</h4>
            <ul className="space-y-3 text-ivory/50 text-sm">
              <li>Mon - Fri: 9am - 7pm</li>
              <li>Saturday: 10am - 5pm</li>
              <li>Sunday: By Appointment</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ivory/40 text-sm">
            &copy; {new Date().getFullYear()} Blessed Alterations. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-ivory/40 hover:text-muted-gold transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-ivory/40 hover:text-muted-gold transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <InteractiveSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App
