import React, { useEffect, useRef, useState } from 'react';
import HangingIDCard from './HangingIDCard';
import LogoLoop from './LogoLoop/LogoLoop';
const aboutImage = 'https://res.cloudinary.com/drjkfozmr/image/upload/v1787580344/2e78682f903a565219e1bad3df2f0ead_zxcakg.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiTailwindcss,
  SiGsap,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiGit,
  SiGithub,
  SiNetlify,
  SiVercel,
  SiNodedotjs,
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const frontendSkills = ["Sea Freight", "Air Freight", "Land Freight", "Customs Clearance", "Freight Forwarding", "Freight Negotiation", "Shipment Coordination"];
const backendSkills = ["Zendesk", "Salesforce Service Cloud", "CRM Management", "Client Handling", "VAT Compliance", "Logistics Management"];

// Each technology appears exactly once — LogoLoop handles the seamless
// infinite-scroll duplication internally.
const techLogos = [
  { Icon: SiTailwindcss, label: 'Tailwind CSS' },
  { Icon: SiGsap, label: 'GSAP' },
  { Icon: SiJavascript, label: 'JavaScript' },
  { Icon: SiHtml5, label: 'HTML5' },
  { Icon: SiCss, label: 'CSS3' },
  { Icon: SiReact, label: 'React' },
  { Icon: SiNextdotjs, label: 'Next.js' },
  { Icon: SiGit, label: 'Git' },
  { Icon: SiGithub, label: 'GitHub' },
  { Icon: SiNetlify, label: 'Netlify' },
  { Icon: SiVercel, label: 'Vercel' },
  { Icon: SiNodedotjs, label: 'Node.js' },
  // Web3Forms intentionally omitted — see note to Heena: no Simple Icons
  // entry exists for it, and the real logo asset couldn't be fetched from
  // web3forms.com in this environment. Add it here once the SVG is on hand.
];

const aboutWords = [
  { text: "Hey," }, { text: "I'm" },
  { text: "Heena.", className: "font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400" },
  { text: "A" }, { text: "Freight" }, { text: "Broker" }, { text: "and" }, { text: "Logistics" }, { text: "Specialist" }, { text: "with" }, { text: "an" }, { text: "Electrical" }, { text: "Engineering" }, { text: "background" }, { text: "and" }, { text: "4+" }, { text: "years" }, { text: "of" }, { text: "experience" }, { text: "in" }, { text: "international" }, { text: "freight" }, { text: "forwarding." },
  { text: "I" }, { text: "specialize" }, { text: "in" },
  { text: "air,", className: "text-white font-medium" },
  { text: "sea,", className: "text-white font-medium" },
  { text: "and" },
  { text: "land", className: "text-white font-medium" },
  { text: "logistics" }, { text: "across" }, { text: "the" }, { text: "GCC," }, { text: "Asia," }, { text: "and" }, { text: "global" }, { text: "trade" }, { text: "corridors." },
  { text: "I" }, { text: "also" }, { text: "built" }, { text: "my" }, { text: "own" }, { text: "freight" }, { text: "brokerage" }, { text: "website" }, { text: "to" }, { text: "showcase" }, { text: "my" }, { text: "expertise" }, { text: "and" }, { text: "connect" }, { text: "businesses" }, { text: "with" }, { text: "reliable" }, { text: "global" }, { text: "shipping" }, { text: "solutions," }, { text: "driven" }, { text: "by" },
  { text: "efficiency,", className: "text-white font-medium" },
  { text: "growth,", className: "text-white font-medium" },
  { text: "and" },
  { text: "global trade.", className: "text-white font-medium" }
];

const About = () => {
  const textRef = useRef(null);
  const introMobileRef = useRef(null);
  const introDesktopRef = useRef(null);
  const techStackRef = useRef(null);
  const [techStackVisible, setTechStackVisible] = useState(false);

  // Tech Stack heading — reveal via IntersectionObserver (25% visible)
  useEffect(() => {
    const el = techStackRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTechStackVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const headings = [introMobileRef.current, introDesktopRef.current];
    
    headings.forEach((heading) => {
      if (heading) {
        gsap.fromTo(
          heading,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    if (textRef.current) {
      const words = textRef.current.querySelectorAll('.word');
      gsap.fromTo(
        words,
        { color: '#52525b', opacity: 0.2 },
        {
          color: '#ffffff',
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            end: 'bottom 50%',
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen bg-[#050505] text-white pt-24 pb-0 px-6 md:px-16 flex flex-col justify-between relative overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 15% 20%, rgba(204,255,0,0.07), transparent 35%), radial-gradient(circle at 85% 65%, rgba(204,255,0,0.05), transparent 35%), #050505',
      }}
    >
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#ccff00]/[0.06] blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#ccff00]/[0.05] blur-[130px] pointer-events-none z-0"></div>


      <div className="max-w-7xl mx-auto w-full z-10">

        {/* Mobile Intro Text (Visible only on mobile/tablet) */}
        <h2 ref={introMobileRef} className="lg:hidden text-center text-[18vw] md:text-[8rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl leading-none mb-10 md:mb-16">
          Intro
        </h2>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">

          {/* Left Column - Image */}
          <div className="flex justify-center lg:justify-start pl-0 lg:pl-20">
            <HangingIDCard
              image={aboutImage}
              name="Heena Rather"
              title="Freight Broker & Logistics Specialist"
              tagline="Building seamless connections across the globe."
              strapLabel="HEENA RATHER"
            />
          </div>

          {/* Right Column - Text Content */}
          <div className="flex flex-col justify-center space-y-8 z-10 w-full px-4 md:px-0">
            {/* Desktop Intro Text (Visible only on desktop) */}
            <h2 ref={introDesktopRef} className="hidden lg:block text-[11rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl leading-none">
              Intro
            </h2>
            <div className="relative bg-white/5 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/[0.07] transition-colors duration-300 text-center lg:text-left">
              <p ref={textRef} className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed font-light">
                {aboutWords.map((wordObj, index) => (
                  <React.Fragment key={index}>
                    <span className={`word ${wordObj.className || ''}`}>
                      {wordObj.text}
                    </span>
                    {index < aboutWords.length - 1 && " "}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Scrolling Skills Marquee */}
      <div className="flex flex-col border-t border-white/5 bg-[#030303] pt-16 md:pt-20 pb-4 mt-auto -mx-6 md:-mx-16">
        <h2
          ref={techStackRef}
          className="text-center text-[9vw] md:text-[3.75rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl leading-none mb-4 md:mb-6 px-6 md:px-16"
          style={{
            opacity: techStackVisible ? 1 : 0,
            transform: techStackVisible ? 'translateY(0)' : 'translateY(55px)',
            filter: techStackVisible ? 'blur(0px)' : 'blur(7px)',
            transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(.22, 1, .36, 1), filter 0.9s ease',
          }}
        >
          Tech Stack
        </h2>
        {/* First Row */}
        <div className="flex overflow-hidden whitespace-nowrap mb-2">
          <div className="flex animate-marquee w-max">
            {[...frontendSkills, ...frontendSkills, ...frontendSkills, ...frontendSkills].map((item, i) => (
              <div key={`front-${i}`} className="flex items-center">
                <span className="text-gray-400 font-medium tracking-widest px-4 md:px-8 text-sm md:text-lg">{item}</span>
                <span className="text-gray-700 font-bold px-2 md:px-4">.</span>
              </div>
            ))}
          </div>
        </div>
        {/* Second Row */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee-reverse w-max">
            {[...backendSkills, ...backendSkills, ...backendSkills, ...backendSkills].map((item, i) => (
              <div key={`back-${i}`} className="flex items-center">
                <span className="text-gray-400 font-medium tracking-widest px-4 md:px-8 text-sm md:text-lg">{item}</span>
                <span className="text-gray-700 font-bold px-2 md:px-4">.</span>
              </div>
            ))}
          </div>
        </div>
        {/* Technology logo loop — replaces the old scrolling tech-name rows */}
        <div className="mt-4 px-6 md:px-16">
          <LogoLoop
            logos={techLogos}
            speed={80}
            direction="left"
            logoHeight={48}
            gap={55}
            hoverSpeed={0}
            scaleOnHover
            fadeOut={false}
            ariaLabel="Technology stack"
          />
        </div>
      </div>

    </section>
  );
};

export default About;
