import {
  EVENT_INFO,
  IMPACT_STATS,
  OBJECTIVES_LIST,
  PARTICIPATING_PSUS,
  PROCESS_CATEGORIES,
  SPEAKER_PROFILES,
  WORKSHOP_SESSIONS,
} from '../data/subconData';

export interface FigmaPrototypeInteraction {
  id: string;
  sourceNode: string;
  targetNode: string;
  trigger: 'ON_HOVER' | 'ON_CLICK' | 'AFTER_TIMEOUT' | 'ON_SCROLL' | 'WHILE_HOVERING';
  actionType: 'SMART_ANIMATE' | 'SCROLL_TO' | 'OPEN_OVERLAY' | 'CHANGE_TO_VARIANT';
  easingName: string;
  physics: {
    type: 'SPRING' | 'CUBIC_BEZIER' | 'LINEAR';
    stiffness?: number;
    damping?: number;
    mass?: number;
    durationMs: number;
    bezier?: [number, number, number, number];
  };
  animatedProperties: string[];
  description: string;
}

export interface FigmaSectionLayerSpec {
  id: string;
  frameName: string;
  yOffset: number;
  height: number;
  themeMode: 'Dark Liquid Glass (Hero Alone)' | 'Brochure Colour Theme (Ice-Blue / Navy / Cyan / Amber)';
  backgroundFill: string;
  autoLayout: {
    direction: 'VERTICAL' | 'HORIZONTAL';
    padding: string;
    itemSpacing: number;
  };
  childComponents: string[];
  interactionsCount: number;
}

export const FIGMA_SECTION_SPECS: FigmaSectionLayerSpec[] = [
  {
    id: 'sec-01-hero',
    frameName: '01_Hero_Banner_Liquid_Glass',
    yOffset: 0,
    height: 900,
    themeMode: 'Dark Liquid Glass (Hero Alone)',
    backgroundFill: '#000000 + Seamless Looping Video (raf Crossfade)',
    autoLayout: { direction: 'VERTICAL', padding: '24px 24px 32px 24px', itemSpacing: 24 },
    childComponents: [
      'Component/Navbar_Liquid_Glass_Pill',
      'Component/Badge_10th_Edition_Pulse',
      'Typography/Hero_Display_Instrument_Serif (Know it all.)',
      'Component/Input_Liquid_Glass_Email_Pill',
      'Component/Button_Manifesto_Shimmer',
      'Component/Social_Dock_Liquid_Glass',
      'Component/Scroll_To_Explore_Bounce_Cue',
    ],
    interactionsCount: 9,
  },
  {
    id: 'sec-01b-marquee-psu',
    frameName: '01B_Live_Ticker_Participating_PSUs',
    yOffset: 900,
    height: 56,
    themeMode: 'Brochure Colour Theme (Ice-Blue / Navy / Cyan / Amber)',
    backgroundFill: '#0F2557 (CODISSIA Royal Navy)',
    autoLayout: { direction: 'HORIZONTAL', padding: '14px 20px', itemSpacing: 12 },
    childComponents: [
      'Component/Ticker_Label_Badge',
      'Component/Marquee_Track_38s_Infinite (12 DPSUs/PSUs)',
    ],
    interactionsCount: 3,
  },
  {
    id: 'sec-02-about',
    frameName: '02_About_CODISSIA_And_Objectives',
    yOffset: 956,
    height: 980,
    themeMode: 'Brochure Colour Theme (Ice-Blue / Navy / Cyan / Amber)',
    backgroundFill: 'LinearGradient(#EBF4FC -> #F4F8FC -> #FFFFFF)',
    autoLayout: { direction: 'VERTICAL', padding: '112px 24px 96px 24px', itemSpacing: 40 },
    childComponents: [
      'Vector/Floating_Brochure_Geometry_Parallax',
      'Component/TiltCard_3D_CODISSIA_Overview',
      'Component/Venue_Card_KenBurns_Zoom',
      'Component/TiltCard_3D_7_Strategic_Objectives',
      'Component/Banner_12_Participating_PSUs_Grid',
    ],
    interactionsCount: 14,
  },
  {
    id: 'sec-03-showcase',
    frameName: '03_Featured_Exhibition_Reel_Showcase',
    yOffset: 1936,
    height: 760,
    themeMode: 'Brochure Colour Theme (Ice-Blue / Navy / Cyan / Amber)',
    backgroundFill: '#FFFFFF (Crisp Brochure White)',
    autoLayout: { direction: 'VERTICAL', padding: '40px 24px 112px 24px', itemSpacing: 24 },
    childComponents: [
      'Component/Reel_Progress_Bar_4800ms',
      'Component/Reel_Scene_Crossfade_Stage (4 Industrial Scenes)',
      'Component/Tab_Pills_Scene_Selector',
      'Component/Card_Floating_Approach_Frosted_White',
    ],
    interactionsCount: 8,
  },
  {
    id: 'sec-04-philosophy',
    frameName: '04_Philosophy_Innovation_x_Vision',
    yOffset: 2696,
    height: 920,
    themeMode: 'Brochure Colour Theme (Ice-Blue / Navy / Cyan / Amber)',
    backgroundFill: 'LinearGradient(#FFFFFF -> #F0F7FF -> #E8F2FC)',
    autoLayout: { direction: 'VERTICAL', padding: '112px 24px', itemSpacing: 48 },
    childComponents: [
      'Typography/Heading_Innovation_x_Vision_Parallax',
      'Component/DualImage_Hover_Card (Buyer Audit <-> CNC Sparks)',
      'Component/Divider_Animated_ScaleX_Gradient',
      'Component/KPI_Grid_4_Animated_Counters (98.4%, 86.1%, 250+, ₹50 Cr+)',
    ],
    interactionsCount: 11,
  },
  {
    id: 'sec-05-services',
    frameName: '05_Processes_Parts_And_Visitors_Matrix',
    yOffset: 3616,
    height: 1180,
    themeMode: 'Brochure Colour Theme (Ice-Blue / Navy / Cyan / Amber)',
    backgroundFill: '#F4F8FC (Brochure Ice-Blue)',
    autoLayout: { direction: 'VERTICAL', padding: '112px 24px', itemSpacing: 48 },
    childComponents: [
      'Component/DualImage_Card_Casting_To_Forging',
      'Component/DualImage_Card_CNC_Sparks_To_VMC_Milling',
      'Component/Segmented_Tabs_Capability_Matrix',
      'Component/Ribbon_List_7_Core_Processes (Cyan/Amber Alternating)',
      'Component/Grid_15_Parts_And_SubAssemblies',
      'Component/Grid_12_Visitor_Sectors',
    ],
    interactionsCount: 18,
  },
  {
    id: 'sec-06-workshops',
    frameName: '06_Interactive_Workshop_Schedule',
    yOffset: 4796,
    height: 1320,
    themeMode: 'Brochure Colour Theme (Ice-Blue / Navy / Cyan / Amber)',
    backgroundFill: '#FFFFFF (Crisp Brochure White)',
    autoLayout: { direction: 'VERTICAL', padding: '112px 24px', itemSpacing: 32 },
    childComponents: [
      'Component/Button_Saved_Schedule_Counter',
      'Component/Toolbar_Day_And_Track_Filters (#F0F7FF)',
      'Component/Card_Workshop_Session_x8 (With Animated Capacity Bar)',
      'Component/Accordion_Key_Takeaways',
    ],
    interactionsCount: 16,
  },
  {
    id: 'sec-07-speakers-gallery',
    frameName: '07_Speakers_And_Visual_Archive_Gallery',
    yOffset: 6116,
    height: 1460,
    themeMode: 'Brochure Colour Theme (Ice-Blue / Navy / Cyan / Amber)',
    backgroundFill: 'LinearGradient(#F0F7FF -> #F4F8FC -> #FFFFFF)',
    autoLayout: { direction: 'VERTICAL', padding: '112px 24px', itemSpacing: 40 },
    childComponents: [
      'Component/Speaker_Selector_Cards_x5 (Active Navy + Amber Border)',
      'Component/Speaker_Spotlight_Bio_And_4Photo_Carousel',
      'Component/Drawer_160_Past_Exhibitors_Directory',
      'Component/Grid_20_Visual_Archive_Cards_With_Lightbox',
    ],
    interactionsCount: 19,
  },
  {
    id: 'sec-08-footer',
    frameName: '08_Exhibitor_Ticker_And_CODISSIA_Footer',
    yOffset: 7576,
    height: 460,
    themeMode: 'Brochure Colour Theme (Ice-Blue / Navy / Cyan / Amber)',
    backgroundFill: 'LinearGradient(135deg, #0F2557 -> #1E3A8A -> #0284C7)',
    autoLayout: { direction: 'VERTICAL', padding: '64px 24px', itemSpacing: 32 },
    childComponents: [
      'Component/Marquee_160_Exhibitors_Amber_Ribbon',
      'Component/Footer_3Col_Secretariat_Details',
      'Component/Floating_Scroll_Percentage_BackToTop_Pill',
    ],
    interactionsCount: 6,
  },
];

export const FIGMA_PROTOTYPE_INTERACTIONS: FigmaPrototypeInteraction[] = [
  {
    id: 'int-01-hero-video-loop',
    sourceNode: '01_Hero_Banner_Liquid_Glass / Video_Background',
    targetNode: '01_Hero_Banner_Liquid_Glass / Video_Crossfade_Loop',
    trigger: 'AFTER_TIMEOUT',
    actionType: 'SMART_ANIMATE',
    easingName: 'requestAnimationFrame Linear Crossfade (500ms)',
    physics: { type: 'LINEAR', durationMs: 500 },
    animatedProperties: ['opacity (0 -> 1 on canplay)', 'opacity (1 -> 0 at remaining <= 0.55s)'],
    description: 'Seamless crossfade to black and restart after 100ms gap.',
  },
  {
    id: 'int-02-liquid-glass-shimmer',
    sourceNode: 'Component/Navbar_Liquid_Glass_Pill [Variant=Default]',
    targetNode: 'Component/Navbar_Liquid_Glass_Pill [Variant=Hover_Shimmer]',
    trigger: 'WHILE_HOVERING',
    actionType: 'CHANGE_TO_VARIANT',
    easingName: 'Custom Cubic Bezier (0.16, 1, 0.3, 1)',
    physics: {
      type: 'CUBIC_BEZIER',
      durationMs: 750,
      bezier: [0.16, 1, 0.3, 1],
    },
    animatedProperties: [
      'shimmerGradientX (-120% -> +120%)',
      'background (rgba(255,255,255,0.01) -> rgba(255,255,255,0.05))',
      'innerShadow (1px -> 2px)',
    ],
    description: 'Sweeps a 115deg specular highlight across any .liquid-glass element on hover.',
  },
  {
    id: 'int-03-3d-tilt-card',
    sourceNode: 'Component/InteractiveTiltCard [Variant=Rest]',
    targetNode: 'Component/InteractiveTiltCard [Variant=3D_Perspective_Tilt]',
    trigger: 'WHILE_HOVERING',
    actionType: 'SMART_ANIMATE',
    easingName: 'Framer Spring (stiffness: 260, damping: 22)',
    physics: {
      type: 'SPRING',
      stiffness: 260,
      damping: 22,
      mass: 0.8,
      durationMs: 450,
    },
    animatedProperties: [
      'rotateX (+7deg to -7deg)',
      'rotateY (-7deg to +7deg)',
      'scale (1 -> 1.015)',
      'radialSpotlight (cursor X/Y tracking)',
    ],
    description: '3D perspective tilt with live radial cerulean/amber spotlight tracking cursor coordinates.',
  },
  {
    id: 'int-04-dual-image-crossfade',
    sourceNode: 'Component/DualImage_Card [State=Primary_Image]',
    targetNode: 'Component/DualImage_Card [State=Secondary_Process_Reveal]',
    trigger: 'WHILE_HOVERING',
    actionType: 'CHANGE_TO_VARIANT',
    easingName: 'Ease-Out Crossfade + Zoom (700ms)',
    physics: {
      type: 'CUBIC_BEZIER',
      durationMs: 700,
      bezier: [0.22, 1, 0.36, 1],
    },
    animatedProperties: [
      'primaryImage.opacity (1 -> 0)',
      'primaryImage.scale (1.0 -> 1.10)',
      'secondaryImage.opacity (0 -> 1)',
      'secondaryImage.scale (0.95 -> 1.05)',
    ],
    description: 'Crossfades between Buyer Audit <-> CNC Sparks, Casting <-> Forging, and Sparks <-> VMC Milling.',
  },
  {
    id: 'int-05-reel-auto-advance',
    sourceNode: '03_Featured_Exhibition_Reel / Scene_N',
    targetNode: '03_Featured_Exhibition_Reel / Scene_N+1',
    trigger: 'AFTER_TIMEOUT',
    actionType: 'SMART_ANIMATE',
    easingName: 'Ken-Burns Scale + Crossfade (4800ms cycle)',
    physics: {
      type: 'CUBIC_BEZIER',
      durationMs: 650,
      bezier: [0.4, 0, 0.2, 1],
    },
    animatedProperties: [
      'progressBar.width (0% -> 100% over 4800ms)',
      'sceneImage.scale (1.10 -> 1.00)',
      'floatingCard.y (18px -> 0px)',
    ],
    description: 'Auto-advances through the 4 brochure exhibition scenes with top progress bar and pause-on-hover.',
  },
  {
    id: 'int-06-scroll-parallax-reveal',
    sourceNode: 'All_Sections_01_To_08 [Viewport=Out]',
    targetNode: 'All_Sections_01_To_08 [Viewport=InView]',
    trigger: 'ON_SCROLL',
    actionType: 'SMART_ANIMATE',
    easingName: 'Re-Triggering Spring Reveal (once: false)',
    physics: {
      type: 'SPRING',
      stiffness: 180,
      damping: 20,
      durationMs: 600,
    },
    animatedProperties: [
      'opacity (0 -> 1)',
      'translateY (36px -> 0px)',
      'scale (0.94 -> 1.0)',
      'floatingGeometry.y (+60px -> -80px)',
    ],
    description: 'Every section, card, objective, process ribbon, workshop card, and gallery item animates on scroll up & down.',
  },
  {
    id: 'int-07-counter-and-capacity-fill',
    sourceNode: 'Component/KPI_Counter_And_Workshop_Capacity [State=Zero]',
    targetNode: 'Component/KPI_Counter_And_Workshop_Capacity [State=TargetValue]',
    trigger: 'ON_SCROLL',
    actionType: 'SMART_ANIMATE',
    easingName: 'Cubic Ease-Out Counter (1100ms)',
    physics: {
      type: 'CUBIC_BEZIER',
      durationMs: 1100,
      bezier: [0.22, 1, 0.36, 1],
    },
    animatedProperties: [
      'counterText (0 -> 98.4% / 86.1% / 250+ / ₹50 Cr+)',
      'capacityBar.width (0% -> 83%)',
    ],
    description: 'Counts up post-show survey metrics and fills workshop seat capacity bars when scrolled into view.',
  },
  {
    id: 'int-08-infinite-marquee-ribbons',
    sourceNode: 'Component/InfiniteMarqueeRibbon [x=0%]',
    targetNode: 'Component/InfiniteMarqueeRibbon [x=-50%]',
    trigger: 'AFTER_TIMEOUT',
    actionType: 'SMART_ANIMATE',
    easingName: 'Continuous Linear Loop (38s / 42s)',
    physics: { type: 'LINEAR', durationMs: 38000 },
    animatedProperties: ['translate3d (0% -> -50%)', 'animationPlayState (running -> paused on hover)'],
    description: 'Dual infinite tickers for the 12 Participating PSUs and 160+ Past Exhibitors.',
  },
];

/**
 * Generates W3C Design Tokens / Figma Variables JSON
 */
export function generateFigmaVariablesJson(): string {
  const tokens = {
    $schema: 'https://tr.designtokens.org/format/',
    meta: {
      name: 'SUBCON 2027 — Figma Variables & Animation Tokens',
      edition: EVENT_INFO.edition,
      organizer: EVENT_INFO.organizer,
      exportedAt: '2027-05-12T10:00:00Z',
    },
    color: {
      heroBannerAlone: {
        voidBlack: { $value: '#000000', $type: 'color', description: 'Hero Section 1 background' },
        liquidGlassSurface: { $value: 'rgba(255, 255, 255, 0.01)', $type: 'color' },
        liquidGlassHover: { $value: 'rgba(255, 255, 255, 0.05)', $type: 'color' },
        liquidGlassBorderStopTop: { $value: 'rgba(255, 255, 255, 0.45)', $type: 'color' },
        liquidGlassBorderStopMid: { $value: 'rgba(255, 255, 255, 0.15)', $type: 'color' },
      },
      brochureColourTheme: {
        iceBlueCanvas: { $value: '#F4F8FC', $type: 'color', description: 'Primary layout canvas' },
        skyTintSurface: { $value: '#F0F7FF', $type: 'color', description: 'Filter & secondary surface' },
        pureWhiteCard: { $value: '#FFFFFF', $type: 'color', description: 'Interactive 3D tilt card surface' },
        codissiaRoyalNavy: { $value: '#0F2557', $type: 'color', description: 'Primary brochure heading & active card navy' },
        codissiaDeepBlue: { $value: '#1E3A8A', $type: 'color', description: 'PSU & Footer gradient midpoint' },
        ceruleanCyan: { $value: '#0284C7', $type: 'color', description: 'Odd process ribbons & primary interactive accent' },
        industrialAmberGold: { $value: '#F59E0B', $type: 'color', description: 'Even process ribbons & saved schedule CTA' },
        amberHighlight: { $value: '#FBBF24', $type: 'color', description: 'Active border & badge highlight' },
        slateBodyText: { $value: '#475569', $type: 'color', description: 'Body copy on light brochure theme' },
        skyBorder: { $value: '#BAE6FD', $type: 'color', description: 'Card hairline border' },
      },
    },
    typography: {
      displayEditorial: {
        fontFamily: { $value: 'Instrument Serif', $type: 'fontFamily' },
        heroSize: { $value: '128px', $type: 'dimension' },
        sectionHeadingSize: { $value: '64px', $type: 'dimension' },
        styles: { $value: ['Regular', 'Italic'], $type: 'string' },
      },
      uiSans: {
        fontFamily: { $value: 'Plus Jakarta Sans', $type: 'fontFamily' },
        weights: { $value: [400, 500, 600, 700], $type: 'number' },
      },
    },
    motionAndSprings: {
      tilt3DSpring: {
        $type: 'transition',
        $value: {
          type: 'spring',
          stiffness: 260,
          damping: 22,
          mass: 0.8,
          maxTiltDeg: 7,
        },
      },
      scrollRevealSpring: {
        $type: 'transition',
        $value: {
          type: 'spring',
          stiffness: 180,
          damping: 20,
          retriggerOnScroll: true,
        },
      },
      liquidGlassShimmer: {
        $type: 'transition',
        $value: {
          duration: '750ms',
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        },
      },
      dualImageCrossfade: {
        $type: 'transition',
        $value: {
          duration: '700ms',
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        },
      },
    },
  };

  return JSON.stringify(tokens, null, 2);
}

/**
 * Generates the Complete Figma Document + Prototype Interaction JSON Spec
 */
export function generateFigmaDocumentJson(): string {
  const doc = {
    documentName: 'SUBCON 2027 — Full Interactive Landing Page & Smart-Animate Prototype',
    schemaVersion: 'Figma-REST-v1.4',
    canvasSize: { width: 3200, height: 8200 },
    pages: [
      {
        id: 'page-01-master-desktop',
        name: '01 · Desktop Landing Page (1440px · Full Top-to-Bottom Animations)',
        backgroundColor: '#E2E8F0',
        frames: FIGMA_SECTION_SPECS,
      },
      {
        id: 'page-02-interactive-components',
        name: '02 · Interactive Component Variants & 3D Tilt States',
        componentSets: [
          {
            name: 'ComponentSet / LiquidGlass_Navbar_And_Input',
            variants: ['State=Default', 'State=Hover_Shimmer_Sweep', 'State=Focus_Active'],
            cssSpec: 'backdrop-filter: blur(4px); background-blend-mode: luminosity; 1.4px xor mask gradient border',
          },
          {
            name: 'ComponentSet / InteractiveTiltCard_BrochureColour',
            variants: [
              'Variant=Color_Rest',
              'Variant=Color_Hover_3D_Tilt_NW',
              'Variant=Color_Hover_3D_Tilt_SE',
            ],
            prototypeReaction: 'WHILE_HOVERING -> SMART_ANIMATE (spring stiffness=260, damping=22)',
          },
          {
            name: 'ComponentSet / DualImage_Industrial_Crossfade',
            variants: [
              'Pair=BuyerAudit_To_CNCSparks (Default)',
              'Pair=BuyerAudit_To_CNCSparks (Hovered)',
              'Pair=Casting_To_Forging (Default)',
              'Pair=Casting_To_Forging (Hovered)',
              'Pair=CNCSparks_To_VMCMilling (Default)',
              'Pair=CNCSparks_To_VMCMilling (Hovered)',
            ],
            prototypeReaction: 'WHILE_HOVERING -> SMART_ANIMATE (700ms ease-out scale + opacity crossfade)',
          },
          {
            name: 'ComponentSet / CoreProcess_Ribbon_Button',
            variants: [
              'Row=Odd_Cyan_Active (#0284C7)',
              'Row=Even_Amber_Active (#F59E0B)',
              'Row=Default_IceBlue (#F4F8FC)',
            ],
          },
        ],
      },
      {
        id: 'page-03-prototype-noodles',
        name: '03 · Smart-Animate Prototype Flows & Triggers',
        interactions: FIGMA_PROTOTYPE_INTERACTIONS,
      },
    ],
    brochureDataPayload: {
      event: EVENT_INFO,
      impactStats: IMPACT_STATS,
      objectives: OBJECTIVES_LIST,
      participatingPsus: PARTICIPATING_PSUS,
      processesCount: PROCESS_CATEGORIES.length,
      workshopsCount: WORKSHOP_SESSIONS.length,
      speakersCount: SPEAKER_PROFILES.length,
    },
  };

  return JSON.stringify(doc, null, 2);
}

/**
 * Generates a 100% Vector Editable Multi-Frame SVG Artboard that can be dragged & dropped
 * directly onto any Figma Canvas to create editable Frames, Auto-Layout Groups, Gradients,
 * Text Nodes, and Prototype Callout Noodles.
 */
export function generateFigmaMasterSvg(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="2480" height="3600" viewBox="0 0 2480 3600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Hero Dark Liquid Glass Gradients -->
    <linearGradient id="heroBgGrad" x1="720" y1="0" x2="720" y2="620" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="55%" stop-color="#0B192C"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
    <linearGradient id="liquidStrokeGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.45"/>
      <stop offset="30%" stop-color="#FFFFFF" stop-opacity="0.12"/>
      <stop offset="70%" stop-color="#FFFFFF" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.45"/>
    </linearGradient>
    <!-- SUBCON 2027 Brochure Colour Theme Gradients -->
    <linearGradient id="iceBlueSectionGrad" x1="720" y1="660" x2="720" y2="1400" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#EBF4FC"/>
      <stop offset="60%" stop-color="#F4F8FC"/>
      <stop offset="100%" stop-color="#FFFFFF"/>
    </linearGradient>
    <linearGradient id="royalNavyBannerGrad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0F2557"/>
      <stop offset="50%" stop-color="#1E3A8A"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
    <linearGradient id="scrollProgressGrad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="50%" stop-color="#FBBF24"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
  </defs>

  <!-- FIGMA CANVAS BACKDROP -->
  <rect width="2480" height="3600" fill="#1E293B"/>

  <!-- CANVAS HEADER LABEL -->
  <g id="Figma_Canvas_Header">
    <text x="60" y="48" fill="#38BDF8" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700">
      FIGMA MASTER DESIGN &amp; SMART-ANIMATE PROTOTYPE FILE · SUBCON 2027 (10TH EDITION)
    </text>
    <text x="60" y="74" fill="#94A3B8" font-family="Plus Jakarta Sans, sans-serif" font-size="13">
      Drag and drop this .SVG file directly into Figma to edit all Frames, Component Variants, Colour Styles, and Prototype Flows
    </text>
  </g>

  <!-- ===================================================================== -->
  <!-- ARTBOARD 1: DESKTOP LANDING PAGE (1440px)                             -->
  <!-- ===================================================================== -->
  <g id="Artboard_01_Desktop_1440px" transform="translate(60, 100)">
    <rect width="1440" height="3400" rx="16" fill="#F4F8FC"/>

    <!-- Top Fixed Scroll Progress Bar -->
    <rect id="Component_TopScrollProgressBar" x="0" y="0" width="1440" height="6" fill="url(#scrollProgressGrad)"/>

    <!-- SECTION 1: HERO BANNER ALONE (Dark Liquid Glass + Seamless Video Concept) -->
    <g id="01_Hero_Banner_Liquid_Glass">
      <rect x="0" y="6" width="1440" height="600" fill="url(#heroBgGrad)"/>
      <circle cx="720" cy="340" r="240" fill="#0284C7" fill-opacity="0.14"/>
      <circle cx="650" cy="280" r="140" fill="#F59E0B" fill-opacity="0.12"/>

      <!-- Navbar Liquid Glass Pill -->
      <g id="Component_Navbar_Liquid_Glass_Pill" transform="translate(210, 30)">
        <rect width="1020" height="54" rx="27" fill="#FFFFFF" fill-opacity="0.04" stroke="url(#liquidStrokeGrad)" stroke-width="1.5"/>
        <circle cx="34" cy="27" r="10" stroke="#38BDF8" stroke-width="2"/>
        <text x="54" y="33" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700">SUBCON 2027</text>
        <text x="360" y="32" fill="#E2E8F0" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="500">About     Processes     Workshops     Speakers     Gallery</text>
        <rect x="870" y="10" width="134" height="34" rx="17" fill="#FFFFFF" fill-opacity="0.08" stroke="url(#liquidStrokeGrad)"/>
        <text x="900" y="31" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="600">Register Pass</text>
      </g>

      <!-- Hero Center Content -->
      <g id="Hero_Center_Stack" transform="translate(0, 150)">
        <circle cx="430" cy="16" r="4" fill="#FBBF24"/>
        <text x="720" y="20" text-anchor="middle" fill="#7DD3FC" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="600">
          10th Edition · 12th – 14th May 2027 · CODISSIA Trade Fair Complex, Coimbatore · MSMEs + PSUs
        </text>
        <text x="720" y="125" text-anchor="middle" fill="#FFFFFF" font-family="Instrument Serif, Georgia, serif" font-size="108">
          Know it <tspan font-style="italic" fill="#E0F2FE">all.</tspan>
        </text>

        <!-- Email Input Liquid Glass Pill -->
        <g id="Component_Email_Pill" transform="translate(430, 160)">
          <rect width="580" height="56" rx="28" fill="#FFFFFF" fill-opacity="0.04" stroke="url(#liquidStrokeGrad)" stroke-width="1.5"/>
          <text x="28" y="33" fill="#94A3B8" font-family="Plus Jakarta Sans, sans-serif" font-size="14">Enter your email</text>
          <circle cx="548" cy="28" r="21" fill="#FFFFFF"/>
          <text x="542" y="33" fill="#000000" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700">→</text>
        </g>

        <text x="720" y="252" text-anchor="middle" fill="#CBD5E1" font-family="Plus Jakarta Sans, sans-serif" font-size="13">
          SUBCON 2027 — Source For Successful Outsourcing. Connect with PSUs, OEMs &amp; Precision MSMEs.
        </text>

        <g id="Component_Button_Manifesto" transform="translate(595, 275)">
          <rect width="250" height="44" rx="22" fill="#FFFFFF" fill-opacity="0.05" stroke="url(#liquidStrokeGrad)" stroke-width="1.5"/>
          <text x="125" y="27" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="600">Explore Workshops &amp; Manifesto</text>
        </g>
      </g>
    </g>

    <!-- SECTION 1B: INFINITE PSU MARQUEE RIBBON -->
    <g id="01B_Infinite_PSU_Marquee_Ribbon" transform="translate(0, 606)">
      <rect width="1440" height="48" fill="#0F2557"/>
      <text x="28" y="29" fill="#FBBF24" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700">
        ★ PARTICIPATING PSUS (38s INFINITE MARQUEE):
      </text>
      <text x="340" y="29" fill="#E0F2FE" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="600">
        BEL · BEML · HAL · Ordnance Factory · BHEL · NLC India · Southern Railway · ICF · Cochin Shipyard · Mazagon Dock · BDL
      </text>
    </g>

    <!-- SECTION 2: ABOUT CODISSIA & 7 OBJECTIVES (Brochure Colour Theme) -->
    <g id="02_About_Section_Brochure_Colour_Theme" transform="translate(0, 654)">
      <rect width="1440" height="620" fill="url(#iceBlueSectionGrad)"/>
      <text x="140" y="64" fill="#0369A1" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700" letter-spacing="2">
        ● ABOUT US · THE FORCE BEHIND CODISSIA
      </text>
      <text x="140" y="122" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="46" font-weight="700">
        Pioneering <tspan font-family="Instrument Serif, Georgia, serif" font-style="italic" fill="#0284C7">industrial outsourcing</tspan> for minds that <tspan font-family="Instrument Serif, Georgia, serif" font-style="italic" fill="#D97706">create, build, and inspire.</tspan>
      </text>

      <!-- Left 3D Tilt Card -->
      <g id="Component_TiltCard_CODISSIA" transform="translate(140, 160)">
        <rect width="660" height="320" rx="24" fill="#FFFFFF" stroke="#BAE6FD" stroke-width="1.5"/>
        <text x="32" y="42" fill="#0369A1" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700">
          Organised by CODISSIA · 10th Edition · 12th – 14th May 2027
        </text>
        <text x="32" y="80" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="24" font-weight="700">
          SUBCON 2027 — A Source for Successful Outsourcing
        </text>
        <text x="32" y="116" fill="#475569" font-family="Plus Jakarta Sans, sans-serif" font-size="14">
          Connecting India’s premier MSMEs, Defence &amp; Central PSUs, and large private OEMs
        </text>
        <rect x="32" y="145" width="596" height="140" rx="16" fill="#0F2557"/>
        <text x="56" y="220" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700">
          CODISSIA Trade Fair Complex, Coimbatore (Ken-Burns 14s Loop + Hover Zoom)
        </text>
        <text x="56" y="248" fill="#FBBF24" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="600">
          250+ Exhibition Stalls · Hall A &amp; Hall B →
        </text>
      </g>

      <!-- Right 3D Tilt Card -->
      <g id="Component_TiltCard_Objectives" transform="translate(830, 160)">
        <rect width="470" height="320" rx="24" fill="#FFFFFF" stroke="#BAE6FD" stroke-width="1.5"/>
        <text x="32" y="42" fill="#D97706" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5">
          CORE MANDATE · BROCHURE OBJECTIVES
        </text>
        <text x="32" y="76" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="700">
          7 Strategic Objectives of SUBCON 2027
        </text>
        <text x="32" y="116" fill="#334155" font-family="Plus Jakarta Sans, sans-serif" font-size="13">✓ Identify potential MSME vendors for large industries</text>
        <text x="32" y="148" fill="#334155" font-family="Plus Jakarta Sans, sans-serif" font-size="13">✓ Dedicated PSU &amp; Defence vendor registration desks</text>
        <text x="32" y="180" fill="#334155" font-family="Plus Jakarta Sans, sans-serif" font-size="13">✓ Showcase Coimbatore cluster manufacturing competence</text>
        <text x="32" y="212" fill="#334155" font-family="Plus Jakarta Sans, sans-serif" font-size="13">✓ Align indigenous sourcing with Make in India</text>
        <rect x="290" y="252" width="148" height="40" rx="20" fill="#0284C7"/>
        <text x="364" y="277" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700">Get Visitor Pass ↗</text>
      </g>

      <!-- Participating PSUs Banner -->
      <g id="Component_PSU_Banner" transform="translate(140, 505)">
        <rect width="1160" height="90" rx="20" fill="url(#royalNavyBannerGrad)"/>
        <text x="32" y="36" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="700">
          Participating Defence &amp; Central Public Sector Undertakings (BEL · BEML · HAL · BHEL · NLC · ICF · Cochin Shipyard)
        </text>
        <text x="32" y="64" fill="#FDE047" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="600">
          Staggered Spring Grid Entrance (delay: idx * 40ms) + Hover Lift (-4px, scale 1.03)
        </text>
      </g>
    </g>

    <!-- SECTION 3 & 4: EXHIBITION REEL + INNOVATION X VISION -->
    <g id="03_04_Showcase_And_Philosophy" transform="translate(0, 1274)">
      <rect width="1440" height="660" fill="#FFFFFF"/>
      <!-- Reel Box -->
      <g id="Component_Exhibition_Reel_Stage" transform="translate(140, 30)">
        <rect width="1160" height="260" rx="24" fill="#0F2557" stroke="#BAE6FD" stroke-width="2"/>
        <rect x="0" y="0" width="740" height="5" fill="#FBBF24"/>
        <text x="36" y="46" fill="#FBBF24" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700">
          ★ INTERACTIVE 4-SCENE EXHIBITION FLOOR REEL (4.8s Auto-Advance + Ken-Burns Scale)
        </text>
        <rect x="36" y="130" width="520" height="104" rx="16" fill="#FFFFFF"/>
        <text x="56" y="162" fill="#0369A1" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700">LIVE MACHINERY DEMO · HALL A</text>
        <text x="56" y="190" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700">High-Speed CNC Fiber Laser &amp; Sheet Metal Cutting</text>
        <text x="56" y="214" fill="#475569" font-family="Plus Jakarta Sans, sans-serif" font-size="12">Scene Tabs: 01 Laser · 02 PRICOL Pavilion · 03 Heavy Forging · 04 ERFOLG Systems</text>
      </g>

      <!-- Philosophy + Animated Counters -->
      <g id="04_Innovation_x_Vision_Counters" transform="translate(140, 330)">
        <text x="0" y="54" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="52" font-weight="700">
          Innovation <tspan font-family="Instrument Serif, Georgia, serif" font-style="italic" fill="#0284C7">x</tspan> Vision
        </text>

        <!-- 4 KPI Counter Cards -->
        <g transform="translate(0, 90)">
          <rect x="0" y="0" width="272" height="160" rx="20" fill="#F4F8FC" stroke="#BAE6FD" stroke-width="1.5"/>
          <text x="24" y="64" fill="#0284C7" font-family="Instrument Serif, Georgia, serif" font-size="48">98.4%</text>
          <text x="24" y="96" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700">Exhibitor Recommendation</text>
          <text x="24" y="122" fill="#64748B" font-family="Plus Jakarta Sans, sans-serif" font-size="11">Animated Counter (0 -> 98.4%)</text>

          <rect x="296" y="0" width="272" height="160" rx="20" fill="#F4F8FC" stroke="#BAE6FD" stroke-width="1.5"/>
          <text x="320" y="64" fill="#D97706" font-family="Instrument Serif, Georgia, serif" font-size="48">86.1%</text>
          <text x="320" y="96" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700">Rated "Very Good" Quality</text>
          <text x="320" y="122" fill="#64748B" font-family="Plus Jakarta Sans, sans-serif" font-size="11">Animated Counter (0 -> 86.1%)</text>

          <rect x="592" y="0" width="272" height="160" rx="20" fill="#F4F8FC" stroke="#BAE6FD" stroke-width="1.5"/>
          <text x="616" y="64" fill="#0284C7" font-family="Instrument Serif, Georgia, serif" font-size="48">250+</text>
          <text x="616" y="96" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700">Exhibition Stalls &amp; Pavilions</text>
          <text x="616" y="122" fill="#64748B" font-family="Plus Jakarta Sans, sans-serif" font-size="11">Animated Counter (0 -> 250+)</text>

          <rect x="888" y="0" width="272" height="160" rx="20" fill="#F4F8FC" stroke="#BAE6FD" stroke-width="1.5"/>
          <text x="912" y="64" fill="#D97706" font-family="Instrument Serif, Georgia, serif" font-size="48">₹50 Cr+</text>
          <text x="912" y="96" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700">Projected Vendor Pipeline</text>
          <text x="912" y="122" fill="#64748B" font-family="Plus Jakarta Sans, sans-serif" font-size="11">Animated Counter (0 -> ₹50 Cr+)</text>
        </g>
      </g>
    </g>

    <!-- SECTION 5: PROCESSES, PARTS & SUB-ASSEMBLIES -->
    <g id="05_Processes_Parts_Matrix" transform="translate(0, 1934)">
      <rect width="1440" height="540" fill="#F4F8FC"/>
      <text x="140" y="60" fill="#0369A1" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700" letter-spacing="2">
        ● EXHIBITORS’ &amp; VISITORS’ PROFILE · BROCHURE PAGES 1, 3, 4, 5
      </text>
      <text x="140" y="106" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="38" font-weight="700">
        7 Core Processes (Alternating Cyan &amp; Amber Ribbons) + 15 Parts Categories
      </text>

      <!-- Alternating Cyan & Amber Ribbons -->
      <g id="Component_7_Process_Ribbons" transform="translate(140, 140)">
        <rect x="0" y="0" width="440" height="44" rx="12" fill="#0284C7"/>
        <text x="20" y="27" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700">01. Casting, Moulding &amp; Forging (Active Cyan)</text>

        <rect x="0" y="52" width="440" height="44" rx="12" fill="#FBBF24"/>
        <text x="20" y="79" fill="#0F172A" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700">02. Precision CNC Machining (Alternating Amber)</text>

        <rect x="0" y="104" width="440" height="44" rx="12" fill="#FFFFFF" stroke="#BAE6FD"/>
        <text x="20" y="131" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="600">03. Joining &amp; Fabrication (TIG / MIG / Soldering)</text>

        <rect x="0" y="156" width="440" height="44" rx="12" fill="#FFFFFF" stroke="#BAE6FD"/>
        <text x="20" y="183" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="600">04. Abrasive &amp; Super Finishing Process</text>

        <rect x="0" y="208" width="440" height="44" rx="12" fill="#FFFFFF" stroke="#BAE6FD"/>
        <text x="20" y="235" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="600">05. Sheet Metal · 06. Industrial Coatings · 07. Laser &amp; 3D</text>

        <!-- Process Detail Panel -->
        <rect x="470" y="0" width="690" height="320" rx="20" fill="#FFFFFF" stroke="#BAE6FD" stroke-width="1.5"/>
        <text x="502" y="46" fill="#0284C7" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700">PROCESS 01 · EXHIBITOR CAPABILITY DETAIL</text>
        <text x="502" y="82" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="24" font-weight="700">Casting, Moulding &amp; Forging</text>
        <text x="502" y="122" fill="#334155" font-family="Plus Jakarta Sans, sans-serif" font-size="14">✓ Centrifugal casting   ✓ Pressure die casting   ✓ Lost-wax investment casting</text>
        <text x="502" y="154" fill="#334155" font-family="Plus Jakarta Sans, sans-serif" font-size="14">✓ Sand &amp; shell moulding ✓ Blow moulding          ✓ Drop forge &amp; upset forging</text>
        <rect x="502" y="190" width="626" height="52" rx="12" fill="#FEF3C7" stroke="#F59E0B"/>
        <text x="522" y="221" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="600">
          Coimbatore supplies over 40% of South India’s precision industrial castings
        </text>
      </g>
    </g>

    <!-- SECTION 6 & 7: WORKSHOPS + SPEAKERS & VISUAL GALLERY -->
    <g id="06_07_Workshops_And_Speakers" transform="translate(0, 2474)">
      <rect width="1440" height="620" fill="#FFFFFF"/>
      <text x="140" y="60" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="38" font-weight="700">
        Workshop Schedule (8 Sessions) + 5 Keynote Speakers &amp; 20 Visual Archive Cards
      </text>

      <!-- Sample Workshop Card -->
      <g id="Component_Workshop_Card" transform="translate(140, 96)">
        <rect width="1160" height="180" rx="24" fill="#FFFFFF" stroke="#7DD3FC" stroke-width="1.5"/>
        <rect x="24" y="24" width="210" height="132" rx="16" fill="#0F2557"/>
        <text x="44" y="96" fill="#FBBF24" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700">Day 1 · 12th May 2027</text>
        <text x="260" y="48" fill="#0284C7" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700">PSU &amp; Defence Procurement · 10:00 AM – 11:30 AM · Hall A</text>
        <text x="260" y="82" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="20" font-weight="700">Inaugural Keynote: Make in India &amp; Strategic Outsourcing Roadmap 2027</text>
        <text x="260" y="114" fill="#475569" font-family="Plus Jakarta Sans, sans-serif" font-size="13">Speaker: Mrs. Vanitha Mohan (Chairman, PRICOL Limited &amp; Chief Guest)</text>
        <!-- Animated Capacity Bar -->
        <rect x="920" y="72" width="210" height="8" rx="4" fill="#E0F2FE"/>
        <rect x="920" y="72" width="174" height="8" rx="4" fill="#F59E0B"/>
        <rect x="960" y="104" width="170" height="40" rx="20" fill="#FBBF24"/>
        <text x="1045" y="129" text-anchor="middle" fill="#0F172A" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700">Saved in Schedule</text>
      </g>

      <!-- Speaker Cards Strip -->
      <g id="Component_Speaker_Cards_Row" transform="translate(140, 310)">
        <rect x="0" y="0" width="220" height="160" rx="18" fill="#0F2557" stroke="#FBBF24" stroke-width="2"/>
        <text x="20" y="42" fill="#FBBF24" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700">DAY 1 KEYNOTE (ACTIVE)</text>
        <text x="20" y="72" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700">Mrs. Vanitha Mohan</text>
        <text x="20" y="96" fill="#BAE6FD" font-family="Plus Jakarta Sans, sans-serif" font-size="12">Chairman, PRICOL Ltd</text>
        <text x="20" y="136" fill="#FBBF24" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700">4 Gallery Photos →</text>

        <rect x="235" y="0" width="220" height="160" rx="18" fill="#FFFFFF" stroke="#BAE6FD" stroke-width="1.5"/>
        <text x="255" y="42" fill="#0284C7" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700">CHAIRMAN</text>
        <text x="255" y="72" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700">Mr. V. Thirugnanam</text>
        <text x="255" y="96" fill="#475569" font-family="Plus Jakarta Sans, sans-serif" font-size="12">Chairman, SUBCON 2027</text>

        <rect x="470" y="0" width="220" height="160" rx="18" fill="#FFFFFF" stroke="#BAE6FD" stroke-width="1.5"/>
        <text x="490" y="42" fill="#0284C7" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700">PSU NODAL LEAD</text>
        <text x="490" y="72" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700">Dr. K. Senthil Kumar</text>
        <text x="490" y="96" fill="#475569" font-family="Plus Jakarta Sans, sans-serif" font-size="12">HAL / BEL / BEML Panel</text>

        <rect x="705" y="0" width="220" height="160" rx="18" fill="#FFFFFF" stroke="#BAE6FD" stroke-width="1.5"/>
        <text x="725" y="42" fill="#0284C7" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700">METALLURGY CHAIR</text>
        <text x="725" y="72" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700">Er. S. Karthikeyan</text>
        <text x="725" y="96" fill="#475569" font-family="Plus Jakarta Sans, sans-serif" font-size="12">Foundry Cluster Council</text>

        <rect x="940" y="0" width="220" height="160" rx="18" fill="#FFFFFF" stroke="#BAE6FD" stroke-width="1.5"/>
        <text x="960" y="42" fill="#0284C7" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700">INDUSTRY 4.0 LEAD</text>
        <text x="960" y="72" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700">Er. R. Shanmugam</text>
        <text x="960" y="96" fill="#475569" font-family="Plus Jakarta Sans, sans-serif" font-size="12">TANCAM Smart Mfg</text>
      </g>
    </g>

    <!-- SECTION 8: 160+ EXHIBITOR MARQUEE & ROYAL NAVY FOOTER -->
    <g id="08_Footer_And_Exhibitor_Ticker" transform="translate(0, 3094)">
      <rect width="1440" height="48" fill="#FBBF24"/>
      <text x="28" y="29" fill="#0F2557" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700">
        ★ 160+ PAST EXHIBITORS (42s REVERSE MARQUEE): PRICOL LIMITED · ERFOLG · ALPINE INDUSTRIAL · ROOTS · SHANTHI GEARS · LMW
      </text>
      <rect y="48" width="1440" height="258" fill="url(#royalNavyBannerGrad)"/>
      <text x="140" y="114" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="700">
        SUBCON 2027 · 10th Edition — Organised by CODISSIA
      </text>
      <text x="140" y="148" fill="#E0F2FE" font-family="Plus Jakarta Sans, sans-serif" font-size="13">
        CODISSIA G.D. Naidu Towers, Huzur Road, Coimbatore - 641 018 · +91 422 2222396 / 2222397 · subcon@codissia.com
      </text>
      <text x="140" y="240" fill="#BAE6FD" font-family="Plus Jakarta Sans, sans-serif" font-size="12">
        © 2027 CODISSIA Intec Technology Centre. All rights reserved.
      </text>
    </g>
  </g>

  <!-- ===================================================================== -->
  <!-- ARTBOARD 2: SMART-ANIMATE PROTOTYPE & INTERACTION VARIANTS (860px)     -->
  <!-- ===================================================================== -->
  <g id="Artboard_02_Interactive_Variants_And_Smart_Animate" transform="translate(1560, 100)">
    <rect width="860" height="3400" rx="16" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
    <text x="40" y="56" fill="#FBBF24" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="700">
      PROTOTYPE INTERACTIONS &amp; SMART-ANIMATE FLOWS
    </text>
    <text x="40" y="84" fill="#94A3B8" font-family="Plus Jakarta Sans, sans-serif" font-size="13">
      Component Set States, Spring Physics Curves &amp; Trigger Wiring (ON_HOVER · ON_SCROLL · AFTER_TIMEOUT)
    </text>

    ${FIGMA_PROTOTYPE_INTERACTIONS.map((inter, idx) => {
      const y = 120 + idx * 240;
      return `
    <g id="Prototype_Spec_${inter.id}" transform="translate(40, ${y})">
      <rect width="780" height="210" rx="18" fill="#1E293B" stroke="#38BDF8" stroke-opacity="0.4" stroke-width="1.5"/>
      <rect x="24" y="22" width="160" height="28" rx="14" fill="#0284C7"/>
      <text x="104" y="40" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700">
        ${inter.trigger} → ${inter.actionType}
      </text>
      <text x="200" y="41" fill="#FBBF24" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700">
        ${inter.easingName}
      </text>
      <text x="24" y="80" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700">
        ${inter.sourceNode}  ━━●━━►  ${inter.targetNode}
      </text>
      <text x="24" y="112" fill="#CBD5E1" font-family="Plus Jakarta Sans, sans-serif" font-size="13">
        ${inter.description}
      </text>
      <text x="24" y="148" fill="#38BDF8" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="600">
        Animated Properties: ${inter.animatedProperties.join('  |  ')}
      </text>
      <text x="24" y="180" fill="#94A3B8" font-family="Plus Jakarta Sans, sans-serif" font-size="11">
        Physics: ${inter.physics.type} · Duration: ${inter.physics.durationMs}ms ${
        inter.physics.stiffness ? `· Stiffness: ${inter.physics.stiffness} · Damping: ${inter.physics.damping}` : ''
      }
      </text>
    </g>`;
    }).join('\n')}
  </g>
</svg>`;
}

/**
 * Generates a ready-to-paste Figma Plugin / Developer Console Script that builds
 * all Color Styles, Frames, Auto-Layout Sections, and Smart-Animate Component Sets
 * directly inside Figma (Plugins -> Development -> Open Console).
 */
export function generateFigmaConsolePluginScript(): string {
  return `// ============================================================================
// SUBCON 2027 — NATIVE FIGMA BUILDER & SMART-ANIMATE PROTOTYPE SCRIPT
// How to run in Figma Desktop or Web:
// 1. Open any Figma Design file
// 2. Go to Menu -> Plugins -> Development -> Open Console
// 3. Paste this entire script and press Enter!
// ============================================================================
(async () => {
  const hexToRgb = (hex) => {
    const clean = hex.replace('#', '');
    const num = parseInt(clean, 16);
    return {
      r: ((num >> 16) & 255) / 255,
      g: ((num >> 8) & 255) / 255,
      b: (num & 255) / 255,
    };
  };

  // Load fonts in Figma
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });

  // 1. Create Official SUBCON 2027 Color Styles
  const palette = [
    { name: 'SUBCON/Hero/Void Black', hex: '#000000' },
    { name: 'SUBCON/Brochure/Ice Blue Canvas', hex: '#F4F8FC' },
    { name: 'SUBCON/Brochure/Sky Filter Tint', hex: '#F0F7FF' },
    { name: 'SUBCON/Brochure/CODISSIA Royal Navy', hex: '#0F2557' },
    { name: 'SUBCON/Brochure/Cerulean Cyan', hex: '#0284C7' },
    { name: 'SUBCON/Brochure/Industrial Amber Gold', hex: '#F59E0B' },
    { name: 'SUBCON/Brochure/Pure White Card', hex: '#FFFFFF' },
  ];

  palette.forEach((p) => {
    const style = figma.createPaintStyle();
    style.name = p.name;
    style.paints = [{ type: 'SOLID', color: hexToRgb(p.hex) }];
  });

  // 2. Create Master 1440px Desktop Landing Frame with Auto-Layout
  const rootFrame = figma.createFrame();
  rootFrame.name = 'SUBCON 2027 — 1440px Desktop Landing (Full Animations)';
  rootFrame.resize(1440, 8036);
  rootFrame.layoutMode = 'VERTICAL';
  rootFrame.itemSpacing = 0;
  rootFrame.fills = [{ type: 'SOLID', color: hexToRgb('#F4F8FC') }];

  const sections = ${JSON.stringify(
    FIGMA_SECTION_SPECS.map((s) => ({
      name: s.frameName,
      height: s.height,
      themeMode: s.themeMode,
      children: s.childComponents,
    })),
    null,
    2
  )};

  for (const sec of sections) {
    const secFrame = figma.createFrame();
    secFrame.name = sec.name;
    secFrame.resize(1440, sec.height);
    secFrame.layoutAlign = 'STRETCH';
    secFrame.layoutMode = 'VERTICAL';
    secFrame.paddingTop = 48;
    secFrame.paddingBottom = 48;
    secFrame.paddingLeft = 80;
    secFrame.paddingRight = 80;
    secFrame.itemSpacing = 20;

    const isHero = sec.name.includes('01_Hero');
    const isNavy = sec.name.includes('01B_') || sec.name.includes('08_');
    secFrame.fills = [
      {
        type: 'SOLID',
        color: hexToRgb(isHero ? '#000000' : isNavy ? '#0F2557' : '#F4F8FC'),
      },
    ];

    const title = figma.createText();
    title.fontName = { family: 'Inter', style: 'Bold' };
    title.fontSize = 28;
    title.characters = sec.name + ' (' + sec.themeMode + ')';
    title.fills = [
      { type: 'SOLID', color: hexToRgb(isHero || isNavy ? '#FFFFFF' : '#0F2557') },
    ];
    secFrame.appendChild(title);

    for (const childName of sec.children) {
      const card = figma.createFrame();
      card.name = childName;
      card.resize(1280, 68);
      card.cornerRadius = 16;
      card.layoutMode = 'HORIZONTAL';
      card.paddingLeft = 24;
      card.paddingRight = 24;
      card.primaryAxisAlignItems = 'SPACE_BETWEEN';
      card.counterAxisAlignItems = 'CENTER';
      card.fills = [
        {
          type: 'SOLID',
          color: hexToRgb(isHero ? '#111827' : '#FFFFFF'),
          opacity: isHero ? 0.65 : 1,
        },
      ];

      const label = figma.createText();
      label.fontName = { family: 'Inter', style: 'Bold' };
      label.fontSize = 15;
      label.characters = childName;
      label.fills = [
        { type: 'SOLID', color: hexToRgb(isHero ? '#38BDF8' : '#0F2557') },
      ];
      card.appendChild(label);

      const animTag = figma.createText();
      animTag.fontName = { family: 'Inter', style: 'Regular' };
      animTag.fontSize = 12;
      animTag.characters = 'SMART_ANIMATE · Spring (stiffness: 260, damping: 22) · Scroll Reveal (once: false)';
      animTag.fills = [
        { type: 'SOLID', color: hexToRgb(isHero ? '#FBBF24' : '#0284C7') },
      ];
      card.appendChild(animTag);

      secFrame.appendChild(card);
    }

    rootFrame.appendChild(secFrame);
  }

  figma.currentPage.appendChild(rootFrame);
  figma.viewport.scrollAndZoomIntoView([rootFrame]);
  figma.notify('✅ SUBCON 2027 Design & Smart-Animate Frames created!');
})();`;
}
