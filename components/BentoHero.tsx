"use client";
import React, { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import { ScrollTrigger, Flip } from 'gsap/all';
import { useGSAP } from '@gsap/react';

// Static Imports
import img1 from '../plimage/portrait-pattern-1.png';
import img2 from '../plimage/claysoul.png';
import img3 from '../plimage/focalpoint.png';
import img4 from '../plimage/portrait-pattern-2.png';
import img5 from '../plimage/portrait-pattern-4.jpg';
import img6 from '../plimage/portrait-image-3.png';
import img7 from '../plimage/image.png';
import img8 from '../plimage/portrait-image-1.png';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Flip);
}

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

// TypeScript definitions for the Discriminated Union
type ProductItem = { src: string };
type Specimen = ProductItem; 

export default function BentoHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const nextSectionRef = useRef<HTMLDivElement>(null);
    const splineAppRef = useRef<any>(null);

    const onLoad = (app: any) => {
        splineAppRef.current = app;
    };

    useGSAP(() => {
        if (!galleryRef.current || !nextSectionRef.current) return;

        const items = gsap.utils.toArray<HTMLElement>(".gallery__item");

        // --- 1. CAPTURE FLIP STATE ---
        galleryRef.current.classList.add("gallery--final");
        const state = Flip.getState(items);
        galleryRef.current.classList.remove("gallery--final");

        // --- 2. INITIALIZE MASTER TIMELINE ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=200%", 
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        // --- PHASE 1: BENTO EXPANSION ---
        tl.add(
            Flip.to(state, {
                duration: 2,
                ease: "power2.inOut",
                absolute: false,
                props: "borderRadius,opacity", 
            })
        );

        tl.to({}, { duration: 0.3 }); 

        // --- PHASE 2: REVERSE BLIND REVEAL ---
        tl.to(nextSectionRef.current, {
            yPercent: -100,
            duration: 2,
            ease: "power2.inOut",
            // absolute : true
        });

        // --- PHASE 3: THE APERTURE & KINETIC REVEAL ---
        tl.add("revealStart");

        tl.fromTo(".aperture-wrapper", 
            { clipPath: "inset(40% 40% 40% 40% round 100px)" }, 
            { 
                clipPath: "inset(0% 0% 0% 0% round 32px)", 
                duration: 2.5, 
                ease: "expo.inOut" 
            },
        "revealStart");

        tl.fromTo(".aperture-media", 
            { scale: 1.5 },
            { scale: 1, duration: 2.5, ease: "expo.inOut" },
        "revealStart");

        tl.to(".reveal-title span span", {
            y: 0,
            stagger: 0.15,
            duration: 1.5,
            ease: "expo.out"
        }, "revealStart+=0.8");

        tl.to([".reveal-para", ".reveal-tag"], {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 1.2,
            ease: "power3.out"
        }, "revealStart+=1.2");

        tl.to(".ghost-text", {
            y: -150,
            ease: "none",
            duration: 4 
        }, "revealStart");

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
            
            {/* Layer 1: Bento Section (Z-10) */}
            {/* 'relative' restored to anchor the absolute coordinate system */}
            <section className="absolute inset-0 z-10 bg-[#2d463e] relative">
                <div ref={galleryRef} className="gallery-bento w-full h-full">
                    {images.map((img, i) => {
                        
                        // 1. INTERCEPT ITEM-5 (Contact Pill)
                        if (i === 4) {
                            return (
                                <a 
                                    key="contact-pill"
                                    href="mailto:hello@dkgreens.com"
                                    className="gallery__item item-5 group relative flex flex-col items-center justify-center overflow-hidden p-8 hover:scale-[0.98]"
                                    style={{ 
                                        backgroundColor: "#8B9D83", 
                                        borderRadius: "50px",       
                                        textDecoration: "none",
                                        color: "#FCF9F1",
                                        display: "flex"
                                    }}
                                >
                                    {/* ... your contact pill content ... */}
                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-2">Direct Line</span>
                                        <h3 className="font-black italic leading-[0.85] tracking-tighter mb-6 text-[#2D463E]" style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}>
                                            Get Started <br /> 
                                        </h3>
                                        <div className="w-12 h-12 rounded-full border border-[#FCF9F1]/30 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#FCF9F1] group-hover:text-[#2D463E]">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M7 17L17 7M17 7H7M17 7V17"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
                                </a>
                            );
                        }

                        // 2. INTERCEPT ITEM-8 (Amazon Link for portrait-image-1.png)
                        if (i === 7) {
                            return (
                                <div key={i} className={`gallery__item item-${i + 1} overflow-hidden`}>
                                    <a 
                                        href="https://amazon.in" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="block w-full h-full group"
                                    >
                                        <img 
                                            src={img.src} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                            alt="Shop on Amazon" 
                                        />
                                        {/* Optional: Simple hover overlay to indicate it's a link */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                            <span className="text-[10px] text-white uppercase tracking-widest font-bold">Shop Now</span>
                                        </div>
                                    </a>
                                </div>
                            );
                        }

                        // 3. STANDARD IMAGE BOX
                        return (
                            <div key={i} className={`gallery__item item-${i + 1}`}>
                                <img 
                                    src={img.src} 
                                    className="w-full h-full object-cover" 
                                    alt="" 
                                />
                            </div>
                        );
                    })}
                </div>
            </section>
            {/* Layer 2: Reveal Section (Z-20) */}
<section 
    ref={nextSectionRef} 
    className="absolute top-full left-0 z-20 w-full h-screen bg-[#2D463E] flex items-center overflow-hidden"
>
    {/* Background Ghost Text */}
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <h1 className="ghost-text text-[25vw] font-black uppercase tracking-tighter leading-none text-[#FCF9F1]">
            Greens
        </h1>
    </div>

    {/* Left: Media - Slightly more centered gutter */}
    <div className="w-1/2 h-full relative flex items-center justify-end pr-[8%]">
        <div className="aperture-wrapper relative w-[95%] aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#F2EFE4]">
            <img 
                src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?auto=format&fit=crop&q=80&w=1200" 
                className="aperture-media w-full h-full object-cover scale-150 grayscale-[20%]"
                alt="Botanical Specimen"
            />
            <div className="absolute inset-0 bg-[#2D463E]/10" />
        </div>
    </div>

    {/* Right: Typography - Gutter pulled back to 10% */}
    <div className="w-1/2 h-full flex flex-col justify-center pl-[1%] pr-[5%] text-[#FCF9F1] z-10">
        <div className="max-w-xl">
            {/* Title: Crushed leading to 0.8 to create the 'lockup' feel */}
            <h2 className="reveal-title font-black leading-[1.0] tracking-tighter"
                style={{ fontSize: 'clamp(3vw, 5vw, 7vw)' }}>
                <span className="block overflow-hidden">
                    <span className="inline-block translate-y-full">WELCOME TO</span>
                </span>
                
                {/* <span className="block overflow-hidden">
                    <span className="inline-block translate-y-full">TO</span>
                </span> */}

                <span className="block overflow-hidden">
                    <span className="inline-block translate-y-full italic font-serif text-[#D9D1C1]">DK Greens</span>
                </span>
            </h2>
            
            {/* Paragraph: Tightened margin and line-height */}
            <p className="reveal-para text-base md:text-lg text-[#F2EFE4]/70 leading-snug max-w-md opacity-0 mb-8">
                Designing the interface between <span className="text-white italic">architecture</span> and <span className="text-white italic">nature</span>. 
                We curate botanical specimens that transcend the ordinary, fostering a dialogue between the built environment and the organic world. 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </p>

            {/* Tag / Meta Info */}
            <div className="flex items-center gap-6 opacity-0 reveal-tag">
                <div className="w-10 h-[1px] bg-[#D9D1C1]/30" />
                <span className="text-[10px] uppercase tracking-[0.5em] text-[#D9D1C1]/80 whitespace-nowrap">
                    Est. 2026 / 12.972° N
                </span>
            </div>
        </div>
    </div>
</section>
        </div>
    );
}