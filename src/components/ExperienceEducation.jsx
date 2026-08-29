import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experience = [
  {
    icon: '✈',
    status: 'Current',
    year: '2024 — PRESENT',
    title: 'Freight Broker',
    company: 'Caribbean Global Shipping LLC',
    location: 'Dubai, UAE',
    date: 'AUG 2024 — PRESENT',
    desc: 'Managing international shipments across air, sea and land freight while coordinating clients, carriers, customs and documentation.',
    skills: ['Freight Forwarding', 'Ocean Freight', 'Air Freight', 'Client Relations'],
  },
  {
    icon: '⚙',
    status: null,
    year: '2023 — 2024',
    title: 'Service Operations Associate',
    company: 'Seagull Technologies LLC',
    location: 'Dubai, UAE',
    date: 'JAN 2023 — APR 2024',
    desc: 'Supported service operations, customer communication and day-to-day operational coordination.',
    skills: ['Operations', 'Customer Service', 'Coordination', 'CRM'],
  },
  {
    icon: '◉',
    status: null,
    year: '2022',
    title: 'Customer Service Representative',
    company: 'Teleperformance',
    location: 'India · Remote',
    date: '2022',
    desc: 'Managed customer interactions and support requests while maintaining service quality and resolution standards.',
    skills: ['Customer Support', 'Communication', 'Problem Solving'],
  },
];

const education = {
  year: '2018 — 2022',
  degree: 'B.TECH',
  title: 'Electrical Engineering',
  university: 'Engineering • Technology',
  location: 'India',
  desc: 'Built a strong technical foundation in engineering, analytical thinking, technology and problem solving.',
  date: '2018 — 2022',
};

const ExperienceEducation = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const myJourneyRef = useRef(null);
  const [myJourneyVisible, setMyJourneyVisible] = useState(false);

  // My Journey heading — reveal via IntersectionObserver (25% visible)
  useEffect(() => {
    const el = myJourneyRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMyJourneyVisible(true);
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
    const section = sectionRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!section || !track || !viewport) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 701px)', () => {
        // Distance must be measured against the actual clipping box
        // (.sticky-timeline), not window.innerWidth — the timeline lives
        // inside `.container` (max-width: min(1400px, 92%)), so on wide
        // screens the real visible width is narrower than the window.
        const getDistance = () => Math.max(0, Math.ceil(track.scrollWidth - viewport.clientWidth));

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Re-measure once everything (fonts/layout) has fully settled,
        // in case initial mount measured before final layout.
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener('load', refresh);

        const ro = new ResizeObserver(() => ScrollTrigger.refresh());
        ro.observe(track);
        ro.observe(viewport);

        return () => {
          window.removeEventListener('load', refresh);
          ro.disconnect();
          tween.scrollTrigger && tween.scrollTrigger.kill();
        };
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div className="exp-edu-wrap">
      <style>{`
        .exp-edu-wrap {
          font-family: Arial, Helvetica, sans-serif;
          position: relative;
          background:
            radial-gradient(circle at 15% 15%, rgba(204,255,0,.15), transparent 30%),
            radial-gradient(circle at 85% 70%, rgba(204,255,0,.10), transparent 30%),
            #050505;
          color: white;
          overflow-x: hidden;
        }

        .exp-edu-wrap::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,.45) 1px, transparent 1px);
          background-size: 70px 70px;
          opacity: .07;
          pointer-events: none;
          z-index: 0;
        }

        .exp-edu-wrap::after {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          left: 50%;
          top: 30%;
          transform: translate(-50%, -50%);
          background: #ccff00;
          filter: blur(220px);
          opacity: .06;
          pointer-events: none;
          z-index: 0;
        }

        .exp-edu-wrap .container {
          position: relative;
          z-index: 2;
          width: min(1400px, 92%);
          margin: auto;
          padding: 100px 0;
        }

        .exp-edu-wrap .heading { margin-bottom: 100px; }

        .exp-edu-wrap .heading .small {
          color: #ccff00;
          font-size: 13px;
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-bottom: 20px;
          text-align: center;
        }

        .exp-edu-wrap .heading-main {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 55px;
        }

        .exp-edu-wrap .heading h1 {
          font-size: clamp(42px, 6vw, 82px);
          line-height: 1;
          font-weight: 700;
          letter-spacing: -4px;
          white-space: nowrap;
        }

        .exp-edu-wrap .heading h1 span { color: #ccff00; }

        .exp-edu-wrap .heading p {
          max-width: 650px;
          margin: 30px auto 0;
          color: #8e8e99;
          line-height: 1.7;
          text-align: center;
          font-size: 15px;
        }

        .exp-edu-wrap .orbit {
          position: relative;
          width: 155px;
          height: 155px;
          flex-shrink: 0;
          perspective: 700px;
        }

        .exp-edu-wrap .orbit-core {
          position: absolute;
          width: 82px;
          height: 82px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle at 32% 25%, #eaffb0 0%, #ccff00 20%, #8fb800 42%, #2b3600 72%, #09040f 100%);
          box-shadow: 0 0 20px rgba(204,255,0,.9), 0 0 50px rgba(204,255,0,.55), 0 0 100px rgba(204,255,0,.25);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          border: 1px solid rgba(255,255,255,.25);
        }

        .exp-edu-wrap .orbit-core span {
          color: white;
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 2px;
          text-shadow: 0 0 10px rgba(255,255,255,.7);
        }

        .exp-edu-wrap .orbit-ring {
          position: absolute;
          inset: 5px;
          border: 1px solid rgba(204,255,0,.65);
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(204,255,0,.3), inset 0 0 10px rgba(204,255,0,.1);
        }

        .exp-edu-wrap .orbit-ring:nth-child(1) { animation: orbitRotate 10s linear infinite; }
        .exp-edu-wrap .orbit-ring.ring-horizontal { transform: rotateX(70deg) rotateZ(20deg); animation: orbitHorizontal 7s linear infinite; }
        .exp-edu-wrap .orbit-ring.ring-vertical { transform: rotateY(70deg) rotateZ(15deg); animation: orbitVertical 9s linear infinite; }

        .exp-edu-wrap .orbit-dot {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #eaffb0;
          box-shadow: 0 0 10px #ccff00, 0 0 25px #ccff00, 0 0 40px #ccff00;
          top: 7px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 15;
          animation: dotPulse 2s ease-in-out infinite;
        }

        @keyframes orbitRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbitHorizontal { from { transform: rotateX(70deg) rotateZ(0deg); } to { transform: rotateX(70deg) rotateZ(360deg); } }
        @keyframes orbitVertical { from { transform: rotateY(70deg) rotateZ(0deg); } to { transform: rotateY(70deg) rotateZ(360deg); } }
        @keyframes dotPulse { 0%,100% { transform: translateX(-50%) scale(1); } 50% { transform: translateX(-50%) scale(1.6); } }

        .exp-edu-wrap .horizontal-section { position: relative; }

        .exp-edu-wrap .sticky-timeline {
          position: relative;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .exp-edu-wrap .timeline-track {
          position: relative;
          width: max-content;
          height: 650px;
          display: flex;
          align-items: center;
          gap: 80px;
          padding-left: 10vw;
          padding-right: 10vw;
          will-change: transform;
        }

        .exp-edu-wrap .timeline-line {
          position: absolute;
          left: 10vw;
          right: 10vw;
          top: 50%;
          height: 2px;
          transform: translateY(-50%);
          background: linear-gradient(to right, transparent, #ccff00 5%, #eaffb0 50%, #ccff00 95%, transparent);
          box-shadow: 0 0 15px #ccff00, 0 0 40px rgba(204,255,0,.5);
          z-index: 1;
        }

        .exp-edu-wrap .timeline-item {
          position: relative;
          width: 330px;
          height: 650px;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          z-index: 2;
        }

        .exp-edu-wrap .timeline-item:nth-child(2),
        .exp-edu-wrap .timeline-item:nth-child(4) {
          align-items: flex-start;
          padding-top: 20px;
        }

        .exp-edu-wrap .timeline-item:nth-child(3),
        .exp-edu-wrap .timeline-item:nth-child(5) {
          align-items: flex-end;
          padding-bottom: 20px;
        }

        .exp-edu-wrap .node {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 20px;
          height: 20px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: #09090c;
          border: 3px solid #ccff00;
          box-shadow: 0 0 0 7px rgba(204,255,0,.08), 0 0 25px #ccff00, 0 0 50px rgba(204,255,0,.6);
          z-index: 20;
        }

        .exp-edu-wrap .connector {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 1px;
          height: 115px;
          transform: translateX(-50%);
          background: linear-gradient(to bottom, #ccff00, rgba(204,255,0,.05));
          z-index: 3;
        }

        .exp-edu-wrap .timeline-item:nth-child(3) .connector,
        .exp-edu-wrap .timeline-item:nth-child(5) .connector {
          transform: translateX(-50%) rotate(180deg);
        }

        .exp-edu-wrap .year {
          color: #ccff00;
          font-size: 11px;
          letter-spacing: 3px;
          margin-bottom: 12px;
          font-weight: bold;
        }

        .exp-edu-wrap .card {
          position: relative;
          width: 330px;
          min-height: 300px;
          padding: 28px;
          border-radius: 22px;
          background: linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.025));
          border: 1px solid rgba(255,255,255,.10);
          backdrop-filter: blur(20px);
          transition: .5s ease;
          overflow: hidden;
        }

        .exp-edu-wrap .card::before {
          content: "";
          position: absolute;
          width: 200px;
          height: 200px;
          background: #ccff00;
          filter: blur(100px);
          opacity: .08;
          top: -100px;
          right: -100px;
          pointer-events: none;
        }

        .exp-edu-wrap .card:hover {
          transform: translateY(-8px) scale(1.025);
          border-color: rgba(204,255,0,.6);
          box-shadow: 0 20px 70px rgba(0,0,0,.5), 0 0 40px rgba(204,255,0,.12);
        }

        .exp-edu-wrap .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .exp-edu-wrap .icon {
          width: 45px;
          height: 45px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(204,255,0,.12);
          border: 1px solid rgba(204,255,0,.25);
          font-size: 20px;
        }

        .exp-edu-wrap .status {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 7px 10px;
          border-radius: 20px;
          background: rgba(204,255,0,.1);
          color: #ccff00;
        }

        .exp-edu-wrap .card h2 { font-size: 22px; line-height: 1.25; margin-bottom: 8px; }

        .exp-edu-wrap .company { color: #ffffff; font-size: 14px; margin-bottom: 5px; }
        .exp-edu-wrap .location { color: #e5e5e5; font-size: 12px; margin-bottom: 18px; }
        .exp-edu-wrap .date { color: #ccff00; font-size: 10px; letter-spacing: 2px; margin-bottom: 18px; }
        .exp-edu-wrap .description { color: #e5e5ea; font-size: 13px; line-height: 1.7; }

        .exp-edu-wrap .skills { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 18px; }

        .exp-edu-wrap .skills span {
          font-size: 10px;
          padding: 7px 10px;
          border-radius: 20px;
          color: #e5e5e5;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.07);
        }

        .exp-edu-wrap .education-card {
          width: 330px;
          min-height: 300px;
          padding: 28px;
          border-radius: 22px;
          background: linear-gradient(135deg, rgba(204,255,0,.15), rgba(255,255,255,.03));
          border: 1px solid rgba(204,255,0,.30);
          backdrop-filter: blur(20px);
          transition: .5s ease;
          overflow: hidden;
        }

        .exp-edu-wrap .education-card:hover {
          transform: translateY(-8px) scale(1.025);
          box-shadow: 0 30px 80px rgba(0,0,0,.4), 0 0 40px rgba(204,255,0,.12);
        }

        .exp-edu-wrap .education-icon {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: rgba(204,255,0,.15);
          border: 1px solid rgba(204,255,0,.3);
          font-size: 20px;
          margin-bottom: 18px;
        }

        .exp-edu-wrap .degree { color: #ccff00; font-size: 11px; letter-spacing: 3px; margin-bottom: 14px; }

        .exp-edu-wrap .education-card h2 { font-size: 24px; line-height: 1.25; margin-bottom: 10px; }

        .exp-edu-wrap .education-card .university { color: #ffffff; font-size: 14px; margin-bottom: 7px; }
        .exp-edu-wrap .education-card .location { margin-bottom: 18px; }
        .exp-edu-wrap .education-description { color: #e5e5ea; font-size: 13px; line-height: 1.7; }
        .exp-edu-wrap .edu-date { margin-top: 18px; color: #ccff00; font-size: 10px; letter-spacing: 3px; }

        @media(max-width: 700px) {
          .exp-edu-wrap .container { padding: 70px 0; }
          .exp-edu-wrap .heading-main { flex-direction: column; gap: 30px; }
          .exp-edu-wrap .heading h1 { white-space: normal; text-align: center; font-size: 42px; letter-spacing: -2px; }
          .exp-edu-wrap .heading p { padding: 0 15px; font-size: 13px; }
          .exp-edu-wrap .horizontal-section { height: auto; }
          .exp-edu-wrap .sticky-timeline { position: relative; height: auto; overflow: visible; }
          .exp-edu-wrap .timeline-track { width: 100%; height: auto; flex-direction: column; gap: 40px; padding: 20px; transform: none !important; }
          .exp-edu-wrap .timeline-line { display: none; }
          .exp-edu-wrap .timeline-item { width: 100%; height: auto; min-height: auto; padding: 0 !important; align-items: stretch !important; }
          .exp-edu-wrap .node, .exp-edu-wrap .connector { display: none; }
          .exp-edu-wrap .card, .exp-edu-wrap .education-card { width: 100%; max-width: 500px; margin: auto; }
        }
      `}</style>

      <div className="container">
        <section className="heading">
          <h2
            ref={myJourneyRef}
            className="font-sans text-center text-[18vw] md:text-[8rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl leading-none mb-10 md:mb-16"
            style={{
              opacity: myJourneyVisible ? 1 : 0,
              transform: myJourneyVisible ? 'translateY(0)' : 'translateY(55px)',
              filter: myJourneyVisible ? 'blur(0px)' : 'blur(7px)',
              transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(.22, 1, .36, 1), filter 0.9s ease',
            }}
          >
            My Journey
          </h2>

          <div className="heading-main">
            <h1>
              Experience <span>&amp;</span> Education
            </h1>

            <div className="orbit">
              <div className="orbit-ring"></div>
              <div className="orbit-ring ring-horizontal"></div>
              <div className="orbit-ring ring-vertical"></div>
              <div className="orbit-dot"></div>
              <div className="orbit-core">
                <span>HEENA</span>
              </div>
            </div>
          </div>

          <p>
            From customer operations to international freight, every role has shaped the way I connect people,
            businesses and global supply chains.
          </p>
        </section>

        <section className="horizontal-section" ref={sectionRef}>
          <div className="sticky-timeline" ref={viewportRef}>
            <div className="timeline-track" ref={trackRef}>
              <div className="timeline-line"></div>

              {experience.map((item) => (
                <div className="timeline-item" key={item.title}>
                  <div className="node"></div>
                  <div className="connector"></div>

                  <div>
                    <div className="year">{item.year}</div>

                    <div className="card">
                      <div className="card-top">
                        <div className="icon">{item.icon}</div>
                        {item.status && <div className="status">{item.status}</div>}
                      </div>

                      <h2>{item.title}</h2>
                      <div className="company">{item.company}</div>
                      <div className="location">{item.location}</div>
                      <div className="date">{item.date}</div>
                      <div className="description">{item.desc}</div>

                      <div className="skills">
                        {item.skills.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="timeline-item">
                <div className="node"></div>
                <div className="connector"></div>

                <div>
                  <div className="year">{education.year}</div>

                  <div className="education-card">
                    <div className="education-icon">🎓</div>
                    <div className="degree">{education.degree}</div>
                    <h2>{education.title}</h2>
                    <div className="university">{education.university}</div>
                    <div className="location">{education.location}</div>
                    <div className="education-description">{education.desc}</div>
                    <div className="edu-date">{education.date}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExperienceEducation;
