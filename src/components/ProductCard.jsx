import React from 'react';
import { Plus, Star, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/format';

const ProductCard = ({ product, onSelect }) => {
    const { addToCart } = useCart();

    return (
        <div className="glass-morphism animate-fade-in product-card" style={{
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease',
            height: '100%',
            position: 'relative'
        }}>
            <div
                onClick={() => onSelect(product)}
                style={{ position: 'relative', height: '240px', overflow: 'hidden', cursor: 'pointer' }}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="product-image"
                />
                <div className="overlay" style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.2)',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.3s ease'
                }}>
                    <div style={{ background: 'white', padding: '0.75rem', borderRadius: '50%', color: 'var(--primary)' }}>
                        <Eye size={24} />
                    </div>
                </div>
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    zIndex: 1
                }}>
                    <Star size={14} fill="var(--accent)" color="var(--accent)" />
                    4.5
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', display: 'block' }}>
                    {product.brand}
                </span>
                <h3
                    onClick={() => onSelect(product)}
                    style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', cursor: 'pointer' }}
                >
                    {product.name}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem', flex: 1 }}>{product.description}</p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)' }}>
                        {formatINR(product.price)}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="btn btn-primary"
                        style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}
                        title="Add to Cart"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
