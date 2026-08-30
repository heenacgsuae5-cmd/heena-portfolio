import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Volume2, VolumeX } from 'lucide-react';
const centerImage = 'https://res.cloudinary.com/drjkfozmr/image/upload/v1784634972/WhatsApp_Image_2026-07-21_at_3.48.22_PM_jykfyu.jpg';
const HERO_VIDEO_SRC = '/hero-bg.mp4';
const HERO_VIDEO_POSTER = '/hero-bg-poster.jpg';
const HERO_VOICE_SRC = '/hero-voice.mp3';
// The background video's own original audio track stays fully muted at all
// times — only the dedicated voiceover track plays. Playing both at once
// (even with the video quiet underneath) caused an audible echo/double-voice
// effect, so the video is now silent and purely visual.

const Hero = ({ onPreloadComplete }) => {
  const [text, setText] = useState('RATHER');
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const heroSectionRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const downloadResume = () => {
    const resume = document.createElement('a');
    resume.href = '/resume.pdf';
    resume.download = 'Heena-Rather-Resume.pdf';
    document.body.appendChild(resume);
    resume.click();
    document.body.removeChild(resume);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !audio.muted;
    audio.muted = next;
    if (!next) audio.play().catch(() => {});
    setIsMuted(next);
  };

  // Only one audio source plays in the Hero: the voiceover (<audio>,
  // hero-voice.mp3). The background video stays muted at all times — it is
  // purely visual. Browsers block unmuted autoplay of a new media element,
  // so we try playing the voiceover unmuted first, and fall back to muted
  // autoplay if that's blocked, unmuting automatically the moment the user
  // interacts with the page. The visible mute/unmute button is the manual
  // override.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryUnmutedPlay = () => {
      audio.muted = false;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsMuted(false);
          })
          .catch(() => {
            // Blocked — fall back to muted autoplay
            audio.muted = true;
            setIsMuted(true);
            audio.play().catch(() => {});
          });
      }
    };

    tryUnmutedPlay();

    const unmuteOnInteraction = () => {
      audio.muted = false;
      audio.play().catch(() => {});
      setIsMuted(false);
      window.removeEventListener('click', unmuteOnInteraction);
      window.removeEventListener('touchstart', unmuteOnInteraction);
      window.removeEventListener('keydown', unmuteOnInteraction);
      window.removeEventListener('scroll', unmuteOnInteraction);
    };

    window.addEventListener('click', unmuteOnInteraction);
    window.addEventListener('touchstart', unmuteOnInteraction);
    window.addEventListener('keydown', unmuteOnInteraction);
    window.addEventListener('scroll', unmuteOnInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', unmuteOnInteraction);
      window.removeEventListener('touchstart', unmuteOnInteraction);
      window.removeEventListener('keydown', unmuteOnInteraction);
      window.removeEventListener('scroll', unmuteOnInteraction);
    };
  }, []);

  // Stop the voiceover once the user scrolls past the Hero section, and
  // resume it automatically if they scroll back up into view. The background
  // video keeps playing/looping visually the whole time either way (it's
  // just a background) and stays muted throughout — only the voiceover's
  // play/pause state changes here.
  useEffect(() => {
    const audio = audioRef.current;
    const section = heroSectionRef.current;
    if (!audio || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          audio.play().catch(() => {});
        } else {
          audio.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Lock scroll during animation
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const target = "HEENA";
    const start = "RATHER";
    let iterations = 0;
    let intervalId;
    let timeoutId;

    const imageLoadPromise = new Promise((resolve) => {
      const img = new window.Image();
      img.src = centerImage;
      if (img.complete) {
        resolve();
      } else {
        img.onload = resolve;
        img.onerror = resolve;
      }
    });

    const delayPromise = new Promise((resolve) => {
      timeoutId = setTimeout(resolve, 1000);
    });

    let isMounted = true;

    Promise.all([imageLoadPromise, delayPromise]).then(() => {
      if (!isMounted) return;

      intervalId = setInterval(() => {
        setText(() => {
          let newText = target.split("").map((letter, index) => {
            if (index < Math.floor(iterations)) {
              return target[index]; // Target letter
            }
            if (index < start.length) {
              return start[index]; // Original letter
            }
            return "";
          }).join("");
          return newText;
        });

        if (iterations >= target.length) {
          clearInterval(intervalId);

          // GSAP Animation Sequence
          const tl = gsap.timeline({
            onComplete: () => {
              document.body.style.overflow = 'auto'; // Unlock scroll
              if (onPreloadComplete) onPreloadComplete(); // Unlock rest of the website
            }
          });

          // 1. Move the central text container up from 50% to its resting place
          const isMobile = window.innerWidth < 768;
          tl.to(containerRef.current, {
            top: isMobile ? "20%" : "45%",
            duration: 1.5,
            ease: "power3.inOut"
          }, "+=0.2"); // slight delay after scramble finishes

          // 2. Fade and slide up the Subtitle
          tl.fromTo(subtitleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
            "-=1.0" // start animating this while the text is still moving up
          );

          // 3. Slide the image upward to the center (no fading)
          tl.fromTo(imageRef.current,
            { y: "100vh" }, // start entirely offscreen at the bottom
            { y: 0, duration: 1.5, ease: "power3.out" },
            "-=1.2" // start sliding up around the same time
          );
        }
        iterations += 1 / 3; // Controls the speed of the letter swap
      }, 50); // 50ms per step
    });

    return () => {
      isMounted = false;
      document.body.style.overflow = 'auto';
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section
      ref={heroSectionRef}
      className="relative min-h-screen flex items-end justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ background: 'radial-gradient(circle, #222222 0%, #000000 80%)' }}
    >
      {/* Background video — source file is pre-cropped (letterbox bars and
          watermark corner trimmed out) so object-fit: cover fills the section
          edge-to-edge without extra manual zoom. object-position-y is set low
          (12%) because pixel analysis of the source frames shows her head has
          only ~2-4% of safe margin at the top of the frame — anchoring closer
          to center (e.g. 45%) crops into her head/hijab on wide, short
          viewports instead of trimming the much safer margin at the bottom.
          No filters/blur — stays sharp, same source quality throughout. */}
      <video
        ref={videoRef}
        className="hero-video absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{ objectPosition: '50% 12%' }}
        poster={HERO_VIDEO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Hero voiceover — dedicated audio track, layered on top of the
          background video's own audio track (kept intact in hero-bg.mp4).
          Both are muted/unmuted together by the single control below. */}
      <audio ref={audioRef} src={HERO_VOICE_SRC} loop preload="auto" />

      <div className="absolute inset-0 bg-black/15"></div>

      {/* Mute / unmute toggle for the hero voiceover */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute voiceover' : 'Mute voiceover'}
        className="absolute top-24 right-4 md:top-28 md:right-8 z-30 w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:border-[#ccff00]/60 hover:text-[#ccff00] transition-colors duration-300 pointer-events-auto"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      {/* Ambient accent glows — matches the rest of the portfolio's dark/lime visual style */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#ccff00]/10 blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#ccff00]/10 blur-[130px] pointer-events-none z-0"></div>

      <div
        ref={containerRef}
        className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none flex flex-col items-start w-max"
      >
        <h1
          ref={textRef}
          className="text-[16vw] md:text-[10rem] lg:text-[14rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl pr-4 md:pr-8 leading-none uppercase"
        >
          {text}
        </h1>

        <p
          ref={subtitleRef}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:-bottom-12 md:left-8 text-white text-[10px] sm:text-base md:text-2xl lg:text-4xl drop-shadow-md z-10 opacity-0 w-max whitespace-nowrap"
        >
          ꜰʀᴇɪɢʜᴛ ʙʀᴏᴋᴇʀ | ᴅɪɢɪᴛᴀʟ ꜱᴏʟᴜᴛɪᴏɴꜱ ᴄʀᴇᴀᴛᴏʀ
        </p>
      </div>

      {/* HIRE ME — Bubbleblob-style button, left side, vertically centered */}
      <style>{`
        .hire-wrapper {
          position: relative;
          width: 150px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hire-wrapper .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(18px);
          opacity: 0.6;
          pointer-events: none;
          animation: hireBlobFloat 6s ease-in-out infinite;
        }

        .hire-wrapper .blob.one {
          width: 80px;
          height: 80px;
          top: -18px;
          left: -12px;
          background: radial-gradient(circle, rgba(204,255,0,0.9), rgba(204,255,0,0) 70%);
          animation-delay: 0s;
        }

        .hire-wrapper .blob.two {
          width: 64px;
          height: 64px;
          bottom: -14px;
          right: -10px;
          background: radial-gradient(circle, rgba(233,255,102,0.85), rgba(233,255,102,0) 70%);
          animation-delay: 2s;
        }

        @keyframes hireBlobFloat {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(6px, -8px) scale(1.1); }
          66% { transform: translate(-6px, 6px) scale(0.92); }
        }

        .hire-btn {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 48px;
          border-radius: 999px;
          border: 1px solid rgba(204,255,0,0.35);
          background: linear-gradient(145deg, rgba(204,255,0,0.16), rgba(204,255,0,0.04));
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          cursor: pointer;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);
          transition: border-color .35s ease, box-shadow .35s ease, transform .35s cubic-bezier(.2,.8,.2,1);
        }

        .hire-btn:hover {
          border-color: rgba(204,255,0,0.6);
          box-shadow: 0 12px 40px rgba(204,255,0,0.28), inset 0 1px 0 rgba(255,255,255,0.1);
          transform: translateY(-2px);
        }

        .hire-btn .hire-text {
          position: absolute;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #eaffb0;
          transition: transform .4s cubic-bezier(.2,.8,.2,1), opacity .4s ease;
        }

        .hire-btn .hire-main {
          transform: translateY(0);
          opacity: 1;
        }

        .hire-btn .resume-text {
          transform: translateY(140%);
          opacity: 0;
        }

        .hire-btn:hover .hire-main {
          transform: translateY(-140%);
          opacity: 0;
        }

        .hire-btn:hover .resume-text {
          transform: translateY(0);
          opacity: 1;
        }

        .hire-btn .arrow {
          transition: transform .3s ease;
        }

        .hire-btn:hover .arrow {
          transform: translate(2px, -2px);
        }

        @media (max-width: 640px) {
          .hire-wrapper { width: 128px; height: 44px; }
          .hire-btn { height: 42px; }
          .hire-btn .hire-text { font-size: 10px; letter-spacing: 0.08em; }
        }
      `}</style>

      <div className="hire-wrapper absolute left-4 sm:left-6 md:left-10 lg:left-16 top-24 md:top-28 z-20 pointer-events-auto">
        <span className="blob one"></span>
        <span className="blob two"></span>

        <button type="button" className="hire-btn cursor-target" onClick={downloadResume}>
          <span className="hire-text hire-main">
            HIRE ME
            <span className="arrow">↗</span>
          </span>

          <span className="hire-text resume-text">
            DOWNLOAD RESUME ↓
          </span>
        </button>
      </div>

      <div
        ref={imageRef}
        className="relative z-10 text-white flex flex-col items-end w-full pointer-events-none translate-y-[100vh] pr-4 md:pr-12 lg:pr-20 mb-[6vh] sm:mb-[8vh] md:mb-[10vh] lg:mb-[6vh]"
      >
        {/* Floating profile image removed — Intro section now holds the single portfolio image */}
      </div>
    </section>
  );
};

export default Hero;
