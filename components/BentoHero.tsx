"use client";
import React, { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import { ScrollTrigger, Flip } from 'gsap/all';
import { useGSAP } from '@gsap/react';

// Static Imports - Ensure these paths match your project structure
import img1 from '../plimage/portrait-pattern-1.png';
import img2 from '../plimage/portrait-image-12.jpg';
import img3 from '../plimage/focalpoint.png';
import img4 from '../plimage/portrait-pattern-2.jpg';
import img5 from '../plimage/portrait-pattern-4.jpg';
import img6 from '../plimage/portrait-image-3.png';
import img7 from '../plimage/portrait-pattern-3.jpg';
import img8 from '../plimage/portrait-image-1.jpg';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Flip);
}

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function BentoHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const nextSectionRef = useRef<HTMLDivElement>(null);

    // Using a Ref prevents the GSAP timeline from re-calculating or stalling 
    // when the Spline state changes.
    const splineAppRef = useRef<any>(null);

    const onLoad = (app: any) => {
        splineAppRef.current = app;
    };

    useGSAP(() => {
    if (!galleryRef.current || !nextSectionRef.current) return;

    const items = gsap.utils.toArray<HTMLElement>(".gallery__item");

    // --- 1. CAPTURE FLIP STATE ---
    // Calculates the layout delta between the initial bento and the final grid
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
            absolute: true,
            props: "borderRadius,opacity", 
        })
    );

    tl.to({}, { duration: 0.3 }); // Spatial Hold for visual breathing room

    // --- PHASE 2: REVERSE BLIND REVEAL ---
    // Slides the dark section up over the pinned bento
    tl.to(nextSectionRef.current, {
        yPercent: -100,
        duration: 2,
        ease: "power2.inOut",
    });

    // --- PHASE 3: THE APERTURE & KINETIC REVEAL ---
    tl.add("revealStart");

    // 1. Aperture Expansion (Clip-Path Mask)
    // Animates the mask from a small centered box to a full rounded rectangle
    tl.fromTo(".aperture-wrapper", 
        { clipPath: "inset(40% 40% 40% 40% round 100px)" }, 
        { 
            clipPath: "inset(0% 0% 0% 0% round 32px)", 
            duration: 2.5, 
            ease: "expo.inOut" 
        },
    "revealStart");

    // 2. Media Zoom Out
    // Synchronized zoom-out to create a "lens focusing" effect
    tl.fromTo(".aperture-media", 
        { scale: 1.5 },
        { scale: 1, duration: 2.5, ease: "expo.inOut" },
    "revealStart");

    // 3. Kinetic Typography (Staggered Line Slide)
    // Targets the inner spans to slide up from the overflow-hidden containers
    tl.to(".reveal-title span span", {
        y: 0,
        stagger: 0.15,
        duration: 1.5,
        ease: "expo.out"
    }, "revealStart+=0.8");

    // 4. Content & Tag Fade
    tl.to([".reveal-para", ".reveal-tag"], {
        opacity: 1,
        y: -10,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out"
    }, "revealStart+=1.2");

    // 5. Ghost Text Parallax
    // Subtle background movement linked to the scrub
    tl.to(".ghost-text", {
        y: -150,
        ease: "none",
        duration: 4 // Spans the length of the reveal
    }, "revealStart");

}, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
            
            {/* Layer 1: Bento Section (Z-10) */}
            <section className="absolute inset-0 z-10 bg-[#fcf9f1] relative">
                <div ref={galleryRef} className="gallery-bento w-full h-full">
                    {images.map((img, i) => (
                        <div key={i} className={`gallery__item item-${i + 1}`}>
                            <img 
                                src={img.src} 
                                className="w-full h-full object-cover" 
                                alt="" 
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Layer 2: Reveal Section (Z-20) - 2-Column Split */}
<section 
    ref={nextSectionRef} 
    className="absolute top-full left-0 z-20 w-full h-screen bg-[#2D463E] flex items-center overflow-hidden"
>
    {/* Background Ghost Typography - Now in a faint Sage instead of Black */}
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none">
        <h1 className="text-[30vw] font-black uppercase tracking-tighter leading-none text-[#FCF9F1]">
            Greens
        </h1>
    </div>

    {/* Left Column: The Aperture Reveal */}
    <div className="w-1/2 h-full relative flex items-center justify-center p-12">
        <div className="aperture-wrapper relative w-full aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#F2EFE4]">
            <img 
                src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?auto=format&fit=crop&q=80&w=1200" 
                className="aperture-media w-full h-full object-cover scale-150 grayscale-[20%]"
                alt="Botanical Texture"
            />
            {/* Subtle Warm Overlay */}
            <div className="absolute inset-0 bg-[#2D463E]/10" />
        </div>
    </div>

    {/* Right Column: Kinetic Typography */}
    <div className="w-1/2 h-full flex flex-col justify-center px-24 text-[#FCF9F1] z-10">
        <div className="max-w-xl">
            <h2 className="reveal-title text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                <span className="block overflow-hidden">
                    <span className="inline-block translate-y-full">WELCOME</span>
                </span>
                <span className="block overflow-hidden">
                    <span className="inline-block translate-y-full italic font-serif text-[#D9D1C1]">TO DK</span>
                </span>
                <span className="block overflow-hidden">
                    <span className="inline-block translate-y-full">GREENS</span>
                </span>
            </h2>
            
            <p className="reveal-para text-xl text-[#F2EFE4]/80 leading-relaxed max-w-md opacity-0">
                Designing the interface between <span className="text-white italic">architecture</span> and <span className="text-white italic">nature</span>. We curate botanical specimens that transcend the ordinary.
            </p>

            <div className="mt-12 flex items-center gap-4 opacity-0 reveal-tag">
                <div className="w-12 h-[1px] bg-[#D9D1C1]" />
                <span className="text-xs uppercase tracking-[0.4em] text-[#D9D1C1]">Est. 2026 / 12.972° N</span>
            </div>
        </div>
    </div>
</section>
        </div>
    );
}