import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/format';

const Cart = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            justifyContent: 'flex-end',
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)'
        }}>
            <div className="animate-fade-in" style={{
                width: '100%',
                maxWidth: '450px',
                background: 'white',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '-10px 0 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ShoppingBag size={20} /> Your Cart
                    </h2>
                    <button onClick={onClose} className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    {cart.length === 0 ? (
                        <div style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#94a3b8',
                            gap: '1rem'
                        }}>
                            <ShoppingBag size={64} strokeWidth={1} />
                            <p>Your cart is empty</p>
                            <button onClick={onClose} className="btn btn-primary">Start Shopping</button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {cart.map((item) => (
                                <div key={item.id} style={{ display: 'flex', gap: '1rem' }}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{ width: '80px', height: '80px', borderRadius: '0.75rem', objectFit: 'cover' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <h4 style={{ fontWeight: 600 }}>{item.name}</h4>
                                            <button onClick={() => removeFromCart(item.id)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>{formatINR(item.price)}</p>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '0.5rem', padding: '0.25rem' }}>
                                                <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer' }}>
                                                    <Minus size={14} />
                                                </button>
                                                <span style={{ width: '2rem', textAlign: 'center', fontWeight: 600, fontSize: '0.875rem' }}>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer' }}>
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <span style={{ fontWeight: 700, marginLeft: 'auto' }}>
                                                {formatINR(item.price * item.quantity)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div style={{ padding: '2rem', borderTop: '1px solid var(--border)', background: '#f8fafc' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <span style={{ color: '#64748b', fontWeight: 500 }}>Subtotal</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{formatINR(cartTotal)}</span>
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                            Checkout Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
