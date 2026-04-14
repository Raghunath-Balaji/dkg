"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 1. Force a refresh to handle height changes from preceding sections
        ScrollTrigger.refresh();

        // 2. Deterministic animation states to prevent 'ghosting'
        gsap.fromTo(".contact-row", 
            { 
                y: 60, 
                opacity: 0 
            },
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 1.4,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: ".contact-container",
                    start: "top 80%",
                    invalidateOnRefresh: true, // Recalculates markers on refresh
                    toggleActions: "play none none none"
                }
            }
        );
    }, { scope: containerRef });

    const links = [
        { id: "01", label: "Amazon Store", tag: "Shop", detail: "Curated Specimens" },
        { id: "02", label: "WhatsApp", tag: "Consult", detail: "Direct Line" },
        { id: "03", label: "Review Us", tag: "Feedback", detail: "Google Forms" },
        { id: "04", label: "Instagram", tag: "Daily", detail: "@dkgreens" },
        { id: "05", label: "Inquiries", tag: "Email", detail: "hello@dkgreens.com" }
    ];

    return (
        <section ref={containerRef} className="contact-root relative w-full min-h-screen bg-[#2D463E] text-[#FCF9F1] px-[8vw] py-[12vh] overflow-hidden">
            
            {/* --- 1. THE ASYMMETRICAL HEADER --- */}
            <div className="grid grid-cols-12 gap-4 mb-[15vh]">
                <div className="col-span-12 md:col-span-9">
                    <h2 className="header-title font-black leading-[0.8] tracking-tighter"
                        style={{ fontSize: 'clamp(3rem, 10vw, 13rem)' }}>
                        REACH OUT TO <br />
                        <span className="italic font-serif text-[#D9D1C1] ml-[0vw]">US</span>
                    </h2>
                </div>
                <div className="col-span-12 md:col-span-3 flex flex-col justify-end pt-10 md:pt-0">
                    <p className="text-[#D9D1C1]/50 uppercase text-[10px] tracking-[0.5em] mb-4">Inquiries & Orders</p>
                </div>
            </div>

            {/* --- 2. THE EDITORIAL INDEX --- */}
            <div className="contact-container w-full border-t border-[#FCF9F1]/10">
                {links.map((item, i) => (
                    <a key={i} href="#" className="contact-row group grid grid-cols-12 items-center py-[6vh] border-b border-[#FCF9F1]/10 transition-all duration-700">
                        
                        {/* Column 1: ID */}
                        <div className="hidden md:block col-span-1 text-[11px] font-mono text-[#D9D1C1]/30">
                            {item.id}
                        </div>

                        {/* Column 2: Label (The Star) */}
                        <div className="col-span-8 md:col-span-7">
                            <h3 className="row-label text-4xl md:text-7xl font-bold tracking-tighter group-hover:italic group-hover:text-[#D9D1C1] transition-all duration-500">
                                {item.label}
                            </h3>
                        </div>

                        {/* Column 3: Tag & Detail */}
                        <div className="col-span-4 md:col-span-4 flex justify-between items-center"> {/* Removed text-right */}
                            <div className="flex flex-col items-start"> {/* Changed items-end to items-start */}
                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#D9D1C1]/40 mb-1 group-hover:text-[#FCF9F1] transition-colors">
                                    {item.tag}
                                </span>
                                <span className="text-sm text-[#F2EFE4]/60">
                                    {item.detail}
                                </span>
                            </div>
                            
                            {/* Arrow icon remains on the far right of this container due to justify-between */}
                            <div className="arrow-icon opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                                </svg>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* --- 3. BACKGROUND GHOST TEXT --- */}
            <h4 className="absolute bottom-0 right-0 text-[28vw] font-black text-[#FCF9F1]/5 leading-none select-none pointer-events-none translate-y-1/4">
                CONTACT
            </h4>

            {/* --- INTERNAL CSS FOR PEAK STYLING --- */}
            <style jsx>{`
                .contact-row {
                    position: relative;
                    overflow: hidden;
                }
                .contact-row, 
                .contact-row:link, 
                .contact-row:visited, 
                .contact-row:hover, 
                .contact-row:active {
                    text-decoration: none !important;
                    color: #FCF9F1 !important;
                }

                .contact-row::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 0%;
                    height: 100%;
                    background: rgba(252, 249, 241, 0.03);
                    transition: width 0.8s cubic-bezier(0.19, 1, 0.22, 1);
                    z-index: 0;
                }

                .contact-row:hover::before {
                    width: 100%;
                }

                .row-label {
                    position: relative;
                    z-index: 1;
                }
            `}</style>
        </section>
    );
}