"use client";
import React, { useState } from 'react';

// --- ATOMIC CSS: RESTORING THE BENTO RHYTHM ---
const STYLES = `
  .showcase-section { 
    background-color: #FCF9F1; 
    padding: 100px 0; 
    color: #2D463E; 
    width: 100%; 
    font-family: serif; 
    position: relative; 
    z-index: 50; 
    isolation: isolate;
  }
  .showcase-container { width: 92%; max-width: 1600px; margin: 0 auto; }
  
  .showcase-grid { 
    display: grid; 
    grid-template-columns: 1fr; 
    gap: 20px; 
    width: 100%;
  }

  @media (min-width: 1024px) {
    .showcase-grid { 
      grid-template-columns: repeat(3, 1fr); 
      grid-auto-rows: 420px; 
      gap: 40px;
      /* DENSE flow ensures the bento items fill gaps automatically */
      grid-auto-flow: dense; 
    }
    
    /* THE ASYMMETRY ENGINE */
    .span-2-2 { grid-area: span 2 / span 2; }
    .span-1-2 { grid-area: span 2 / span 1; } /* Fixed: 1x2 Portrait */
    .span-2-1 { grid-area: span 1 / span 2; } /* Fixed: 2x1 Landscape */
    .span-1-1 { grid-area: span 1 / span 1; }
  }

  .specimen-card { 
    position: relative; 
    border-radius: 50px; 
    overflow: hidden; 
    display: flex; 
    flex-direction: column; 
    justify-content: flex-end; 
    padding: 45px; 
    cursor: pointer; 
    background-color: #F2EFE4;
    height: 400px;
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  @media (min-width: 1024px) {
    .specimen-card { height: auto; }
    .specimen-card:hover { transform: scale(1.02); }
  }

  .card-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
  .card-overlay { 
    position: absolute; inset: 0; 
    background: linear-gradient(to top, rgba(45, 70, 62, 0.85) 0%, transparent 60%); 
    z-index: 1; pointer-events: none;
  }
  .card-title { position: relative; z-index: 2; color: #FCF9F1; font-size: 36px; font-weight: 900; font-style: italic; margin: 0; pointer-events: none; line-height: 1; }

  .quote-card {
    border: 1px solid rgba(45, 70, 62, 0.1); 
    border-radius: 50px; 
    padding: 50px; 
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    height: 400px;
    background: transparent;
  }
  
  @media (min-width: 1024px) {
    .quote-card { height: auto; }
  }
  
  .quote-text { font-size: 30px; font-style: italic; margin-bottom: 25px; line-height: 1.2; color: #2D463E; }

  .modal-backdrop { 
    position: fixed; inset: 0; 
    background: rgba(45, 70, 62, 0.6); 
    backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center; 
    z-index: 999999; padding: 25px; 
  }
  .modal-box { 
    background: #2D463E; width: 100%; max-width: 1100px; border-radius: 50px; 
    display: flex; flex-direction: column; overflow: hidden; color: #FCF9F1;
    max-height: 85vh; overflow-y: auto; box-shadow: 0 40px 100px rgba(0,0,0,0.4);
  }
  @media (min-width: 768px) { .modal-box { flex-direction: row; overflow: hidden; } }
`;

const SPECIMENS: any[] = [
    { id: 1, type: 'product', name: "Monstera Adansonii", cat: "CLIMBER", price: "$24", img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=1200", grid: "span 2 / span 2", desc: "Swiss-cheese leaves. Thrives in indirect light." },
    { id: 2, type: 'product', name: "Clay Vessel", cat: "HARDWARE", price: "$32", img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=1200", grid: "span 1 / span 1", desc: "Porous clay vessel for optimal root aeration." },
    { id: 3, type: 'product', name: "Brass Mist", cat: "TOOLS", price: "$18", img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800", grid: "span 1 / span 1", desc: "Ultra-fine hydration for tropical ferns." },
    { id: 'quote', type: 'testimonial', text: "“DK Greens isn't just a shop; Dk greens is a powerhouse.”", author: "Rajasekhar", grid: "span 1 / span 2" },
    { id: 4, type: 'product', name: "Snake Plant", cat: "INTERIOR", price: "$21", img: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=800", grid: "span 1 / span 2", desc: "Virtually indestructible architectural centerpiece." },
    { id: 5, type: 'product', name: "Bonsai Kit", cat: "ZEN", price: "$45", img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=1200", grid: "span 2 / span 1", desc: "Complete curation for the meditative gardener." },
    { id: 6, type: 'product', name: "Velvet Alocasia", cat: "RARE", price: "$58", img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800", grid: "span 1 / span 1", desc: "Deep obsidian velvet-touch leaves." },
    { id: 7, type: 'product', name: "Glass Cloche", cat: "DISPLAY", price: "$38", img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=1200", grid: "span 1 / span 1", desc: "Hand-blown glass dome for micro-climate control." },
    { id: 8, type: 'product', name: "Organic Feed", cat: "CARE", price: "$12", img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800", grid: "span 2 / span 2", desc: "Slow-release nutrients formulated from organic minerals." },
    { id: 'more quote', type: 'testimonial', text: "“Rajasekhar saagurappo dayalu kaadhula edho sonnan enna sonnan nu yaarukavadhu theiryuma?”", author: "Thalaivar", grid: "span 1 / span 2" },
    { id: 9, type: 'product', name: "Demo product", cat: "TOOLS", price: "$18", img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800", grid: "span 1 / span 1", desc: "Ultra-fine hydration for tropical ferns." }
];

export default function ProductShowcase() {
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    // FIXED MAPPING: Directly matches the CSS class names
    const getLayoutClass = (gridStr: string) => {
        if (gridStr === "span 2 / span 2") return "span-2-2";
        if (gridStr === "span 1 / span 2") return "span-1-2";
        if (gridStr === "span 2 / span 1") return "span-2-1";
        return "span-1-1";
    };

    return (
        <section className="showcase-section">
            <style dangerouslySetInnerHTML={{ __html: STYLES }} />

            <div className="showcase-container">
                <header style={{ marginBottom: '80px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.4em', color: '#8B9D83', textTransform: 'uppercase' }}>Welcome to our</span>
                    <h2 style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: '0.9', margin: '20px 0 0 0', fontWeight: '900', fontStyle: 'italic' }}>Product <br/> Gallery.</h2>
                </header>

                <div className="showcase-grid">
                    {SPECIMENS.map((p: any) => {
                        const layoutClass = getLayoutClass(p.grid);

                        if (p.type === 'testimonial') {
                            return (
                                <div key={p.id} className={`quote-card ${layoutClass}`}>
                                    <h3 className="quote-text">{p.text}</h3>
                                    <span style={{ fontSize: '12px', fontWeight: '900', color: '#8B9D83' }}>— {p.author}</span>
                                </div>
                            );
                        }

                        return (
                            <div key={p.id} className={`specimen-card ${layoutClass}`} onClick={() => setSelectedProduct(p)}>
                                <img src={p.img} className="card-img" alt={p.name} />
                                <div className="card-overlay" />
                                <h4 className="card-title">{p.name}</h4>
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedProduct && (
                <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <div style={{ flex: 1, height: '450px', position: 'relative' }}>
                            <img src={selectedProduct.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                        </div>
                        <div style={{ flex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ color: '#8B9D83', fontWeight: '900', letterSpacing: '2px', fontSize: '12px' }}>{selectedProduct.cat} — {selectedProduct.price}</span>
                            <h3 style={{ fontSize: '50px', fontStyle: 'italic', margin: '20px 0', lineHeight: '1' }}>{selectedProduct.name}</h3>
                            <p style={{ opacity: 0.8, lineHeight: '1.8', marginBottom: '40px' }}>{selectedProduct.desc}</p>
                            <a href="#" style={{ background: '#FCF9F1', color: '#2D463E', padding: '18px 36px', borderRadius: '50px', textDecoration: 'none', width: 'fit-content', fontWeight: '900', fontSize: '12px', letterSpacing: '1px' }}>ACQUIRE SPECIMEN</a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}