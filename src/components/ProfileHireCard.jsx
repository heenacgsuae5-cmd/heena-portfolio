import React, { useEffect, useRef, useState } from 'react';

const EMAIL = 'heenarather408@gmail.com';
const AVATAR = 'https://res.cloudinary.com/drjkfozmr/image/upload/v1787580344/2e78682f903a565219e1bad3df2f0ead_zxcakg.jpg';

// Floating "Hire me" profile card — always-on-screen contact widget, fixed to
// the bottom-left corner so it never competes with the Hero's own HIRE ME
// button (top-left, Hero only) or the Footer's LET'S CONNECT widget.
const ProfileHireCard = () => {
  const [time, setTime] = useState('');
  const [copied, setCopied] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [pinned, setPinned] = useState(false);
  const copyTimeoutRef = useRef(null);
  const cardRef = useRef(null);

  // The card shows fully while the Hero is on screen (like the reference
  // widget). Every section below Hero runs edge-to-edge with its own
  // bottom-left content (the hanging ID card, timeline entries, service
  // rows), so once the user scrolls past Hero it shrinks to a small avatar
  // bubble instead of sitting on top of that content — click it to bring
  // the full card back.
  useEffect(() => {
    const handleScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.85);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!pastHero) setPinned(false);
  }, [pastHero]);

  const collapsed = pastHero && !pinned;

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      );
    };
    updateClock();
    const id = setInterval(updateClock, 30 * 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

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
    <div
      className={`profile-hire-card${collapsed ? ' collapsed' : ''}`}
      ref={cardRef}
    >
      <style>{`
        .profile-hire-card {
          position: fixed;
          left: 16px;
          bottom: 16px;
          z-index: 40;
          pointer-events: auto;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        @media (min-width: 768px) {
          .profile-hire-card { left: 32px; bottom: 32px; }
        }

        .profile-hire-card .phc-card {
          position: relative;
          width: 220px;
          max-width: calc(100vw - 32px);
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(10,10,10,0.72);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06);
          padding: 11px;
          transition: transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s ease, border-color 0.35s ease, opacity 0.3s ease, max-height 0.35s ease, padding 0.35s ease;
        }

        .profile-hire-card .phc-card:hover {
          border-color: rgba(204,255,0,0.4);
          box-shadow: 0 24px 70px rgba(204,255,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .profile-hire-card .phc-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 9px;
        }

        .profile-hire-card .phc-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: #ccff00;
        }

        .profile-hire-card .phc-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ccff00;
          box-shadow: 0 0 8px rgba(204,255,0,0.9);
          animation: phcPulse 1.8s ease-in-out infinite;
        }

        @keyframes phcPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.8); }
        }

        .profile-hire-card .phc-clock {
          font-size: 10px;
          font-variant-numeric: tabular-nums;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.02em;
        }

        .profile-hire-card .phc-close {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.55);
          font-size: 11px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .profile-hire-card .phc-close:hover {
          color: #ccff00;
          border-color: rgba(204,255,0,0.5);
        }

        .profile-hire-card .phc-body {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .profile-hire-card .phc-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid rgba(204,255,0,0.55);
          flex-shrink: 0;
        }

        .profile-hire-card .phc-info { min-width: 0; }

        .profile-hire-card .phc-name {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .profile-hire-card .phc-role {
          font-size: 10px;
          color: rgba(255,255,255,0.45);
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .profile-hire-card .phc-actions {
          display: flex;
          gap: 6px;
          margin-top: 10px;
        }

        .profile-hire-card .phc-btn {
          flex: 1;
          height: 30px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.03em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: transform 0.25s cubic-bezier(.2,.8,.2,1), box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease, color 0.25s ease;
          text-decoration: none;
          white-space: nowrap;
        }

        .profile-hire-card .phc-btn:active { transform: scale(0.95); }

        .profile-hire-card .phc-btn-primary {
          background: linear-gradient(145deg, rgba(204,255,0,0.9), rgba(204,255,0,0.75));
          color: #0a0a0a;
          box-shadow: 0 8px 24px rgba(204,255,0,0.25);
        }

        .profile-hire-card .phc-btn-primary:hover {
          box-shadow: 0 10px 30px rgba(204,255,0,0.4);
          transform: translateY(-1px);
        }

        .profile-hire-card .phc-btn-ghost {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.75);
        }

        .profile-hire-card .phc-btn-ghost:hover {
          border-color: rgba(204,255,0,0.45);
          color: #ccff00;
        }

        /* Collapsed state — small round avatar chip only, expands back on click */
        .profile-hire-card.collapsed .phc-card {
          width: 46px;
          height: 46px;
          padding: 0;
          border-radius: 50%;
          cursor: pointer;
          overflow: hidden;
        }

        .profile-hire-card.collapsed .phc-top,
        .profile-hire-card.collapsed .phc-actions,
        .profile-hire-card.collapsed .phc-info,
        .profile-hire-card.collapsed .phc-close {
          display: none;
        }

        .profile-hire-card.collapsed .phc-body {
          width: 100%;
          height: 100%;
        }

        .profile-hire-card.collapsed .phc-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }

        @media (max-width: 420px) {
          .profile-hire-card .phc-card { width: 196px; }
        }
      `}</style>

      <div className="phc-card cursor-target" onClick={collapsed ? () => setPinned(true) : undefined}>
        {!collapsed && pastHero && (
          <button
            type="button"
            className="phc-close cursor-target"
            aria-label="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              setPinned(false);
            }}
          >
            &times;
          </button>
        )}

        <div className="phc-top">
          <span className="phc-status">
            <span className="phc-dot"></span>
            Available for work
          </span>
          <span className="phc-clock">{time}</span>
        </div>

        <div className="phc-body">
          <img src={AVATAR} alt="Heena Rather" className="phc-avatar" draggable={false} />
          <div className="phc-info">
            <div className="phc-name">Heena Rather</div>
            <div className="phc-role">Freight Broker &amp; Logistics</div>
          </div>
        </div>

        <div className="phc-actions">
          <a
            href={`mailto:${EMAIL}?subject=Hire%20Heena%20Rather`}
            className="phc-btn phc-btn-primary cursor-target"
            onClick={(e) => e.stopPropagation()}
          >
            Hire me
          </a>
          <button
            type="button"
            className="phc-btn phc-btn-ghost cursor-target"
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy Email'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHireCard;
