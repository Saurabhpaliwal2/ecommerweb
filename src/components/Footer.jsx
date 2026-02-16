import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ background: '#0f172a', color: 'white', padding: '4rem 0 2rem 0', marginTop: '4rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem' }}>EcommersWeb</h3>
                        <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>The best place to find premium electronics, apparel, and lifestyle accessories. Quality first, always.</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#94a3b8' }}>
                            <li>Shop All</li>
                            <li>Featured</li>
                            <li>New Arrivals</li>
                            <li>Offers</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Customer Care</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#94a3b8' }}>
                            <li>Support Center</li>
                            <li>Shipping Info</li>
                            <li>Terms of Service</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Connect With Us</h4>
                        <div style={{ display: 'flex', gap: '1rem', color: '#94a3b8' }}>
                            <Facebook size={20} style={{ cursor: 'pointer' }} />
                            <Twitter size={20} style={{ cursor: 'pointer' }} />
                            <Instagram size={20} style={{ cursor: 'pointer' }} />
                            <Mail size={20} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                </div>
                <div style={{ paddingTop: '2rem', borderTop: '1px solid #1e293b', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
                    &copy; {new Date().getFullYear()} EcommersWeb. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
