import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Mail, Lock, User, ArrowRight, X } from 'lucide-react';

const Login = ({ onClose }) => {
    const { login } = useCart();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock authentication
        login({
            name: isLogin ? (formData.email.split('@')[0]) : formData.name,
            email: formData.email
        });
        if (onClose) onClose();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            padding: '2rem'
        }}>
            <div className="glass-morphism animate-fade-in sm:p-12" style={{
                width: '100%',
                maxWidth: '450px',
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '1.5rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
                <div style={{ position: 'relative' }}>
                    {onClose && (
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                right: '-1.5rem',
                                top: '-1.5rem',
                                background: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                color: '#64748b'
                            }}
                        >
                            <X size={18} />
                        </button>
                    )}
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.75rem' }}>
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p style={{ color: '#64748b' }}>
                            {isLogin ? 'Enter your details to access your account' : 'Join our exclusive brand collection today'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {!isLogin && (
                        <div style={{ position: 'relative' }}>
                            <User style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1rem 0.875rem 3rem',
                                    borderRadius: '0.75rem',
                                    border: '1px solid #e2e8f0',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    )}

                    <div style={{ position: 'relative' }}>
                        <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem 0.875rem 3rem',
                                borderRadius: '0.75rem',
                                border: '1px solid #e2e8f0',
                                outline: 'none',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem 0.875rem 3rem',
                                borderRadius: '0.75rem',
                                border: '1px solid #e2e8f0',
                                outline: 'none',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        fontSize: '1.1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem'
                    }}>
                        {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={20} />
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', color: '#64748b' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary)',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
