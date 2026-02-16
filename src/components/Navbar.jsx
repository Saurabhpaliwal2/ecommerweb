import React from 'react';
import { ShoppingCart, Package, Menu, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = ({ onCartClick, onProductsClick, onHomeClick, onLoginClick }) => {
    const { cartCount, user, logout } = useCart();

    return (
        <nav className="glass-morphism sticky top-0 z-50 py-4">
            <div className="container flex items-center justify-between" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div
                    onClick={onHomeClick}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
                >
                    <div style={{
                        background: 'var(--primary)',
                        padding: '0.5rem',
                        borderRadius: '0.75rem',
                        color: 'white'
                    }}>
                        <Package size={24} />
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', margin: 0 }}>EcommersWeb</h1>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div className="nav-links" style={{ display: 'flex', gap: '1.5rem' }}>
                        <button onClick={onHomeClick} className="btn btn-ghost" style={{ fontWeight: 600 }}>Home</button>
                        <button onClick={onProductsClick} className="btn btn-ghost" style={{ fontWeight: 600 }}>All Products</button>
                        <button className="btn btn-ghost" style={{ fontWeight: 600 }}>Categories</button>
                    </div>

                    <button
                        onClick={onCartClick}
                        className="btn btn-primary"
                        style={{ position: 'relative', padding: '0.6rem 1.2rem' }}
                    >
                        <ShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-5px',
                                background: 'var(--secondary)',
                                color: 'white',
                                fontSize: '0.75rem',
                                width: '1.25rem',
                                height: '1.25rem',
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
                        <span style={{ marginLeft: '0.5rem', fontWeight: 600 }}>Cart</span>
                    </button>

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
            </div>
        </nav>
    );
};

export default Navbar;
