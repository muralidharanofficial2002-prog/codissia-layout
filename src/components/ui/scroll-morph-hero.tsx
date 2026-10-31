"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

export interface MorphCardItem {
    id?: string;
    src: string;
    title?: string;
    subtitle?: string;
    badge?: string;
    tag?: string;
    accentColor?: string;
}

interface FlipCardProps {
    src: string;
    item?: MorphCardItem;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
    onSelectItem?: (item: MorphCardItem, index: number) => void;
}

// --- FlipCard Component ---
const IMG_WIDTH = 68;
const IMG_HEIGHT = 96;

function FlipCard({
    src,
    item,
    index,
    total,
    target,
    onSelectItem,
}: FlipCardProps) {
    const badgeLabel = item?.badge || `0${(index % 9) + 1}`;
    const titleLabel = item?.title || `Discipline ${index + 1}`;
    const tagLabel = item?.tag || "SUBCON 2027";
    const accent = item?.accentColor || (index % 2 === 0 ? "#009EE2" : "#EF7F1A");

    return (
        <motion.div
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            onClick={() => {
                if (item && onSelectItem) {
                    onSelectItem(item, index);
                }
            }}
            className="cursor-pointer group select-none"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180, scale: 1.18 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-[0_14px_30px_-10px_rgba(30,32,34,0.55)] bg-[#1E2022] border border-white/25"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={src}
                        alt={titleLabel}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E2022]/90 via-[#1E2022]/15 to-transparent transition-opacity group-hover:opacity-75" />
                    <span
                        className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider text-white shadow-sm"
                        style={{ backgroundColor: accent }}
                    >
                        {badgeLabel}
                    </span>
                    <div className="absolute inset-x-1.5 bottom-1.5">
                        <p className="text-[8.5px] font-semibold leading-tight text-white line-clamp-2 drop-shadow">
                            {titleLabel}
                        </p>
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-xl bg-[#1E2022] flex flex-col items-center justify-between p-2 border border-[#009EE2]/50 text-center"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <span
                        className="text-[7px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: accent }}
                    >
                        {tagLabel}
                    </span>
                    <p className="text-[8.5px] font-bold text-white leading-tight line-clamp-3">
                        {titleLabel}
                    </p>
                    <span className="text-[7.5px] font-semibold text-[#009EE2] uppercase tracking-wider">
                        Inspect →
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Default Industrial & Manufacturing Images ---
const DEFAULT_IMAGES = [
    "/assets/subcon/process_casting.jpg",
    "/assets/subcon/process_machining.jpg",
    "/assets/subcon/process_joining.jpg",
    "/assets/subcon/process_abrasive.jpg",
    "/assets/subcon/process_sheet_metal.jpg",
    "/assets/subcon/process_coatings.jpg",
    "/assets/subcon/process_laser_other.jpg",
    "/assets/subcon/part_pump_motor.jpg",
    "/assets/subcon/part_foundry.jpg",
    "/assets/subcon/part_textile.jpg",
    "/assets/subcon/part_tools_die.jpg",
    "/assets/subcon/part_automation.jpg",
    "/assets/subcon/part_machine_tools.jpg",
    "/assets/subcon/part_material_handling.jpg",
    "/assets/subcon/part_process_machinery.jpg",
    "/assets/subcon/part_gears.jpg",
    "/assets/subcon/part_machined_parts.jpg",
    "/assets/subcon/part_auto_components.jpg",
    "/assets/subcon/part_plastic_polymer.jpg",
    "/assets/subcon/part_hydraulics.jpg",
];

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export interface IntroAnimationProps {
    items?: MorphCardItem[];
    title?: string;
    subtitle?: string;
    activeTitle?: string;
    activeSubtitle?: string;
    onSelectItem?: (item: MorphCardItem, index: number) => void;
    className?: string;
}

export function IntroAnimation({
    items,
    title = "Built for Every Manufacturing Discipline.",
    subtitle = "SCROLL OR USE CONTROLS TO MORPH THROUGH 20 SUBCONTRACTING CAPABILITIES",
    activeTitle = "Explore Precision Capabilities",
    activeSubtitle = "Hover any 3D card to flip its specification, click to filter related workshops, or scrub through the orbital arc.",
    onSelectItem,
    className = "",
}: IntroAnimationProps) {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [scrollProgressUI, setScrollProgressUI] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const cardItems: MorphCardItem[] = useMemo(() => {
        if (items && items.length > 0) {
            // Pad or slice to 20 items for a rich circle/arc
            const result: MorphCardItem[] = [];
            for (let i = 0; i < 20; i++) {
                result.push(items[i % items.length]);
            }
            return result;
        }
        return DEFAULT_IMAGES.map((src, i) => ({
            id: `item-${i}`,
            src,
            title: `Manufacturing Discipline ${i + 1}`,
            badge: String(i + 1).padStart(2, "0"),
            tag: i < 7 ? "Core Process" : "Sub-Assembly",
            accentColor: i < 7 ? "#009EE2" : "#EF7F1A",
        }));
    }, [items]);

    const TOTAL_IMAGES = cardItems.length;
    const MAX_SCROLL = 3000;

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    // --- Virtual Scroll Logic ---
    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0);

    const updateVirtualScroll = (newScroll: number) => {
        const clamped = Math.max(0, Math.min(newScroll, MAX_SCROLL));
        scrollRef.current = clamped;
        virtualScroll.set(clamped);
        setScrollProgressUI(Math.round((clamped / MAX_SCROLL) * 100));
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            const scrollingDown = e.deltaY > 0;
            const scrollingUp = e.deltaY < 0;

            // Only intercept wheel when within bounds so page scrolling is never permanently trapped
            if (
                (scrollingDown && scrollRef.current < MAX_SCROLL) ||
                (scrollingUp && scrollRef.current > 0)
            ) {
                e.preventDefault();
                const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
                scrollRef.current = newScroll;
                virtualScroll.set(newScroll);
                setScrollProgressUI(Math.round((newScroll / MAX_SCROLL) * 100));
            }
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            touchStartY = touchY;

            const scrollingDown = deltaY > 0;
            const scrollingUp = deltaY < 0;

            if (
                (scrollingDown && scrollRef.current < MAX_SCROLL) ||
                (scrollingUp && scrollRef.current > 0)
            ) {
                const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
                scrollRef.current = newScroll;
                virtualScroll.set(newScroll);
                setScrollProgressUI(Math.round((newScroll / MAX_SCROLL) * 100));
            }
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: true });
        container.addEventListener("touchmove", handleTouchMove, { passive: true });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    // 2. Scroll Rotation (Shuffling):Starts after morph (e.g., > 600)
    const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // --- Intro Sequence ---
    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    // --- Random Scatter Positions ---
    const scatterPositions = useMemo(() => {
        return cardItems.map((_, i) => {
            const seed = (i + 1) * 137.5;
            return {
                x: (Math.sin(seed) * 0.5) * 1200,
                y: (Math.cos(seed * 1.3) * 0.5) * 800,
                rotation: Math.sin(seed * 2.1) * 180,
                scale: 0.6,
                opacity: 0,
            };
        });
    }, [cardItems]);

    // --- Render Loop (Manual Calculation for Morph) ---
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    // --- Content Opacity ---
    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    const handlePresetMode = (mode: "scatter" | "line" | "circle" | "arc") => {
        if (mode === "scatter") {
            updateVirtualScroll(0);
            setIntroPhase("scatter");
        } else if (mode === "line") {
            updateVirtualScroll(0);
            setIntroPhase("line");
        } else if (mode === "circle") {
            updateVirtualScroll(0);
            setIntroPhase("circle");
        } else if (mode === "arc") {
            setIntroPhase("circle");
            updateVirtualScroll(1200);
        }
    };

    const currentModeLabel =
        introPhase === "scatter"
            ? "Scatter"
            : introPhase === "line"
              ? "Linear Wave"
              : morphValue > 0.5
                ? "Orbital Arc"
                : "Circle Ring";

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-[640px] sm:h-[700px] bg-gradient-to-b from-[#F8FAFC] via-[#EEF6FB] to-[#F8FAFC] overflow-hidden rounded-[2rem] border border-[#009EE2]/20 shadow-[0_24px_60px_-25px_rgba(0,158,226,0.22)] select-none ${className}`}
        >
            {/* Subtle Architectural Blueprint Grid Overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-45"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(0, 158, 226, 0.18) 1px, transparent 0)",
                    backgroundSize: "28px 28px",
                }}
                aria-hidden="true"
            />

            {/* Top Interactive Phase Controls Bar */}
            <div className="relative z-30 flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 pt-5">
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E2022] text-white text-[11px] font-semibold tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-[#009EE2] animate-pulse" />
                        <span>Morph Stage: {currentModeLabel}</span>
                    </span>
                    <span className="hidden sm:inline-block text-xs font-medium text-[#64686D]">
                        Hover cards to flip · Click to filter workshops
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 bg-white/90 backdrop-blur-md p-1 rounded-full border border-[#009EE2]/20 shadow-sm">
                    {(
                        [
                            { id: "scatter", label: "Scatter" },
                            { id: "line", label: "Line" },
                            { id: "circle", label: "Circle" },
                            { id: "arc", label: "Arc Orbit" },
                        ] as const
                    ).map((btn) => {
                        const isActive =
                            (btn.id === "scatter" && introPhase === "scatter") ||
                            (btn.id === "line" && introPhase === "line") ||
                            (btn.id === "circle" && introPhase === "circle" && morphValue < 0.4) ||
                            (btn.id === "arc" && introPhase === "circle" && morphValue >= 0.4);
                        return (
                            <button
                                key={btn.id}
                                type="button"
                                onClick={() => handlePresetMode(btn.id)}
                                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                                    isActive
                                        ? "bg-[#009EE2] text-white shadow-sm"
                                        : "text-[#64686D] hover:text-[#1E2022]"
                                }`}
                            >
                                {btn.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Full Container */}
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">
                {/* Intro Text (Fades out as morph progresses) */}
                <div className="absolute z-10 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={
                            introPhase === "circle" && morphValue < 0.5
                                ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                                : { opacity: 0, filter: "blur(10px)" }
                        }
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <span className="mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#009EE2]/10 border border-[#009EE2]/25 text-[#009EE2] text-[10px] font-bold uppercase tracking-widest">
                            SUBCON 2027 · 20 Industrial Disciplines
                        </span>
                        <h3 className="text-2xl font-bold tracking-tight text-[#1E2022] sm:text-4xl max-w-md leading-tight">
                            {title}
                        </h3>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={
                            introPhase === "circle" && morphValue < 0.5
                                ? { opacity: 0.65 - morphValue }
                                : { opacity: 0 }
                        }
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="mt-3 text-[11px] font-bold tracking-[0.2em] text-[#EF7F1A]"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                {/* Arc Active Content (Fades in when morphed into bottom arc) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[13%] z-20 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <span className="mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EF7F1A]/15 border border-[#EF7F1A]/30 text-[#EF7F1A] text-[10px] font-bold uppercase tracking-widest">
                        7 Core Processes + 13 Key OEM Sub-Assemblies
                    </span>
                    <h3 className="text-2xl md:text-4xl font-bold text-[#1E2022] tracking-tight mb-2">
                        {activeTitle}
                    </h3>
                    <p className="text-xs md:text-sm text-[#64686D] max-w-lg leading-relaxed">
                        {activeSubtitle}
                    </p>
                </motion.div>

                {/* Main Card Stage */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {cardItems.slice(0, TOTAL_IMAGES).map((item, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 74;
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = {
                                x: lineX,
                                y: 0,
                                rotation: 0,
                                scale: 1,
                                opacity: 1,
                            };
                        } else {
                            // 2. Circle Phase & Morph Logic
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            // A. Calculate Circle Position
                            const circleRadius = Math.max(Math.min(minDimension * 0.34, 290), 140);
                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            // B. Calculate Bottom Arc Position
                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = Math.max(baseRadius * (isMobile ? 1.35 : 1.08), 320);

                            const arcApexY = containerSize.height * (isMobile ? 0.34 : 0.24);
                            const arcCenterY = arcApexY + arcRadius;

                            const spreadAngle = isMobile ? 100 : 130;
                            const startAngle = -90 - spreadAngle / 2;
                            const step = spreadAngle / (TOTAL_IMAGES - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.8;
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + i * step + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.35 : 1.65,
                            };

                            // C. Interpolate (Morph)
                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={`${item.id || "card"}-${i}`}
                                src={item.src}
                                item={item}
                                index={i}
                                total={TOTAL_IMAGES}
                                phase={introPhase}
                                target={target}
                                onSelectItem={onSelectItem}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Bottom Interactive Scrub Bar for Effortless Morph & Orbit Control */}
            <div className="absolute inset-x-5 sm:inset-x-8 bottom-4 z-30 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#009EE2]/20 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1E2022]">
                    <span className="w-2 h-2 rounded-full bg-[#EF7F1A]" />
                    <span>Morph &amp; Orbit Scrubber</span>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64686D]">
                        Circle
                    </span>
                    <input
                        type="range"
                        min={0}
                        max={MAX_SCROLL}
                        value={Math.round((scrollProgressUI / 100) * MAX_SCROLL)}
                        onChange={(e) => {
                            if (introPhase !== "circle") setIntroPhase("circle");
                            updateVirtualScroll(Number(e.target.value));
                        }}
                        aria-label="Morph and rotate discipline cards"
                        className="w-full accent-[#009EE2] cursor-pointer h-1.5 bg-[#1E2022]/15 rounded-lg"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF7F1A]">
                        Arc {scrollProgressUI}%
                    </span>
                </div>
            </div>
        </div>
    );
}

export default IntroAnimation;
