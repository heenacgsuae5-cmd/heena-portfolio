import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const HangingIDCard = ({
  image,
  name = 'Heena Rather',
  title = 'Freight Broker & Logistics Specialist',
  tagline = 'Building seamless connections across the globe.',
  strapLabel = 'HEENA RATHER',
  width = 'w-72 sm:w-80 md:w-96'
}) => {
  const wrapperRef = useRef(null); // rotates as one rigid unit (strap + ring + card)
  const cardRef = useRef(null); // gets the cursor-follow 3D tilt, on top of the base angle
  const idleTweenRef = useRef(null);
  const isDraggingRef = useRef(false);
  const pivotRef = useRef({ x: 0, y: 0 });
  const lastAngleRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const velocityRef = useRef(0);

  const BASE_ANGLE = -8; // resting tilt, matching the reference (not perfectly vertical)

  const startIdleSwing = () => {
    if (!wrapperRef.current) return;
    idleTweenRef.current?.kill();
    idleTweenRef.current = gsap.to(wrapperRef.current, {
      rotation: BASE_ANGLE + 3,
      duration: 2.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  };

  useEffect(() => {
    if (!wrapperRef.current) return;
    gsap.set(wrapperRef.current, { rotation: BASE_ANGLE, transformOrigin: 'top center' });
    startIdleSwing();
    return () => idleTweenRef.current?.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hover-only 3D tilt on the card face — separate from the drag/swing rotation below.
  const handleHoverMove = (e) => {
    if (isDraggingRef.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, {
      rotateY: relX * 12,
      rotateX: -relY * 8,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handlePointerEnter = () => {
    if (!isDraggingRef.current) idleTweenRef.current?.pause();
  };

  const handlePointerLeave = () => {
    if (isDraggingRef.current) return;
    if (cardRef.current) {
      gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power2.out' });
    }
    idleTweenRef.current?.resume();
  };

  // Real pendulum drag: tracked on `window` (not just the small card element) so
  // fast drags that move the pointer outside the card's bounds keep working —
  // this was the actual bug causing drags to "stick"/freeze mid-motion.
  const handlePointerDown = (e) => {
    if (!wrapperRef.current) return;
    isDraggingRef.current = true;
    idleTweenRef.current?.pause();
    gsap.killTweensOf(wrapperRef.current);
    wrapperRef.current.style.cursor = 'grabbing';

    const rect = wrapperRef.current.getBoundingClientRect();
    pivotRef.current = { x: rect.left + rect.width / 2, y: rect.top };
    lastAngleRef.current = BASE_ANGLE;
    lastMoveTimeRef.current = performance.now();
    velocityRef.current = 0;

    const onMove = (ev) => {
      const dx = ev.clientX - pivotRef.current.x;
      const dy = Math.max(20, ev.clientY - pivotRef.current.y);
      const angle = Math.atan2(dx, dy) * (180 / Math.PI);
      const clamped = Math.max(-75, Math.min(75, angle));

      const now = performance.now();
      const dt = Math.max(1, now - lastMoveTimeRef.current);
      velocityRef.current = (clamped - lastAngleRef.current) / dt;
      lastAngleRef.current = clamped;
      lastMoveTimeRef.current = now;

      gsap.set(wrapperRef.current, { rotation: clamped });
    };

    const onUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      if (wrapperRef.current) wrapperRef.current.style.cursor = 'grab';

      // Release with a bit of momentum, then settle back like a real pendulum.
      const throwAngle = Math.max(-40, Math.min(40, BASE_ANGLE + velocityRef.current * 60));
      gsap
        .timeline({ onComplete: startIdleSwing })
        .to(wrapperRef.current, { rotation: throwAngle, duration: 0.35, ease: 'power2.out' })
        .to(wrapperRef.current, { rotation: BASE_ANGLE, duration: 1.2, ease: 'elastic.out(1, 0.35)' });
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };

  const [firstName, ...restName] = name.split(' ');
  const lastName = restName.join(' ');

  return (
    <div className={`relative ${width} select-none mx-auto`} style={{ perspective: '1000px' }}>
      <style>{`
        .strap-text-track {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>

      <div
        ref={wrapperRef}
        className="relative w-full"
        onPointerMove={handleHoverMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        style={{ cursor: 'grab', touchAction: 'none' }}
      >
        {/* Single black lanyard strap with repeating brand text */}
        <div className="relative w-8 md:w-9 h-32 md:h-40 mx-auto rounded-sm overflow-hidden bg-[#0c0c0c] border-x border-[#ccff00]/20 shadow-[0_0_18px_rgba(0,0,0,0.6)] pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-[#ccff00]/70"></div>
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#ccff00]/70"></div>
          <div className="absolute inset-0 flex items-center justify-center strap-text-track text-[#ccff00] font-bold text-[10px] md:text-[11px] tracking-[0.2em] whitespace-nowrap">
            {strapLabel} &nbsp;•&nbsp; {strapLabel} &nbsp;•&nbsp; {strapLabel}
          </div>
        </div>

        {/* Metal ring + chain link connecting the strap to the card */}
        <div className="flex flex-col items-center pointer-events-none -mt-1">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-[3px] border-[#5a5a5a] bg-[#161616] shadow-[0_2px_8px_rgba(0,0,0,0.6)]"></div>
          <div className="w-2 h-4 md:w-2.5 md:h-5 -mt-0.5 rounded-sm bg-[#2c2c2c] border border-[#5a5a5a]"></div>
        </div>

        {/* Card */}
        <div
          ref={cardRef}
          className="relative -mt-1 rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.65)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Glass edge highlight */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_0_0_1px_rgba(255,255,255,0.05)] z-20"></div>
          <div className="absolute -inset-1 rounded-2xl bg-[#ccff00]/[0.05] blur-lg -z-10"></div>

          <div className="relative w-full aspect-[4/3.3] overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </div>

          <div className="px-4 py-3.5 md:px-5 md:py-4">
            <div className="text-base md:text-lg leading-tight">
              <span className="font-bold text-[#ccff00]">{firstName}</span>{' '}
              <span className="font-bold text-white">{lastName}</span>
            </div>
            <div className="text-gray-400 text-[11px] md:text-xs mt-0.5">{title}</div>

            <div className="flex items-start gap-1.5 mt-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shrink-0 mt-1"></span>
              <span className="text-gray-500 text-[9px] md:text-[10px] leading-snug">{tagline}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HangingIDCard;
