import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Login from './components/Login';
import { X, ShoppingCart, Star, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from './context/CartContext';
import { formatINR } from './utils/format';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart, user } = useCart();

  const scrollToProducts = () => {
    const section = document.getElementById('products-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        onProductsClick={scrollToProducts}
        onHomeClick={scrollToHero}
        onLoginClick={() => setIsLoginOpen(true)}
      />

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          padding: '4rem 0',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }} className="lg:py-32">
          {/* Abstract background shapes */}
          <div className="mobile-hidden" style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(60px)' }}></div>
          <div className="mobile-hidden" style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(40px)' }}></div>

          <div className="container animate-fade-in" style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Exclusive Brand <br className="mobile-hidden" /> Collection.
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '650px', margin: '0 auto 2.5rem auto' }} className="lg:text-xl">
              Discover our exclusively curated collection of high-end gear, lifestyle accessories, and premium apparel designed for the modern user.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }} className="sm:flex-row">
              <button onClick={scrollToProducts} className="btn sm:w-auto" style={{ background: 'white', color: 'var(--primary)', width: '100%' }}>
                Explore Products
              </button>
              <button className="btn mobile-hidden" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(10px)' }}>
                Our Story
              </button>
            </div>
          </div>
        </section>

        <ProductList onSelectProduct={setSelectedProduct} />
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="glass-morphism animate-fade-in product-modal-content" onClick={e => e.stopPropagation()} style={{
            background: 'white',
            width: '100%',
            maxWidth: '1000px',
            borderRadius: '1.5rem',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '90vh'
          }}>
            <div style={{ position: 'relative', background: '#f8fafc', height: '300px' }} className="lg:flex-1 lg:h-auto">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="btn btn-ghost"
                style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'white', padding: '0.5rem', borderRadius: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }} className="lg:p-12">
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>
                {selectedProduct.brand}
              </span>
              <h2 style={{ fontWeight: 800, marginBottom: '1rem', fontSize: '1.5rem' }} className="lg:text-4xl">{selectedProduct.name}</h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800 }} className="lg:text-3xl">{formatINR(selectedProduct.price)}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Star fill="var(--accent)" color="var(--accent)" size={18} />
                  <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>4.8 (124 reviews)</span>
                </div>
              </div>

              <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                {selectedProduct.description} This premium product is crafted with highest quality materials.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#10b981', fontSize: '0.9rem' }}>
                  <ShieldCheck size={18} />
                  <span style={{ fontWeight: 500 }}>2 Year Warranty Included</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#6366f1', fontSize: '0.9rem' }}>
                  <Truck size={18} />
                  <span style={{ fontWeight: 500 }}>Free Express Delivery</span>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                  setIsCartOpen(true);
                }}
                className="btn btn-primary"
                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="modal-overlay" onClick={() => setIsLoginOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '450px' }}>
            <Login onClose={() => setIsLoginOpen(false)} />
          </div>
        </div>
      )}

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <Footer />
    </div>
  );
}

export default App;
