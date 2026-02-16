import React, { useState, useMemo } from 'react';
import productsData from '../data/products.json';
import ProductCard from './ProductCard';

const ProductSection = ({ title, products, onSelectProduct, color }) => {
    if (products.length === 0) return null;

    return (
        <div style={{ marginBottom: '5rem' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '2rem',
                borderBottom: `2px solid ${color || 'var(--primary)'}`,
                paddingBottom: '0.5rem'
            }}>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>{title}</h3>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>{products.length} Products</span>
            </div>
            <div className="product-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem'
            }}>
                {products.slice(0, 4).map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={onSelectProduct}
                    />
                ))}
            </div>
            {products.length > 4 && (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button className="btn btn-ghost" style={{ fontWeight: 700, fontSize: '0.9rem', color: color }}>
                        View All {title}
                    </button>
                </div>
            )}
        </div>
    );
};

const ProductList = ({ onSelectProduct }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [visibleCount, setVisibleCount] = useState(12);

    const categories = useMemo(() => {
        const cats = ['All', ...new Set(productsData.map(p => p.category))];
        return cats;
    }, []);

    const brands = useMemo(() => {
        const b = ['All', ...new Set(productsData.map(p => p.brand))];
        return b;
    }, []);

    const filteredProducts = useMemo(() => {
        return productsData.filter(p => {
            const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
            const brandMatch = selectedBrand === 'All' || p.brand === selectedBrand;
            return categoryMatch && brandMatch;
        });
    }, [selectedCategory, selectedBrand]);

    const sectionedData = useMemo(() => {
        const groups = {};
        productsData.forEach(p => {
            if (!groups[p.category]) groups[p.category] = [];
            groups[p.category].push(p);
        });
        return groups;
    }, []);

    const categoryColors = {
        'Electronics': '#6366f1',
        'Apparel': '#ec4899',
        'Footwear': '#f59e0b',
        'Gadgets': '#10b981',
        'Accessories': '#8b5cf6',
        'Furniture': '#64748b',
        'Photography': '#0ea5e9',
        'Home Decor': '#f43f5e'
    };

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setVisibleCount(12);
        // If not 'All', scroll to the specific section or keep the filter view
    };

    const handleBrandChange = (brand) => {
        setSelectedBrand(brand);
        setVisibleCount(12);
    };

    return (
        <section id="products-section" className="container py-12">
            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', background: 'linear-gradient(to right, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    The Brand Collection
                </h2>
                <p style={{ color: '#64748b', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
                    Discover our exceptionally curated marketplace. Organised by category and premium brands.
                </p>
            </div>

            {/* Filter Controls - Sticky for better experience */}
            <div className="glass-morphism" style={{
                position: 'sticky',
                top: '90px',
                zIndex: 40,
                padding: '1.5rem',
                borderRadius: '1.5rem',
                marginBottom: '4rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
            }}>
                <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-ghost'}`}
                                style={{
                                    borderRadius: '2rem',
                                    padding: '0.5rem 1.25rem',
                                    fontSize: '0.875rem',
                                    fontWeight: 700,
                                    border: selectedCategory === cat ? 'none' : '1px solid #e2e8f0'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                    {brands.map(brand => (
                        <button
                            key={brand}
                            onClick={() => handleBrandChange(brand)}
                            style={{
                                padding: '0.4rem 1rem',
                                borderRadius: '0.75rem',
                                border: '1px solid',
                                borderColor: selectedBrand === brand ? 'var(--primary)' : 'var(--border)',
                                background: selectedBrand === brand ? 'var(--primary)' : 'white',
                                color: selectedBrand === brand ? 'white' : '#64748b',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: selectedBrand === brand ? '0 4px 6px -1px rgba(99, 102, 241, 0.4)' : 'none'
                            }}
                        >
                            {brand}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Logic: If All categories are selected, show sections. Otherwise show filtered grid. */}
            {selectedCategory === 'All' && selectedBrand === 'All' ? (
                <div>
                    {Object.entries(sectionedData).map(([cat, products]) => (
                        <ProductSection
                            key={cat}
                            title={cat}
                            color={categoryColors[cat]}
                            products={products}
                            onSelectProduct={onSelectProduct}
                        />
                    ))}
                </div>
            ) : (
                <div style={{ minHeight: '600px' }}>
                    <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Search Results</h3>
                        <span className="badge badge-primary">{filteredProducts.length} items found</span>
                    </div>
                    <div className="product-grid">
                        {filteredProducts.slice(0, visibleCount).map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onSelect={onSelectProduct}
                            />
                        ))}
                    </div>
                    {visibleCount < filteredProducts.length && (
                        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                            <button
                                onClick={() => setVisibleCount(prev => prev + 12)}
                                className="btn btn-primary"
                                style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}
                            >
                                Load More Products
                            </button>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default ProductList;
