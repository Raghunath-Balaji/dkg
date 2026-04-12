"use client";
import React, { useState } from 'react';

// --- TYPES ---
type Product = {
    id: number | string;
    type: 'product';
    name: string;
    cat: string;
    price: string;
    img: string;
    grid: string;
    desc: string;
};

type Testimonial = {
    id: string;
    type: 'testimonial';
    text: string;
    author: string;
    grid: string;
};

type Specimen = Product | Testimonial;

// --- DATA ---
const SPECIMENS: Specimen[] = [
    { 
        id: 1, 
        type: 'product',
        name: "Monstera Adansonii", 
        cat: "CLIMBER", 
        price: "$24", 
        img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=1200&q=80", 
        grid: "span 2 / span 2",
        desc: "Instant jungle vibes with Swiss-cheese leaves. Thrives in indirect light and adds vertical architectural interest to any sanctuary."
    },
    { 
        id: 2, 
        type: 'product',
        name: "Clay Vessel", 
        cat: "HARDWARE", 
        price: "$32", 
        img: "https://images.unsplash.com/photo-1485955900006-10f4d324d445?w=800&q=80", 
        grid: "span 1 / span 1",
        desc: "Hand-thrown porous clay vessel designed for optimal root aeration and a timeless earthy aesthetic."
    },
    { 
        id: 3, 
        type: 'product',
        name: "Brass Mist", 
        cat: "TOOLS", 
        price: "$18", 
        img: "https://images.unsplash.com/photo-1599591143896-19349969843c?w=800&q=80", 
        grid: "span 1 / span 1",
        desc: "Ultra-fine hydration for tropical ferns. High-polished brass that patinas beautifully over time."
    },
    { 
        id: 'quote',
        type: 'testimonial',
        text: "“DK Greens isn't just a shop; it’s a study in how we live alongside nature.”",
        author: "Architectural Digest",
        grid: "span 1 / span 2"
    },
    { 
        id: 4, 
        type: 'product',
        name: "Snake Plant", 
        cat: "INTERIOR", 
        price: "$21", 
        img: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=800&q=80", 
        grid: "span 1 / span 2",
        desc: "The architectural 'Sansevieria'. Virtually indestructible, it acts as a structural centerpiece for minimalist interiors."
    },
    { 
        id: 5, 
        type: 'product',
        name: "Bonsai Kit", 
        cat: "ZEN", 
        price: "$45", 
        img: "https://images.unsplash.com/photo-1589152121163-f074fa4bcc38?w=800&q=80", 
        grid: "span 2 / span 1",
        desc: "A complete curation for the meditative gardener. Includes carbon-steel shears and organic nutrient soil."
    },
    { 
        id: 6, 
        type: 'product',
        name: "Velvet Alocasia", 
        cat: "RARE", 
        price: "$58", 
        img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80", // Alternative leaf texture
        grid: "span 1 / span 1",
        desc: "Deep obsidian leaves with a velvet-touch texture. A centerpiece for high-end botanical collections."
    },
    { 
        id: 7, 
        type: 'product',
        name: "Glass Cloche", 
        cat: "DISPLAY", 
        price: "$38", 
        img: "https://images.unsplash.com/photo-1520412099561-648319751e54?w=800&q=80", 
        grid: "span 1 / span 1",
        desc: "Hand-blown glass dome for humidity retention and micro-climate control for delicate ferns."
    },
    { 
        id: 8, 
        type: 'product',
        name: "Organic Feed", 
        cat: "CARE", 
        price: "$12", 
        img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80", 
        grid: "span 2 / span 2",
        desc: "Slow-release nutrients formulated from kelp and organic minerals to support deep green foliage growth."
    }
];
export default function ProductShowcase() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const s = {
        section: { backgroundColor: '#FCF9F1', padding: '140px 0', color: '#2D463E', width: '100%', fontFamily: 'serif' },
        container: { width: '92%', maxWidth: '1600px', margin: '0 auto' },
        grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '420px', gap: '40px' },
        card: (gridArea: string) => ({
            gridArea, position: 'relative' as 'relative', borderRadius: '50px', overflow: 'hidden',
            display: 'flex', flexDirection: 'column' as 'column', justifyContent: 'flex-end',
            padding: '45px', cursor: 'pointer', backgroundColor: '#F2EFE4'
        }),
        overlay: { position: 'absolute' as 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(45, 70, 62, 0.85) 0%, transparent 60%)', zIndex: 1 },
        quoteCard: {
            gridColumn: 'span 1', gridRow: 'span 2', backgroundColor: 'transparent',
            border: '1px solid rgba(45, 70, 62, 0.1)', borderRadius: '50px', padding: '50px',
            display: 'flex', flexDirection: 'column' as 'column', justifyContent: 'center', color: '#2D463E'
        },
        modalBackdrop: {
            position: 'fixed' as 'fixed', inset: 0, backgroundColor: 'rgba(45, 70, 62, 0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20000, padding: '40px'
        },
        modalContent: {
            backgroundColor: '#2D463E', width: '100%', maxWidth: '1100px', borderRadius: '50px',
            display: 'flex', overflow: 'hidden', color: '#FCF9F1', boxShadow: '0 30px 60px rgba(0,0,0,0.3)'
        }
    };

    return (
        <section style={s.section}>
            <div style={s.container}>
                <header style={{ marginBottom: '100px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ maxWidth: '600px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.4em', color: '#8B9D83', textTransform: 'uppercase', display: 'block', marginBottom: '15px' }}>
                            The Specimen Gallery
                        </span>
                        <h2 style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: '0.9', margin: 0, fontWeight: '900', fontStyle: 'italic', letterSpacing: '-0.04em' }}>
                            Rooted in <br/> Purpose.
                        </h2>
                    </div>
                </header>

                <div style={s.grid}>
                    {SPECIMENS.map((p) => {
                        if (p.type === 'testimonial') {
                            return (
                                <div key={p.id} style={s.quoteCard}>
                                    <h3 style={{ fontSize: '32px', lineHeight: '1.2', fontStyle: 'italic', marginBottom: '30px' }}>{p.text}</h3>
                                    <span style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', color: '#8B9D83' }}>— {p.author}</span>
                                </div>
                            );
                        }

                        return (
                            <div key={p.id} onClick={() => setSelectedProduct(p)} style={s.card(p.grid)}>
                                <img src={p.img} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} alt={p.name} />
                                <div style={s.overlay} />
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <h4 style={{ fontSize: '36px', fontWeight: '900', margin: '0 0 15px 0', fontStyle: 'italic', color: '#FCF9F1' }}>{p.name}</h4>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedProduct && (
                <div style={s.modalBackdrop} onClick={() => setSelectedProduct(null)}>
                    <div style={s.modalContent} onClick={(e) => e.stopPropagation()}>
                        {/* Image Left */}
                        <div style={{ flex: 1, position: 'relative', height: '600px' }}>
                            <img src={selectedProduct.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={selectedProduct.name} />
                        </div>
                        {/* Text Right */}
                        <div style={{ flex: 1, padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '3px', color: '#8B9D83', marginBottom: '20px' }}>
                                {selectedProduct.cat} — {selectedProduct.price}
                            </span>
                            <h3 style={{ fontSize: '56px', fontWeight: '900', fontStyle: 'italic', margin: '0 0 30px 0', lineHeight: '1' }}>{selectedProduct.name}</h3>
                            <p style={{ fontSize: '16px', lineHeight: '1.8', opacity: 0.8, marginBottom: '50px', maxWidth: '400px' }}>{selectedProduct.desc}</p>
                            <a href="https://amazon.com" target="_blank" style={{ backgroundColor: '#FCF9F1', color: '#2D463E', padding: '20px 40px', borderRadius: '100px', fontWeight: '900', textDecoration: 'none', textAlign: 'center', width: 'fit-content', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '2px' }}>
                                View on Amazon
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}