import React, { useEffect, useMemo, useRef, useState } from 'react';

// LogoLoop — a seamless, infinitely-scrolling horizontal strip of logos,
// styled after the React Bits "LogoLoop" component. The caller passes the
// logo list ONCE (each entry appears a single time in `logos`); this
// component takes care of the internal duplication needed to make the CSS
// translate-based loop wrap seamlessly, so nothing has to be hand-duplicated
// in the source array.
//
// The animation runs at a constant `speed` (pixels/second) regardless of how
// many logos are passed in or how wide the viewport is: it measures one full
// set's rendered width and derives the animation duration from that, so the
// perceived scroll speed never changes when logos are added/removed or the
// window is resized.
const LogoLoop = ({
  logos = [],
  speed = 80,
  direction = 'left',
  logoHeight = 48,
  gap = 55,
  hoverSpeed = 0,
  scaleOnHover = false,
  fadeOut = false,
  ariaLabel = 'Logo loop',
}) => {
  const trackRef = useRef(null);
  const [duration, setDuration] = useState(20);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      // The track always renders two back-to-back copies of `logos`, so half
      // its scrollWidth is exactly the width of one full pass.
      const setWidth = track.scrollWidth / 2;
      if (setWidth > 0 && speed > 0) {
        setDuration(setWidth / speed);
      }
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [logos, gap, logoHeight, speed]);

  // Internal-only duplication for the seamless loop — the array the caller
  // supplies (`logos`) still holds each logo exactly once.
  const track = useMemo(() => [...logos, ...logos], [logos]);

  return (
    <div
      className="logoloop"
      role="img"
      aria-label={ariaLabel}
      onMouseEnter={() => {
        if (hoverSpeed === 0) setPaused(true);
      }}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        .logoloop {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .logoloop .logoloop-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation-name: logoloop-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-duration: ${duration}s;
          animation-direction: ${direction === 'right' ? 'reverse' : 'normal'};
          animation-play-state: ${paused ? 'paused' : 'running'};
          will-change: transform;
        }

        .logoloop .logoloop-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-right: ${gap}px;
          color: rgba(255, 255, 255, 0.55);
          line-height: 0;
          transition: color 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        ${scaleOnHover ? `
        .logoloop .logoloop-item:hover {
          color: #ccff00;
          transform: scale(1.18);
        }
        ` : ''}

        ${fadeOut ? `
        .logoloop {
          -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
        }
        ` : ''}

        @keyframes logoloop-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .logoloop .logoloop-track { animation: none; }
        }
      `}</style>

      <div className="logoloop-track" ref={trackRef}>
        {track.map((logo, index) => {
          const Icon = logo.Icon;
          return (
            <span
              key={`${logo.label}-${index}`}
              className="logoloop-item cursor-target"
              title={logo.label}
              aria-hidden="true"
            >
              <Icon size={logoHeight} />
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default LogoLoop;
