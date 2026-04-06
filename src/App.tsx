/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import {
  Star,
  CircleDollarSign,
  Clock,
  BadgeCheck,
  ShoppingCart,
  ArrowRight,
  Share2,
  Globe,
  Mail,
  Heart,
  Menu as MenuIcon,
  X
} from 'lucide-react';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'best-sellers', label: 'Best Sellers' },
  { id: 'menu', label: 'Menu' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'testimonials', label: 'Testimonials' },
];

function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/menu') {
      setActiveSection('menu');
      return;
    }

    const handleScroll = () => {
      if (location.pathname !== '/') return;
      
      const scrollPosition = window.scrollY + 100;

      for (let i = navLinks.length - 1; i >= 0; i--) {
        if (navLinks[i].id === 'menu') continue;
        const section = document.getElementById(navLinks[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (id === 'menu') {
      navigate('/menu');
      setActiveSection('menu');
      return;
    }

    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav bg-[#fff8f3]/80 dark:bg-[#1f1b14]/80 transition-all duration-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-8 py-4 w-full">
        <div className="text-xl md:text-2xl font-headline font-bold text-primary dark:text-primary-container z-50">
          The Artisanal Digital Bakery
        </div>
        <div className="hidden lg:flex items-center gap-8 font-label font-medium tracking-tight">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleClick(e, link.id)}
                className={`transition-all duration-300 ${
                  isActive
                    ? 'text-primary dark:text-primary-container border-b-2 border-primary-container pb-1'
                    : 'text-white drop-shadow-md opacity-90 hover:text-primary hover:opacity-100'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={() => navigate('/menu')}
            className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2 rounded-xl font-bold active:scale-95 transition-all duration-200 shadow-lg shadow-primary/10"
          >
            Order Now
          </button>
        </div>
        <div className="lg:hidden flex items-center z-50">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-primary p-2 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full left-0 w-full bg-surface shadow-xl border-t border-outline-variant/20 py-4 px-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleClick(e, link.id)}
                className={`text-lg font-label font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-primary dark:text-primary-container font-bold'
                    : 'text-on-surface hover:text-primary'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/menu');
            }}
            className="mt-4 bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-3 rounded-xl font-bold active:scale-95 transition-all duration-200 shadow-lg w-full"
          >
            Order Now
          </button>
        </motion.div>
      )}
    </nav>
  );
}

function Hero() {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-[100vh] md:min-h-[921px] flex items-center overflow-hidden px-6 lg:px-20 py-24 md:py-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="z-10 order-2 lg:order-1 mt-10 lg:mt-0"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-sm font-bold tracking-wider mb-6">
            ESTABLISHED 1984
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-headline font-bold text-on-surface leading-[1.1] mb-6">
            Fresh, Affordable, and <span className="text-primary">Made with Love</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-on-surface-variant max-w-lg mb-10 leading-relaxed">
            Premium quality bakery for everyone, from coffee shops to families. Experience the warmth
            of tradition in every bite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/menu')}
              className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:opacity-90 transition-all w-full sm:w-auto"
            >
              Order Now
            </button>
            <button 
              onClick={() => navigate('/menu')}
              className="bg-surface-container-high text-on-surface px-8 py-4 rounded-xl font-bold text-lg hover:bg-surface-container-highest transition-all w-full sm:w-auto"
            >
              Lihat Menu
            </button>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative order-1 lg:order-2 max-w-md md:max-w-lg lg:max-w-none mx-auto w-full"
        >
          <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-2xl z-0">
            <img
              className="w-full h-full object-cover"
              alt="close-up of golden brown artisan sourdough bread and assorted pastries on a rustic wooden table with soft morning sunlight"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2YzekZ-3d-gXD3_Tw8LWe5-E8bXgex0pRlwmg5zDaiPGfYlT3t5-wUiddw_2Ll573gFmYs3F5nmytQs4UAyjkZkLS5geef7r5iPrqeEmHF-yGKSzQJPsC7kDsjjT88zUCe7UCQBRUdcrhlKKbdY2zfO_1EjdTnwkmfYHV2IGeabpfh0lXCtU4xI2JspYX6_WmWibsisJ4qtyKVptrwg36BoMDAQ1g8ZHfM8HLqoyk7Jc7VPtBm51I8NZITB_P6npU9cUXcc0IikU"
              referrerPolicy="no-referrer"
            />
          </div>
          <div
            className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 bg-surface-container-lowest p-4 md:p-6 rounded-xl shadow-2xl flex items-center gap-3 md:gap-4 border border-outline-variant/10 max-w-[250px] md:max-w-xs animate-bounce"
            style={{ animationDuration: '3s' }}
          >
            <Star className="text-secondary-fixed-dim scale-125 md:scale-150 fill-current" />
            <div>
              <p className="font-bold text-primary text-sm md:text-base">Top Rated 2024</p>
              <p className="text-xs text-on-surface-variant">Favorite local patisserie</p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="absolute top-0 right-0 -z-10 w-full lg:w-1/2 h-full bg-surface-container-low asymmetric-clip opacity-50"></div>
    </section>
  );
}

function ValueProposition() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  const item = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, type: "spring", bounce: 0.4 } }
  };

  return (
    <section className="py-24 bg-surface-container-low">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div variants={item} className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CircleDollarSign className="text-primary text-3xl w-8 h-8" />
            </div>
            <h3 className="text-xl font-headline font-bold mb-3">Affordable Prices</h3>
            <p className="text-on-surface-variant">
              Premium taste that doesn't break the bank. Quality for all.
            </p>
          </motion.div>
          <motion.div variants={item} className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Clock className="text-secondary text-3xl w-8 h-8" />
            </div>
            <h3 className="text-xl font-headline font-bold mb-3">Fresh Daily</h3>
            <p className="text-on-surface-variant">
              Baked at dawn, delivered by noon. Always oven-fresh.
            </p>
          </motion.div>
          <motion.div variants={item} className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-primary-fixed-dim flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BadgeCheck className="text-on-primary-fixed-variant text-3xl w-8 h-8" />
            </div>
            <h3 className="text-xl font-headline font-bold mb-3">Trusted Quality</h3>
            <p className="text-on-surface-variant">
              HACCP certified kitchen with the finest ingredients.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function BestSellers() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  const item = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="best-sellers" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <span className="text-primary font-label font-bold uppercase tracking-widest text-sm mb-4 block">
              Crowd Favorites
            </span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Best Sellers</h2>
          </div>
          <a
            className="text-primary font-bold border-b-2 border-primary-fixed pb-1 hover:border-primary transition-all"
            href="#"
          >
            View full menu
          </a>
        </motion.div>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {/* Product Card 1 */}
          <motion.div variants={item} className="group bg-surface-container-lowest rounded-xl p-4 transition-all duration-300 hover:translate-y-[-8px] hover:shadow-[0_20px_40px_-12px_rgba(31,27,20,0.1)]">
            <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/5]">
              <span className="absolute top-4 left-4 z-10 bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight">
                Paling Laris
              </span>
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="luxury chocolate cupcakes with gold leaf decoration and swirling buttercream frosting on a porcelain plate"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCorU6PVVeq7eSveEyGqLQVFpsP3twONyfB1YRH6LOi178okyaexJmEPCVyaDjSbtvlC7ht7Wk0d95qwFVAoSefv0iTDAKMB1B2LucmJRLLLgVTii9rzp_94YgNwsldmM_A0brPj7g8LLSQiv_Nv7lQqGbPEwG0VaW6QapSWbDVPuH0jxFypOWiFgQeNIObEQZCevNSF95PBV57e8PdeniRSPvB-b4GwKZ5uUbHw665AJsWombgp6kwPt1Hq9TOJHr7u88-JFvzk8"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="px-2">
              <h4 className="text-xl font-headline font-bold mb-1">Double Choco Ganache</h4>
              <p className="text-on-surface-variant text-sm mb-4">
                Rich Belgian chocolate with silky smooth ganache.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold text-lg">Rp 25.000</span>
                <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
          {/* Product Card 2 */}
          <motion.div variants={item} className="group bg-surface-container-lowest rounded-xl p-4 transition-all duration-300 hover:translate-y-[-8px] hover:shadow-[0_20px_40px_-12px_rgba(31,27,20,0.1)]">
            <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/5]">
              <span className="absolute top-4 left-4 z-10 bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight">
                Favorit
              </span>
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="close-up of buttery flaky croissants arranged on a linen napkin with light dusting of flour"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACeDEa4gRAuo75D350wHg-IckYyhvgDFu1LOJ-2IkZuKZWMPFeNjJm9NnV5lOVODEms0UiwYQjLhSxoCgq76zYbFAHbM8U5aODcd6yVvhkepqSrKBRgdNCarl8ldigCReJ1ZreU7E34MYpNaAsolqae7BLmtFg9RlcJpcDNd7_rTK8dwjyc-JiZkCvWl4vbXH0L5Y8XDCvx58yJbTAylOCsBg9JdSnweOqRF9q3km_vBN6a-vYHUQO_qFAA6xwSZ8q9omv42JnP-I"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="px-2">
              <h4 className="text-xl font-headline font-bold mb-1">Classic Butter Croissant</h4>
              <p className="text-on-surface-variant text-sm mb-4">
                A thousand layers of pure French butter flaky perfection.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold text-lg">Rp 18.000</span>
                <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
          {/* Product Card 3 */}
          <motion.div variants={item} className="group bg-surface-container-lowest rounded-xl p-4 transition-all duration-300 hover:translate-y-[-8px] hover:shadow-[0_20px_40px_-12px_rgba(31,27,20,0.1)]">
            <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/5]">
              <span className="absolute top-4 left-4 z-10 bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight">
                New Release
              </span>
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="fresh strawberry tart with vanilla cream and glossy fruit glaze on a white marble background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2KzIDQauIc8GpyoyqIQ1Rugyydidq0YxJfjZu3T5IiKwQNS2UVtyhBdhd4A1gVG0jrSOJayC2u4fQMT-Oyye4_0C7o7CNm7CETzeqTBTOSTIsD0XEZjqviNigh6AqBfokoFwqkxXFYHTihuGsH27PPdXavT54-oAQ1E4oODCZDxFoRXugh4_8w1Ts7rTRoq3qrfCUr8wdn3mt4yfnsaogwmI5nAsEwLj5myw4y5VmHhmyW6slwjD6ykuJ9P4oGG7dcTlJT-CucSE"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="px-2">
              <h4 className="text-xl font-headline font-bold mb-1">Strawberry Cream Tart</h4>
              <p className="text-on-surface-variant text-sm mb-4">
                Fresh seasonal strawberries on a vanilla cream base.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold text-lg">Rp 32.000</span>
                <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-surface-container overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -60, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img
                className="w-full rounded-2xl aspect-[3/4] object-cover shadow-lg"
                alt="artisan baker kneading dough in a sunlit traditional bakery with flour dusting the air"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX96k_-OrvH7MRMjp9O7Ppv31hiwC0YKEJd-fBY7ftIzJYVT9RZaGylz8fXQqPcJYnMo8TJSfIna9PpiKbrGAdzBnNqyoRjS0BGR32e3uiHa0a4hZTUc7IQxMwZRF-vJj8-oc-U_xnV5djn0nZQLg5Fw8NcyHewjfBSDq441OVjyS4KYBMiFcioLikBNsOiENU-d7_7dQNDsaRzRGnhousXNoEOYoGHD3hKsEby-hb7-xj30OMtPr6oPMMkRZm7lEVpFjbNh8yw2k"
                referrerPolicy="no-referrer"
              />
              <img
                className="w-full rounded-2xl aspect-[3/4] object-cover mt-12 shadow-lg"
                alt="vintage bakery storefront with classic wooden sign and warm yellow window display light"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2v56UFfF8vnorN3RIZ_8iweJi0p6JfAR7kAQO_mAS9rPZqzrso9G1FFY8cPm-rr4sqxbtCtrvE8i273UGE9xAmUVuNLKdJaop4owR234y_w95NU8Dr4m7m6D5tIx8eguh4H0IOI5FZCliNUWa5SwqbILykcBS-mqdA6hdMHo0eDPg1kdGrrGCHQAM1_GxYDAL-ULaYfRUnw02BXDs6-S3mdimUf3Xra4ykJ3wGFe7cV6FdS6AvdjdRcESpNxusPYGOT2K6svX570"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 rounded-full bg-primary-fixed opacity-30 blur-3xl"></div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-primary font-label font-bold uppercase tracking-widest text-sm mb-4 block">
              Our Heritage
            </span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 leading-tight">
              Where Tradition Meets the Digital Age
            </h2>
            <p className="text-lg text-on-surface-variant mb-6 leading-relaxed">
              Founded in a small kitchen in 1984, our journey has always been about one thing: the
              perfect crumb. We've spent decades perfecting family recipes, ensuring that every pastry
              carries the warmth of home.
            </p>
            <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">
              Today, 'The Artisanal Digital Bakery' bridges that heritage with modern accessibility. We
              believe luxury should be approachable, and quality should be consistent—whether you're
              ordering a single donut for your child or five hundred loaves for your hotel.
            </p>
            <button className="flex items-center gap-3 text-primary font-bold group">
              <span>Read our full story</span>
              <ArrowRight className="transition-transform group-hover:translate-x-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };
  const item = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
    show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="gallery" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-headline font-bold mb-4">Captured Moments</h2>
          <p className="text-on-surface-variant">Peek into our kitchen and our storefront</p>
        </motion.div>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <motion.img variants={item}
            className="w-full rounded-xl shadow-md"
            alt="selection of colorful French macarons arranged in a minimalist aesthetic composition"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy7gbxmev5erfpakmowhQ3Q-AxNXvzKxACgYeiI-Tj19XYHmzfd_IDDTkp6kJoZOkYCpSqcUtux6cFrcQTj3VfottAmqSws0vP20OK-OCEa5XjBZePzAplpGCJNBrv6nD6zSdEMlnmSo-XyMG_i_WJ1sF63Jw_FDr6mSx-4eFpCE2tgHnDNCRG0MvtNUHFeM8i3YAQIVK_FQwo5eYFqpWQEJUPVedzQ2_sJBCU4Z4l8CYm9tEN_yFsLrN4kZaYbNu4J95-h_ea9mQ"
            referrerPolicy="no-referrer"
          />
          <motion.img variants={item}
            className="w-full rounded-xl shadow-md"
            alt="overhead view of artisanal bread basket with various shapes and grains on a rustic linen cloth"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIPk-sOQLkKPrR__L6AM-LNMYxdLMZiBN2xU56NDhjpmYkUGuUs0LRYSOU1tkww3Cnuis9N0sVg-Nhfym4pcyOm2zL3X_YIUt9WZtLNgxDorUW3Z03kulaIyewUw0PWDDRZi0HDedU-_A-pa_DRquSel66Be7MemGcqwuDybNLYBbRFtP85yeDTF5jgWS580jRJi9-1JjuXcr6hZfq2Ow5LCtsG1I9QZO7AF_X5IiFPoQ4EKFyMiBL-kY95fvnCMdC3yKPCROwMk4"
            referrerPolicy="no-referrer"
          />
          <motion.img variants={item}
            className="w-full rounded-xl shadow-md"
            alt="beautifully decorated layered chocolate cake with fresh raspberries and dark chocolate shavings"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8BzgzQjM8ZA05-c8W35bWOsNkGABHFvnK17ngOW3b9Qo-MCM2PtLCX8qTj5CpIrRlMlwBr3O_OutHwetWbV9q1TjzByvorFVf9Bmd4f1YyeKedWBTZSs3yOSqHCti4ulA1cssKZY7pPfpz1Xz23Urjvemo0jqdj1JOwkm_aMT6ci_pTx9jpj31jmGMbtyZnZecV4atmfHTROlWPntdvaiiRfZN9qwSzhKdkA3qOS7o9e_Juh-9lHoOxNQJhhuveOo3UxvA4qtmLg"
            referrerPolicy="no-referrer"
          />
          <motion.img variants={item}
            className="w-full rounded-xl shadow-md"
            alt="close-up of freshly baked warm chocolate chip cookies on a cooling rack with melting chocolate"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxqJ7PdNxSLhQxDJ0w7rxzzUAX9lFnBVflOjk98eMX1fhVcYHtYu52wMf2Gf7E6GBIVRoixvAGGE75jnVeD-P79y-AaNYfa0S5TDikOIBC8V1r6hSwezYsdW5ctCtYpPyQOni9NAOb3wikF4irsPAS0l61duSusGYk8Ef3ijiqbj4YifJPPTO7vBcqR2-b0ICdeIxVkjYy-ZBtJhaA0jNNio1oePKxZmg70C24LDdQyWGCGNJQXnFOwxMBs2n8c6v8tAXghY35CMM"
            referrerPolicy="no-referrer"
          />
          <motion.img variants={item}
            className="w-full rounded-xl shadow-md"
            alt="interior of a modern minimalist bakery with soft wooden furniture and minimalist display cases"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB9khNyxmzHGd7nhkDczpYLRYxRMP8_fPhipPSTWH10Kv3K4w-Mkrb7o0HShekRG6tB-60lrBZ9VA6GDbcESmFLfDcliJBwGLTppdRajG5p-8Dy9EzYopFKqDD5wtr0A_neJL3Sp3BK6vVHMfKm1DiEwlR-CKAdIoagWS7AAfwiLRNeLY5CNBc1ZyCwZERIZbY_Kjl_6FTnHygicAAXGIKUmM_h69sCOmtg1VoV9JbZ_KPKRvmj6voZbUH83cHh9en4RgCumnyc6E"
            referrerPolicy="no-referrer"
          />
          <motion.img variants={item}
            className="w-full rounded-xl shadow-md"
            alt="dramatic lighting on freshly baked sourdough bread with visible steam in a dark rustic kitchen"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMhRk8OPJ8k1ThiKt1TIOxCzJIZxlODSG2vhFikOZvfvLtTjwxp-xiAvLToCXDZrvJo8ifhh-3BBwouDsC7JgYNgcReutBmqWVnVoC2yS9wPcsfWLQoaXsA56T9ppNwwWJoQCejFFbUrzXEHt_cCvs0a5eSUFg7LSqzxRZktpE17YwDEsLO2Qp-UB5l-ZdET6559JdB8zgxAnqwMliyNyMgjcUON07zoQZAxsfifp-t6T9R-fqRbjbbgI7TZ5j__s9D2Qqf99YXHA"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  const item = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="testimonials" className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-headline font-bold mb-4">Loved by Families & Partners</h2>
        </motion.div>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <motion.div variants={item} className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/5">
            <div className="flex gap-1 text-secondary mb-6">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <p className="text-on-surface mb-8 italic">
              "Finding a wholesale partner who cares about quality as much as we do was hard. These
              guys are the real deal. Our customers can't get enough of their croissants!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-dim overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="portrait of a smiling middle-aged man in a casual shirt"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB22ZQb6qiWOVdLJXveFdpXzvGcyuKSp9x43PUeHyP6lI4EXnA1OoRUgwc4ZCRnquVYrjG7aNmvYmv_h-pa6_aHPWZJ7Tardwf3yyXDpMoWjtxuEIDSjMZ-x9hKV5KrT9Hin7zrqtf9fZOu2E8R6WF-g0i7E3aQMnAxHSuZxSUx_Wp74Smr3pEUsAErKx6lB8gWxB3R9WxJpVJmgfGBKylw9GWL2YF_h0J7d2sPT9M-RoCEu-jUZS9okjlB8mylifGXKio33B__t5Y"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="font-bold">Budi Santoso</p>
                <p className="text-xs text-on-surface-variant uppercase tracking-wider">
                  Coffee Shop Owner
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={item} className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/5 md:scale-105 z-10">
            <div className="flex gap-1 text-secondary mb-6">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <p className="text-on-surface mb-8 italic">
              "The birthday cakes are spectacular! Not too sweet, just the right amount of
              indulgence. It's become a tradition in our house for every celebration."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-dim overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="portrait of a smiling young woman with long hair"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU8RdrKLWxopUzVtnmsjiO1CTD3e7V_m6HPPE5Plg9jq_6Ua-0wiLDAvFXNg_jFhgNjTJX7zudx0NG26Gr_hFz7hkJvQPwlkFzQqLIImMqWTSheS7o1j2XcgqTS2SZlT2gy7NKUrPjGi7pagWI53l2NV8GQMEU-_X0arlF6PYQ92WIUrCXtP4smuXXr4gnI6cSm7PuPJnK-j4LwvRIrWEVdbn0cTUTXzs5xTp1VEWBEKRzGEUvXjU-55QksxjW7TNTfOxURsH3js8"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="font-bold">Siti Aminah</p>
                <p className="text-xs text-on-surface-variant uppercase tracking-wider">
                  Home Maker
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={item} className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/5">
            <div className="flex gap-1 text-secondary mb-6">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <p className="text-on-surface mb-8 italic">
              "Fast delivery and the packaging keeps everything so fresh. As a busy professional,
              their subscription service is a life saver for my morning breakfasts."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-dim overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="portrait of a young man with a friendly smile"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFAjHZR-gfqzBdsLi2HfrcovvY2tPL1xd060rskm4FWCQ21UtPfWfWh-fX1tD_4EeeIGe9pcUupw8tkwCYgq8vkbfPdOMaY4Mzsi8ZyCe2YtlmLziJVLgT-9zo-xdL36TR6CeZqxXfbYgCbuVPmCsY7dWouoHrFpw5ihsoJjt9HWMqPLtyFLZ3GtsxSusIlC3mZR_Xaas5H1rGvj1SfW7dx6_kJDVOvyAxzRjOe9bQzy_2JC8f-Icajl3197tEY17_N1h5PCMd5aM"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="font-bold">Rendy Wijaya</p>
                <p className="text-xs text-on-surface-variant uppercase tracking-wider">
                  Corporate Manager
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, type: "spring", bounce: 0.5 }}
        className="max-w-5xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-container p-12 lg:p-20 text-center relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-4xl lg:text-5xl font-headline font-bold text-on-primary mb-8 leading-tight">
            Bring the Warmth of Fresh Bread to Your Table
          </h2>
          <p className="text-on-primary/90 text-lg mb-12 max-w-2xl mx-auto">
            Join thousands of happy customers who start their morning with The Artisanal Digital
            Bakery. Freshness delivered to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => navigate('/menu')}
              className="bg-surface text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-surface-bright transition-all shadow-lg"
            >
              Order Now
            </button>
            <button className="border-2 border-on-primary text-on-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-on-primary hover:text-primary transition-all">
              Download App
            </button>
          </div>
        </div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary-container opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-on-primary opacity-10 rounded-full blur-3xl"></div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full rounded-t-[2rem] mt-20 bg-[#fcf2e7] dark:bg-[#251a00] text-[#1f1b14] dark:text-[#fcf2e7]">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start px-12 py-16 gap-12 w-full max-w-7xl mx-auto">
          <div className="max-w-sm">
          <div className="text-xl font-headline font-semibold text-primary mb-6">
            The Artisanal Digital Bakery
          </div>
          <p className="text-[#1f1b14] opacity-70 mb-8 font-body">
            Crafting premium moments through artisanal baking since 1984. Your trusted local partner
            for daily freshness.
          </p>
          <div className="flex gap-4">
            <a
              className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary hover:scale-110 transition-transform"
              href="#"
            >
              <Share2 className="w-5 h-5" />
            </a>
            <a
              className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary hover:scale-110 transition-transform"
              href="#"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary hover:scale-110 transition-transform"
              href="#"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-12 sm:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="font-label text-sm tracking-wide uppercase font-bold text-primary">
              Information
            </h4>
            <a
              className="font-label text-sm tracking-wide uppercase text-[#1f1b14] opacity-60 hover:opacity-100 transition-opacity"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="font-label text-sm tracking-wide uppercase text-[#1f1b14] opacity-60 hover:opacity-100 transition-opacity"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="font-label text-sm tracking-wide uppercase text-[#1f1b14] opacity-60 hover:opacity-100 transition-opacity"
              href="#"
            >
              Contact Us
            </a>
            <a
              className="font-label text-sm tracking-wide uppercase text-[#1f1b14] opacity-60 hover:opacity-100 transition-opacity"
              href="#"
            >
              Shipping Info
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-label text-sm tracking-wide uppercase font-bold text-primary">
              Locations
            </h4>
            <p className="text-[#1f1b14] opacity-60 text-sm">Jakarta Selatan</p>
            <p className="text-[#1f1b14] opacity-60 text-sm">Bandung Central</p>
            <p className="text-[#1f1b14] opacity-60 text-sm">Surabaya East</p>
            <p className="text-[#1f1b14] opacity-60 text-sm">Bali Seminyak</p>
          </div>
        </div>
      </div>
      <div className="border-t border-outline-variant/10 w-full px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <p className="font-label text-sm tracking-wide uppercase text-[#1f1b14] opacity-60">
          © 2024 The Artisanal Digital Bakery. Crafted with devotion.
        </p>
        <div className="flex items-center gap-2 text-primary font-bold">
          <Heart className="w-4 h-4 fill-current" />
          <span className="font-label text-xs tracking-widest uppercase">
            From our oven to your heart
          </span>
        </div>
      </div>
      </motion.div>
    </footer>
  );
}

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <main className="pt-20">
      <Hero />
      <About />
      <ValueProposition />
      <BestSellers />
      <Gallery />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed-variant min-h-screen">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
