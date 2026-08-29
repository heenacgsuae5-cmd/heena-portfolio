import React, { useEffect, useRef, useState } from 'react';

const EMAIL = 'heenarather408@gmail.com';

const ConnectWidget = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const socialAreaRef = useRef(null);
  const mainContactRef = useRef(null);
  const pupilRefs = useRef([]);
  const copyTimeoutRef = useRef(null);

  // Close on outside click / Escape, and eye-follow tracking
  useEffect(() => {
    function handleDocClick(e) {
      if (socialAreaRef.current && !socialAreaRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    function handleMouseMove(e) {
      pupilRefs.current.forEach((pupil) => {
        if (!pupil) return;
        const eye = pupil.parentElement;
        const rect = eye.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const distance = Math.min(3.5, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 30);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      });
    }

    document.addEventListener('click', handleDocClick);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('click', handleDocClick);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Magnetic button follow
  useEffect(() => {
    const btn = mainContactRef.current;
    if (!btn) return;

    function handleMove(e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const moveX = Math.max(-6, Math.min(6, x / 12));
      const moveY = Math.max(-5, Math.min(5, y / 12));
      btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    function handleLeave() {
      btn.style.transform = 'translate(0, 0)';
    }

    btn.addEventListener('mousemove', handleMove);
    btn.addEventListener('mouseleave', handleLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMove);
      btn.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const toggleOpen = (e) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch (err) {
      const input = document.createElement('input');
      input.value = EMAIL;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }

    setCopied(true);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="connect-widget">
      <style>{`
        .connect-widget {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px 90px;
          overflow: visible;
        }

        .connect-widget .background-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(204,255,0,0.10), transparent 65%);
          filter: blur(30px);
          pointer-events: none;
        }

        .connect-widget .background-glow.one { top: -120px; left: -100px; }
        .connect-widget .background-glow.two { bottom: -140px; right: -100px; }

        .connect-widget .contact-component {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 5;
          padding-top: 80px;
          width: 100%;
        }

        .connect-widget .contact-label {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: max-content;
          max-width: 90vw;
          margin: 0;
          font-size: clamp(14px, 2vw, 18px);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: rgba(255,255,255,0.78);
          text-align: center;
          white-space: nowrap;
          z-index: 100;
          pointer-events: none;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .connect-widget .social-area {
          position: relative;
          width: 450px;
          max-width: 100%;
          height: 105px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .connect-widget .main-contact {
          position: relative;
          width: 220px;
          height: 62px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.18);
          background: linear-gradient(145deg, rgba(255,255,255,0.13), rgba(255,255,255,0.045));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12);
          transition: transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s ease, border-color 0.35s ease;
          z-index: 20;
          user-select: none;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .connect-widget .main-contact:hover {
          border-color: rgba(204,255,0,0.55);
          box-shadow: 0 18px 60px rgba(204,255,0,0.18), inset 0 1px 0 rgba(255,255,255,0.16);
        }

        .connect-widget .main-contact:active { transform: scale(0.96); }

        .connect-widget .eyes {
          display: flex;
          gap: 4px;
          width: 31px;
          height: 18px;
          align-items: center;
          justify-content: center;
        }

        .connect-widget .eye {
          width: 14px;
          height: 14px;
          background: #fff;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(255,255,255,0.2);
        }

        .connect-widget .pupil {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #08080b;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .connect-widget .contact-text {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.15em;
          white-space: nowrap;
        }

        .connect-widget .arrow {
          font-size: 17px;
          transition: transform 0.3s ease;
        }

        .connect-widget .main-contact:hover .arrow {
          transform: translate(3px, -3px);
        }

        .connect-widget .social-icon {
          position: absolute;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.13);
          background: rgba(20,20,25,0.88);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          opacity: 0;
          transform: translate(-50%, 10px) scale(0.55);
          pointer-events: none;
          transition: transform 0.55s cubic-bezier(.16,1,.3,1), opacity 0.35s ease, background 0.25s ease, border-color 0.25s ease;
          z-index: 30;
          cursor: pointer;
        }

        .connect-widget .social-icon svg {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }

        .connect-widget .social-icon:hover {
          background: rgba(204,255,0,0.20);
          border-color: rgba(204,255,0,0.55);
          transform: translate(-50%, 0) scale(1.13);
        }

        .connect-widget .icon-email { left: 12%; }
        .connect-widget .icon-linkedin { left: 27%; }
        .connect-widget .icon-github { left: 42%; }
        .connect-widget .icon-hire { left: 58%; }
        .connect-widget .icon-quote { left: 73%; }
        .connect-widget .icon-copy { left: 88%; }

        .connect-widget .social-area.open .social-icon {
          opacity: 1;
          pointer-events: auto;
          transform: translate(-50%, -72px) scale(1);
        }

        .connect-widget .social-area.open .icon-email { transition-delay: 0.02s; }
        .connect-widget .social-area.open .icon-linkedin { transition-delay: 0.06s; }
        .connect-widget .social-area.open .icon-github { transition-delay: 0.10s; }
        .connect-widget .social-area.open .icon-hire { transition-delay: 0.14s; }
        .connect-widget .social-area.open .icon-quote { transition-delay: 0.18s; }
        .connect-widget .social-area.open .icon-copy { transition-delay: 0.22s; }

        .connect-widget .social-icon::after {
          content: attr(data-label);
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%) translateY(-5px);
          padding: 5px 8px;
          border-radius: 6px;
          background: #16161b;
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.72);
          font-size: 9px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .connect-widget .social-icon:hover::after {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .connect-widget .status {
          margin-top: 15px;
          font-size: 10px;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.30);
          opacity: 0;
          transform: translateY(5px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .connect-widget .status.show {
          opacity: 1;
          transform: translateY(0);
        }

        .connect-widget .description {
          margin-top: 30px;
          text-align: center;
          max-width: 500px;
          color: rgba(255,255,255,0.40);
          font-size: 12px;
          line-height: 1.7;
        }

        @media (max-width: 600px) {
          .connect-widget .contact-component { padding-top: 65px; }
          .connect-widget .social-area { width: 350px; }
          .connect-widget .main-contact { width: 205px; }
          .connect-widget .social-icon { width: 42px; height: 42px; }
          .connect-widget .social-icon svg { width: 16px; height: 16px; }
          .connect-widget .icon-email { left: 5%; }
          .connect-widget .icon-linkedin { left: 23%; }
          .connect-widget .icon-github { left: 41%; }
          .connect-widget .icon-hire { left: 59%; }
          .connect-widget .icon-quote { left: 77%; }
          .connect-widget .icon-copy { left: 95%; }
          .connect-widget .social-area.open .social-icon {
            transform: translate(-50%, -62px) scale(0.90);
          }
          .connect-widget .contact-label { font-size: 14px; }
          .connect-widget .contact-text { font-size: 11px; }
        }
      `}</style>

      <div className="background-glow one"></div>
      <div className="background-glow two"></div>

      <div className="contact-component">
        <div className="contact-label">Great Ideas Deserve Great Execution.</div>

        <div className={`social-area${open ? ' open' : ''}`} ref={socialAreaRef}>
          <a
            className="social-icon icon-email cursor-target"
            data-label="Email"
            href={`mailto:${EMAIL}`}
            aria-label="Email Heena"
          >
            <svg viewBox="0 0 24 24">
              <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 7L12 12L4 7V6L12 11L20 6V7Z" />
            </svg>
          </a>

          <a
            className="social-icon icon-linkedin cursor-target"
            data-label="LinkedIn"
            href="https://www.linkedin.com/in/heena-rather-b8927117b/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24">
              <path d="M6.5 8.5A2 2 0 1 0 6.5 4.5A2 2 0 0 0 6.5 8.5ZM4.5 10H8.5V20H4.5V10ZM10 10H13.8V11.36C14.34 10.5 15.32 9.6 17.12 9.6C20.8 9.6 21.5 12.02 21.5 15.17V20H17.5V15.7C17.5 14.67 17.48 13.35 16.1 13.35C14.7 13.35 14.5 14.44 14.5 15.6V20H10V10Z" />
            </svg>
          </a>

          <a
            className="social-icon icon-github cursor-target"
            data-label="GitHub"
            href="https://github.com/heenacgsuae5-cmd"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.58 2 12.23C2 16.75 4.87 20.58 8.84 21.94C9.34 22.04 9.52 21.72 9.52 21.45C9.52 21.21 9.51 20.57 9.5 19.72C6.73 20.34 6.14 18.34 6.14 18.34C5.69 17.15 5.03 16.83 5.03 16.83C4.12 16.2 5.1 16.21 5.1 16.21C6.1 16.28 6.62 17.27 6.62 17.27C7.51 18.84 8.96 18.39 9.56 18.13C9.65 17.47 9.91 17.02 10.2 16.77C7.99 16.51 5.66 15.63 5.66 11.4C5.66 10.19 6.08 9.2 6.72 8.42C6.61 8.14 6.25 7.01 6.83 5.48C6.83 5.48 7.68 5.2 9.5 6.47C10.31 6.24 11.16 6.13 12 6.13C12.84 6.13 13.69 6.24 14.5 6.47C16.32 5.2 17.17 5.48 17.17 5.48C17.75 7.01 17.39 8.14 17.28 8.42C17.92 9.2 18.34 10.19 18.34 11.4C18.34 15.64 16 16.5 13.79 16.77C14.15 17.1 14.48 17.74 14.48 18.72C14.48 20.13 14.47 21.27 14.47 21.45C14.47 21.72 14.65 22.04 15.15 21.94C19.12 20.58 22 16.75 22 12.23C22 6.58 17.52 2 12 2Z" />
            </svg>
          </a>

          <a
            className="social-icon icon-hire cursor-target"
            data-label="Hire Me"
            href={`mailto:${EMAIL}?subject=Hire%20Heena%20Rather`}
            aria-label="Hire Me"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
              <path d="M8 6V4.5C8 3.67 8.67 3 9.5 3H14.5C15.33 3 16 3.67 16 4.5V6" stroke="currentColor" strokeWidth="1.7" />
              <path d="M3 11H21" stroke="currentColor" strokeWidth="1.7" />
              <path d="M10 14H14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </a>

          <a
            className="social-icon icon-quote cursor-target"
            data-label="Get Freight Quote"
            href="https://heena-freight-broker.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get Freight Quote"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 6H21V18H3V6Z" stroke="currentColor" strokeWidth="1.7" />
              <path d="M3 9H21" stroke="currentColor" strokeWidth="1.7" />
              <path d="M7 13H11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M7 16H14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </a>

          <button
            className="social-icon icon-copy cursor-target"
            data-label="Copy Email"
            aria-label="Copy Email"
            type="button"
            onClick={handleCopy}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
              <path
                d="M16 8V6C16 4.9 15.1 4 14 4H6C4.9 4 4 4.9 4 6V14C4 15.1 4.9 16 6 16H8"
                stroke="currentColor"
                strokeWidth="1.7"
              />
            </svg>
          </button>

          <button
            className="main-contact cursor-target"
            type="button"
            aria-expanded={open}
            onClick={toggleOpen}
            ref={mainContactRef}
          >
            <span className="eyes">
              <span className="eye">
                <span className="pupil" ref={(el) => (pupilRefs.current[0] = el)}></span>
              </span>
              <span className="eye">
                <span className="pupil" ref={(el) => (pupilRefs.current[1] = el)}></span>
              </span>
            </span>

            <span className="contact-text">LET'S CONNECT</span>

            <span className="arrow">↗</span>
          </button>
        </div>

        <div className={`status${copied ? ' show' : ''}`}>EMAIL COPIED</div>

        <p className="description">
          Open to collaborations, technology opportunities, freight &amp; logistics projects, and new ideas.
        </p>
      </div>
    </div>
  );
};

export default ConnectWidget;
