"use client";
import React, { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import { ScrollTrigger, Flip } from 'gsap/all';
import { useGSAP } from '@gsap/react';

// Static Imports - Ensure these paths match your project structure
import img1 from '../plimage/portrait-pattern-1.jpg';
import img2 from '../plimage/portrait-image-12.jpg';
import img3 from '../plimage/focalpoint.png';
import img4 from '../plimage/portrait-pattern-2.jpg';
import img5 from '../plimage/portrait-pattern-4.jpg';
import img6 from '../plimage/portrait-image-3.jpg';
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

        // 1. Capture Flip State (Layout Delta Calculation)
        galleryRef.current.classList.add("gallery--final");
        const state = Flip.getState(items);
        galleryRef.current.classList.remove("gallery--final");

        // 2. Initialize Main Timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=600%", // Extended track for growth phase
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        // PHASE 1: Bento Expansion
        tl.add(
            Flip.to(state, {
                duration: 1.5,
                ease: "none",
                absolute: true,
                props: "borderRadius,opacity", 
            })
        );

        tl.to({}, { duration: 0.2 }); // Spatial Hold

        // PHASE 2: Reverse Blind Reveal
        tl.to(nextSectionRef.current, {
            yPercent: -100,
            duration: 1.5,
            ease: "none",
        });

        // PHASE 3: Content Scrub (Text + Spline Growth)
        const splineProxy = { growth: 0 };
        tl.add("growthStart");

        // Staggered text entry
        tl.from([".reveal-title", ".reveal-para"], {
            opacity: 0,
            y: 40,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out"
        }, "growthStart");

        // Imperative Variable Scrubbing
        tl.to(splineProxy, {
            growth: 100, // Normalized range 0-100
            duration: 3,
            ease: "none",
            onUpdate: () => {
                if (splineAppRef.current) {
                    try {
                        // Directly updates the Spline Engine Variable 'Growth'
                        splineAppRef.current.setVariable('Growth', splineProxy.growth);
                    } catch (e) {
                        // Silent fail if 'Growth' variable is missing in current scene
                    }
                }
            }
        }, "growthStart");

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
            
            {/* Layer 1: Bento Section (Z-10) */}
            <section className="absolute inset-0 z-10 bg-[#e5e7eb] relative">
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
                className="absolute top-full left-0 z-20 w-full h-screen bg-[#111827] flex items-center justify-center overflow-hidden"
            >
                {/* Column 1: Spline Runtime */}
                <div className="w-1/2 h-full relative">
                    <Spline 
                        onLoad={onLoad} 
                        scene="https://prod.spline.design/vu1WAw6ONgVTG3cS/scene.splinecode" 
                    />
                </div>

                {/* Column 2: Text UI */}
                <div className="w-1/2 h-full flex flex-col justify-center px-24 text-white">
                    <div className="max-w-xl">
                        <h2 className="reveal-title text-7xl font-bold mb-6">
                            Welcome to DK greens
                        </h2>
                        <p className="reveal-para text-xl text-gray-300 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}