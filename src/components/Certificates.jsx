import React from 'react';

const certificates = [
  {
    icon: '✦',
    type: 'CERTIFICATE',
    title: 'Business Communications',
    issuer: 'HP LIFE',
    dateLabel: 'HP LIFE',
    url: 'https://www.life-global.org/certificate/4e15a5ac-5ad7-44e2-9da8-65f6d1fd2242',
  },
  {
    icon: '⚡',
    type: 'CERTIFICATE',
    title: 'Work smarter with AI',
    issuer: 'Microsoft',
    dateLabel: 'CRQZKTD9',
    url: 'https://learn.microsoft.com/en-us/users/heenarather-2933/achievements/crqzktd9',
  },
  {
    icon: '◈',
    type: 'CERTIFICATE',
    title: 'Work smarter with AI using Microsoft Copilot',
    issuer: 'Microsoft',
    dateLabel: 'FETKGU6X',
    url: 'https://learn.microsoft.com/en-us/users/heenarather-2933/achievements/fetkgu6x',
  },
  {
    icon: '⌘',
    type: 'MICROSOFT LEARN',
    title: 'GitHub Agentic Workflows / AI',
    issuer: 'Microsoft',
    dateLabel: 'P6WUNCN4',
    url: 'https://learn.microsoft.com/en-us/users/heenarather-2933/achievements/p6wuncn4',
  },
  {
    icon: '◇',
    type: 'CERTIFICATE',
    title: 'The Complete Guide to Sea Export Forwarding',
    issuer: 'Alison',
    dateLabel: 'Jan 2025',
    url: 'https://alison.com/certification/check/94c69dc7ce',
  },
  {
    icon: '✧',
    type: 'CERTIFICATE',
    title: 'AI For Everyone',
    issuer: 'Coursera · DeepLearning.AI',
    dateLabel: 'Jul 2020',
    url: 'https://www.coursera.org/account/accomplishments/verify/PGQLCPFTARA7',
  },
  {
    icon: '✎',
    type: 'CERTIFICATE',
    title: 'Writing Professional Email and Memos',
    issuer: 'Coursera',
    dateLabel: 'Jul 2020',
    url: 'https://www.coursera.org/account/accomplishments/verify/M9Q7AZQRWJLY',
  },
  {
    icon: '◉',
    type: 'CERTIFICATE',
    title: 'Renewable Energy Technology Fundamentals',
    issuer: 'Coursera',
    dateLabel: 'May 2022',
    url: 'https://www.coursera.org/account/accomplishments/verify/R4NZMDVZ4SQ5',
  },
];

// Duplicated so the track can loop seamlessly at translateX(-50%)
const trackItems = [...certificates, ...certificates];

const Certificates = () => {
  return (
    <section id="certificates" className="certs-wrap">
      <style>{`
        .certs-wrap {
          width: 100%;
          padding: 80px 0 90px;
          overflow: hidden;
          background:
            radial-gradient(circle at 15% 50%, rgba(204,255,0,.08), transparent 32%),
            radial-gradient(circle at 85% 50%, rgba(204,255,0,.05), transparent 32%),
            #050505;
          color: #fff;
          font-family: Arial, Helvetica, sans-serif;
        }

        .certs-header {
          width: 90%;
          max-width: 1100px;
          margin: 0 auto 38px;
        }

        .certs-label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          color: rgba(255,255,255,.45);
        }

        .certs-label-line {
          width: 28px;
          height: 1px;
          background: #ccff00;
        }

        .certs-title {
          font-size: 46px;
          line-height: 1;
          letter-spacing: -2.5px;
          font-weight: 700;
        }

        .certs-title span { color: #ccff00; }

        .certs-description {
          max-width: 500px;
          margin-top: 18px;
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255,255,255,.40);
        }

        .certs-carousel {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .certs-carousel::before,
        .certs-carousel::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          z-index: 5;
          pointer-events: none;
        }

        .certs-carousel::before {
          left: 0;
          background: linear-gradient(90deg, #050505, transparent);
        }

        .certs-carousel::after {
          right: 0;
          background: linear-gradient(270deg, #050505, transparent);
        }

        .certs-track {
          display: flex;
          width: max-content;
          gap: 14px;
          padding: 10px 0;
          animation: certificatesMove 34s linear infinite;
          will-change: transform;
        }

        .certs-carousel:hover .certs-track {
          animation-play-state: paused;
        }

        .cert-card {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 250px;
          min-height: 155px;
          flex-shrink: 0;
          padding: 20px;
          overflow: hidden;
          box-sizing: border-box;
          border-radius: 17px;
          border: 1px solid rgba(255,255,255,.09);
          background: linear-gradient(145deg, rgba(255,255,255,.075), rgba(255,255,255,.018));
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease;
        }

        .cert-card:hover {
          transform: translateY(-5px) scale(1.015);
          border-color: rgba(204,255,0,.50);
          box-shadow: 0 15px 40px rgba(0,0,0,.35), 0 0 30px rgba(204,255,0,.12);
        }

        .cert-card-glow {
          position: absolute;
          width: 130px;
          height: 130px;
          right: -70px;
          top: -70px;
          border-radius: 50%;
          background: rgba(204,255,0,.16);
          filter: blur(45px);
          pointer-events: none;
          transition: transform .5s ease;
        }

        .cert-card:hover .cert-card-glow {
          transform: scale(1.5);
        }

        .cert-card-number {
          position: absolute;
          top: 17px;
          right: 18px;
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(255,255,255,.55);
        }

        .cert-card-icon {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          border-radius: 9px;
          background: rgba(204,255,0,.10);
          border: 1px solid rgba(204,255,0,.18);
          color: #ccff00;
          font-size: 13px;
          transition: .35s ease;
        }

        .cert-card:hover .cert-card-icon {
          transform: rotate(8deg) scale(1.08);
        }

        .cert-card-type {
          font-size: 8px;
          letter-spacing: 2px;
          color: #ccff00;
          margin-bottom: 6px;
        }

        .cert-card-title {
          font-size: 16px;
          line-height: 1.15;
          letter-spacing: -.35px;
          font-weight: 600;
          color: #ffffff;
        }

        .cert-card-footer {
          margin-top: auto;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 10px;
          padding-top: 11px;
          border-top: 1px solid rgba(255,255,255,.07);
        }

        .cert-card-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }

        .cert-card-issuer {
          font-size: 10px;
          color: rgba(255,255,255,.82);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 150px;
          line-height: 1.3;
        }

        .cert-card-date {
          font-size: 9px;
          color: rgba(255,255,255,.72);
          line-height: 1.3;
        }

        .cert-view-credential {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #ffffff;
          text-decoration: none;
          font-size: 9px;
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
          transition: .3s ease;
        }

        .cert-view-credential:hover {
          color: #ccff00;
        }

        .cert-view-arrow {
          font-size: 12px;
          transition: .3s ease;
        }

        .cert-view-credential:hover .cert-view-arrow {
          transform: translate(2px, -2px);
        }

        @keyframes certificatesMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 600px) {
          .certs-wrap { padding: 60px 0 70px; }
          .certs-header { width: 88%; margin-bottom: 28px; }
          .certs-title { font-size: 38px; letter-spacing: -2px; }
          .certs-description { font-size: 12px; max-width: 330px; }
          .cert-card { width: 220px; min-height: 145px; padding: 18px; }
          .certs-carousel::before,
          .certs-carousel::after { width: 55px; }
        }
      `}</style>

      <div className="certs-header">
        <div className="certs-label">
          <span className="certs-label-line"></span>
          CERTIFICATIONS
        </div>

        <h2 className="certs-title">
          My <span>Certificates.</span>
        </h2>

        <p className="certs-description">
          Professional certifications and achievements reflecting continuous learning and growth.
        </p>
      </div>

      <div className="certs-carousel">
        <div className="certs-track">
          {trackItems.map((cert, i) => (
            <div className="cert-card cursor-target" key={`${cert.title}-${i}`}>
              <div className="cert-card-glow"></div>

              <span className="cert-card-number">
                {String((i % certificates.length) + 1).padStart(2, '0')}
              </span>

              <div className="cert-card-icon">{cert.icon}</div>

              <div className="cert-card-type">{cert.type}</div>

              <div className="cert-card-title">{cert.title}</div>

              <div className="cert-card-footer">
                <div className="cert-card-meta">
                  <span className="cert-card-date">{cert.dateLabel}</span>
                  <span className="cert-card-issuer">{cert.issuer}</span>
                </div>

                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-view-credential"
                >
                  View Credential
                  <span className="cert-view-arrow">↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
