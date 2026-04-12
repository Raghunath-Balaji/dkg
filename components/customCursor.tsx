"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (typeof window === "undefined" || !cursorRef.current || !followerRef.current) return;

        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });
        
        const xFollowTo = gsap.quickTo(followerRef.current, "x", { duration: 0.4, ease: "power2.out" });
        const yFollowTo = gsap.quickTo(followerRef.current, "y", { duration: 0.4, ease: "power2.out" });

        const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
            xFollowTo(e.clientX);
            yFollowTo(e.clientY);
        };

        window.addEventListener("mousemove", onMouseMove);

        const onEnter = () => {
            gsap.to(followerRef.current, { 
                width: 60, height: 60, backgroundColor: "#74b5a0", opacity: 1, duration: 0.3 
            });
            gsap.to(cursorRef.current, { scale: 1.5, duration: 0.2 });
        };

        const onLeave = () => {
            gsap.to(followerRef.current, { 
                width: 30, height: 30, backgroundColor: "#74b5a0", opacity: 1, duration: 0.3 
            });
            gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
        };

        const timer = setTimeout(() => {
            const targets = document.querySelectorAll('a, button, .gallery__item');
            targets.forEach(el => {
                el.addEventListener("mouseenter", onEnter);
                el.addEventListener("mouseleave", onLeave);
            });
        }, 100);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            clearTimeout(timer);
        };
    }, []);

    return (
        // MASTER CONTAINER: Keeps everything above the modal
        <div 
            style={{ zIndex: 9999999, pointerEvents: 'none' }} 
            className="fixed inset-0 pointer-events-none"
        >
            {/* The Precision Dot */}
            <div 
                ref={cursorRef}
                style={{ zIndex: 10000000 }}
                className="fixed top-0 left-0 w-1 h-1 bg-[#2D463E] rounded-full -translate-x-1/2 -translate-y-1/2"
            />
            {/* The Follower Ring */}
            <div 
                ref={followerRef}
                style={{ 
                    width: '30px', 
                    height: '30px', 
                    backgroundColor: '#74b5a0', 
                    mixBlendMode: 'normal', // Changed to normal for true opaque color
                    opacity: 1, 
                    zIndex: 9999998, 
                    willChange: 'transform'
                }}
                className="fixed top-0 left-0 rounded-full -translate-x-1/2 -translate-y-1/2"
            />
        </div>
    );
}