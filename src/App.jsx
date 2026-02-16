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
          padding: '8rem 0',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Abstract background shapes */}
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(60px)' }}></div>
          <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(40px)' }}></div>

          <div className="container animate-fade-in" style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Exclusive Brand <br /> Collection.
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '650px', margin: '0 auto 3rem auto' }}>
              Discover our exclusively curated collection of high-end gear, lifestyle accessories, and premium apparel designed for the modern user.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <button onClick={scrollToProducts} className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Explore Products
              </button>
              <button className="btn" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.3)', padding: '1rem 2.5rem', fontSize: '1.1rem', backdropFilter: 'blur(10px)' }}>
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
          <div className="glass-morphism animate-fade-in" onClick={e => e.stopPropagation()} style={{
            background: 'white',
            width: '100%',
            maxWidth: '1000px',
            borderRadius: '1.5rem',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            maxHeight: '90vh'
          }}>
            <div style={{ flex: 1, position: 'relative', background: '#f8fafc' }}>
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

            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>
                {selectedProduct.brand}
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>{selectedProduct.name}</h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800 }}>{formatINR(selectedProduct.price)}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Star fill="var(--accent)" color="var(--accent)" size={20} />
                  <span style={{ fontWeight: 600 }}>4.8 (124 reviews)</span>
                </div>
              </div>

              <p style={{ color: '#64748b', fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                {selectedProduct.description} This premium product is crafted with the highest quality materials and attention to detail, ensuring durability and style for years to come.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#10b981' }}>
                  <ShieldCheck size={20} />
                  <span style={{ fontWeight: 500 }}>2 Year Warranty Included</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#6366f1' }}>
                  <Truck size={20} />
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
                style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem' }}
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
