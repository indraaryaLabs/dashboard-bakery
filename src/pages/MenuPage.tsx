import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    category: 'Pastries & Croissants',
    items: [
      { name: 'Classic Butter Croissant', price: 'Rp 18.000', description: 'A thousand layers of pure French butter flaky perfection.', image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&q=80&w=400&h=300' },
      { name: 'Almond Croissant', price: 'Rp 25.000', description: 'Twice-baked with sweet almond frangipane and topped with sliced almonds.', image: 'https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&q=80&w=400&h=300' },
      { name: 'Pain au Chocolat', price: 'Rp 22.000', description: 'Classic flaky pastry filled with rich dark chocolate batons.', image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=400&h=300' },
      { name: 'Cinnamon Roll', price: 'Rp 20.000', description: 'Soft, gooey cinnamon roll topped with cream cheese frosting.', image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=400&h=300' },
    ]
  },
  {
    category: 'Artisan Breads',
    items: [
      { name: 'Sourdough Loaf', price: 'Rp 45.000', description: 'Naturally leavened rustic bread with a chewy crust and airy crumb.', image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=400&h=300' },
      { name: 'Whole Wheat Bread', price: 'Rp 35.000', description: 'Healthy and hearty bread made with 100% whole wheat flour.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400&h=300' },
      { name: 'Baguette', price: 'Rp 25.000', description: 'Traditional French baguette with a crisp crust.', image: 'https://images.unsplash.com/photo-1597079910443-60c43fc4f729?auto=format&fit=crop&q=80&w=400&h=300' },
      { name: 'Focaccia', price: 'Rp 30.000', description: 'Italian flatbread topped with olive oil, rosemary, and sea salt.', image: 'https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&q=80&w=400&h=300' },
    ]
  },
  {
    category: 'Cakes & Sweets',
    items: [
      { name: 'Double Choco Ganache Slice', price: 'Rp 35.000', description: 'Rich Belgian chocolate with silky smooth ganache.', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400&h=300' },
      { name: 'Strawberry Cream Tart', price: 'Rp 32.000', description: 'Fresh seasonal strawberries on a vanilla cream base.', image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=400&h=300' },
      { name: 'New York Cheesecake', price: 'Rp 40.000', description: 'Classic dense and creamy cheesecake with a graham cracker crust.', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=400&h=300' },
      { name: 'Tiramisu Cup', price: 'Rp 38.000', description: 'Layers of coffee-soaked ladyfingers and mascarpone cream.', image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=400&h=300' },
    ]
  }
];

export default function MenuPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    order: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format message for WhatsApp
    const message = `*New Order from The Artisanal Digital Bakery*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Address:* ${formData.address}%0A%0A*Order Details:*%0A${formData.order}%0A%0A*Notes:* ${formData.notes}`;
    
    // Replace with actual WhatsApp number
    const whatsappNumber = '6281234567890'; 
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.location.href = whatsappUrl;
  };

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-container transition-colors mb-8 font-bold">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-primary">Our Menu</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            Explore our selection of freshly baked goods. From flaky pastries to hearty artisan breads, everything is made with love and the finest ingredients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Menu List */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-12"
          >
            {menuItems.map((category, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-headline font-bold mb-6 text-primary border-b border-outline-variant/30 pb-2">
                  {category.category}
                </h2>
                <div className="space-y-6">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex gap-4 items-start bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/20 hover:shadow-md transition-shadow">
                      <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-surface-dim">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                          <div className="font-bold text-primary whitespace-nowrap">
                            {item.price}
                          </div>
                        </div>
                        <p className="text-sm text-on-surface-variant line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Order Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-xl border border-outline-variant/10 sticky top-32">
              <h2 className="text-2xl font-headline font-bold mb-2">Place an Order</h2>
              <p className="text-sm text-on-surface-variant mb-8">
                Fill out the form below and we'll direct you to WhatsApp to complete your order.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold mb-1">Phone Number (WhatsApp)</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="081234567890"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-bold mb-1">Delivery Address</label>
                  <textarea 
                    id="address" 
                    name="address" 
                    required
                    value={formData.address}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="Your full delivery address"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="order" className="block text-sm font-bold mb-1">Your Order</label>
                  <textarea 
                    id="order" 
                    name="order" 
                    required
                    value={formData.order}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="E.g., 2x Classic Butter Croissant, 1x Sourdough Loaf"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-bold mb-1">Additional Notes (Optional)</label>
                  <input 
                    type="text" 
                    id="notes" 
                    name="notes" 
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Any special requests?"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <Send className="w-5 h-5" />
                  Order via WhatsApp
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
