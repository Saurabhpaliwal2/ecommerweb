import React, { useState } from 'react';
import { ShoppingCart, Package, Menu, User, LogOut, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = ({ onCartClick, onProductsClick, onHomeClick, onLoginClick }) => {
    const { cartCount, user, logout } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="glass-morphism sticky top-0 z-50 py-3 lg:py-4">
            <div className="container flex items-center justify-between" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div
                    onClick={() => {
                        onHomeClick();
                        setIsMenuOpen(false);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
                >
                    <div style={{
                        background: 'var(--primary)',
                        padding: '0.4rem',
                        borderRadius: '0.6rem',
                        color: 'white'
                    }}>
                        <Package size={20} />
                    </div>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)', margin: 0 }}>EcommersWeb</h1>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Desktop Navigation */}
                    <div className="mobile-hidden" style={{ gap: '1.5rem', alignItems: 'center' }}>
                        <button onClick={onHomeClick} className="btn btn-ghost" style={{ fontWeight: 600 }}>Home</button>
                        <button onClick={onProductsClick} className="btn btn-ghost" style={{ fontWeight: 600 }}>All Products</button>
                        <button className="btn btn-ghost" style={{ fontWeight: 600 }}>Categories</button>
                    </div>

                    <button
                        onClick={onCartClick}
                        className="btn btn-primary"
                        style={{ position: 'relative', padding: '0.5rem 1rem' }}
                    >
                        <ShoppingCart size={18} />
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-5px',
                                background: 'var(--secondary)',
                                color: 'white',
                                fontSize: '0.7rem',
                                width: '1.1rem',
                                height: '1.1rem',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                border: '2px solid white'
                            }}>
                                {cartCount}
                            </span>
                        )}
                        <span className="mobile-hidden" style={{ marginLeft: '0.5rem', fontWeight: 600 }}>Cart</span>
                    </button>

                    <div className="mobile-hidden">
                        {user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '0.5rem', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ background: '#f1f5f9', padding: '0.4rem', borderRadius: '50%' }}>
                                        <User size={18} color="#64748b" />
                                    </div>
                                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>{user.name}</span>
                                </div>
                                <button onClick={logout} className="btn btn-ghost" style={{ padding: '0.5rem', color: '#ef4444' }} title="Logout">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={onLoginClick}
                                className="btn btn-ghost"
                                style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                <User size={20} />
                                Sign In
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="btn btn-ghost lg:hidden"
                        style={{ padding: '0.5rem', display: 'flex', alignItems: 'center' }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isMenuOpen && (
                <div className="mobile-menu animate-fade-in lg:hidden">
                    <button onClick={() => { onHomeClick(); setIsMenuOpen(false); }} className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>Home</button>
                    <button onClick={() => { onProductsClick(); setIsMenuOpen(false); }} className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>All Products</button>
                    <button className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>Categories</button>
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                        {user ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <User size={20} color="#64748b" />
                                    <span style={{ fontWeight: 600 }}>{user.name}</span>
                                </div>
                                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="btn btn-ghost" style={{ justifyContent: 'flex-start', color: '#ef4444' }}>
                                    <LogOut size={20} /> Sign Out
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="btn btn-primary" style={{ width: '100%' }}>
                                <User size={20} /> Sign In
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
