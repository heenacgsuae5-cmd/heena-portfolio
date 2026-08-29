import React, { useState, useEffect } from 'react';

const projects = [
  {
    name: 'H. Freight Broker',
    title: (
      <>
        H. FREIGHT <span className="font-light italic text-gray-300 lowercase font-serif">broker</span><br />
        LOGISTICS BRAND SITE
      </>
    ),
    description: "A complete freight forwarding and logistics website, independently designed and developed — focused on lead generation and customer acquisition, built to showcase services with clarity and conversion-driven design.",
    image: "https://res.cloudinary.com/drjkfozmr/image/upload/v1786270669/1782895028301_pmncl6.jpg",
    live: "https://heena-freight-broker.vercel.app/",
    github: "https://github.com/heenacgsuae5-cmdd"
  },
  {
    name: 'Arduino-Based Automatic Dam Shutter System',
    title: (
      <>
        AUTOMATIC DAM <br />
        SHUTTER SYSTEM
      </>
    ),
    description: "A smart, autonomous system to manage water flow in dams using Arduino microcontrollers — maintaining optimal water levels, preventing flooding, and supporting efficient water management for agricultural and urban areas.",
    image: "https://res.cloudinary.com/drjkfozmr/image/upload/v1786277659/16835402601pro_u5rwi8.jpg",
    detailHeading: "AUTOMATIC DAM SHUTTER SYSTEM",
    detailCards: [
      {
        location: "Salal Hydroelectric Power Station",
        subLocation: "Reasi, Jammu & Kashmir",
        tags: "Automatic Gate Control • Hydraulic Systems • Dam Safety",
        technicalLabel: "Technical:",
        technicalTags: "Automatic Gate Control • Spillway Gates • Hydraulic Hoist • Water-Level Monitoring • Dam Safety",
        referenceImage: "https://res.cloudinary.com/drjkfozmr/image/upload/v1786277658/1734880391825_mfzfac.jpg",
        referenceLinkText: "VIEW PROJECT REFERENCE ↗",
        referenceLink: "https://www.nhpcindia.com/welcome/project_detail/4/welcome/index.php.html?utm_source=chatgpt.com"
      }
    ]
  },
  {
    name: 'JKPTCL Sub-Station 132/33kV, 110MVA',
    title: (
      <>
        JKPTCL <br />
        SUB-STATION 132/33kV
      </>
    ),
    description: "A study of the transmission infrastructure of Jammu & Kashmir Power Transmission Corporation Limited — covering grid operations, transmission line design, and control panel systems behind reliable regional power delivery.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000&auto=format&fit=crop",
    detailHeading: "JKPTCL SUB-STATION 132/33kV",
    detailCards: [
      {
        index: "01 — Cheshmashahi",
        location: "132/33kV Grid Substation",
        subLocation: "Cheshmashahi, Srinagar, Kashmir",
        tags: "Transmission • Protection • Power Systems",
        referenceImage: "https://res.cloudinary.com/drjkfozmr/image/upload/v1786278417/cheshmashahi-grid-station-srinagar-power-plants-Z10ex3X6hM-250_b6zyrp.jpg"
      },
      {
        index: "02 — Aug 2021 – Sep 2021",
        location: "Associated with Model Institute of Engineering and Technology (MIET), Jammu",
        description: "Academic/industrial training project focused on the study and understanding of a 132/33kV electrical substation, including power transformation, grid operation, protection systems, switchgear, transmission equipment, and substation maintenance.",
        description2: "The project provided practical exposure to the operation and maintenance of high-voltage transmission infrastructure and the role of substations in reliable power transmission across Jammu & Kashmir.",
        keyAreasLabel: "Key Areas:",
        keyAreas: "Grid Operation & Maintenance • 132/33kV Transmission • Power Transformers • Protection Systems • Switchgear • Substation Equipment",
        referenceLabel: "Official Reference:",
        referenceImage: "https://res.cloudinary.com/drjkfozmr/image/upload/v1786277658/1734876600483_tst19x.jpg",
        referenceLinkText: "VIEW PROJECT REFERENCE ↗",
        referenceLink: "https://kpdcl.jk.gov.in/"
      }
    ]
  }
];

const DetailModal = ({ project, onClose }) => (
  <div
    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-start md:items-center justify-center overflow-y-auto py-10 px-4"
    onClick={onClose}
  >
    <div
      className="relative w-full max-w-3xl bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-10"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-[#ccff00] hover:text-black flex items-center justify-center transition-colors z-10"
        aria-label="Close project details"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-8 pr-10">
        {project.detailHeading}
      </h3>

      <div className="flex flex-col gap-10">
        {project.detailCards.map((card, i) => (
          <div key={i} className={i > 0 ? 'pt-8 border-t border-white/10' : ''}>
            {card.index && (
              <span className="text-[#ccff00] text-xs md:text-sm font-bold tracking-widest uppercase mb-2 block">
                {card.index}
              </span>
            )}
            {card.location && (
              <p className="text-lg md:text-xl font-bold text-white mb-1">{card.location}</p>
            )}
            {card.subLocation && (
              <p className="text-gray-400 text-sm md:text-base mb-3">{card.subLocation}</p>
            )}
            {card.tags && (
              <p className="text-[#ccff00] text-xs md:text-sm uppercase tracking-wide mb-4">{card.tags}</p>
            )}
            {card.description && (
              <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-3">{card.description}</p>
            )}
            {card.description2 && (
              <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-4">{card.description2}</p>
            )}
            {card.technicalLabel && (
              <p className="text-white text-sm md:text-base mb-2">
                <span className="font-bold">{card.technicalLabel}</span>{' '}
                <span className="text-gray-300 font-light">{card.technicalTags}</span>
              </p>
            )}
            {card.keyAreasLabel && (
              <p className="text-white text-sm md:text-base mb-4">
                <span className="font-bold">{card.keyAreasLabel}</span>{' '}
                <span className="text-gray-300 font-light">{card.keyAreas}</span>
              </p>
            )}
            {card.referenceLabel && (
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">{card.referenceLabel}</p>
            )}
            {card.referenceImage && (
              <div className="w-full aspect-[16/9] overflow-hidden rounded-lg bg-[#111] mb-4">
                <img src={card.referenceImage} alt={card.location || project.detailHeading} className="w-full h-full object-cover" />
              </div>
            )}
            {card.referenceLink && (
              <a
                href={card.referenceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#ccff00] text-sm md:text-base font-bold uppercase tracking-wide hover:text-white transition-colors"
              >
                {card.referenceLinkText}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Project = ({ onCtaClick }) => {
  const [openDetail, setOpenDetail] = useState(null);

  useEffect(() => {
    document.body.style.overflow = openDetail ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [openDetail]);

  return (
    <div id="project" className="bg-[#050505] w-full text-white pt-10 md:pt-20 pb-24 px-6 md:px-16">

      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start w-full z-10 gap-12 lg:gap-0 mb-20 lg:mb-32">

        {/* Left Giant Title */}
        <div className="w-full lg:w-7/12 overflow-visible">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl leading-[0.9] uppercase flex items-center gap-3 whitespace-nowrap">
            Selected
            <span className="font-light italic text-gray-300 lowercase font-serif pr-4 pt-2 md:pt-4">work</span>
          </h2>
        </div>

        {/* Right Description */}
        <div className="w-full lg:w-4/12 flex flex-col items-start lg:mt-4">
          <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-8">
            I transform ideas into engaging digital experiences through modern frontend development, minimal design, and purposeful interactions. My work combines technology and creativity to deliver interfaces that are fast, responsive, intuitive, and ready for the future.
          </p>
          <button onClick={onCtaClick} className="cursor-pointer px-6 py-2.5 rounded-full border border-[#ccff00] bg-[#ccff00] text-black font-medium text-xs md:text-sm hover:bg-[#b3e600] hover:border-[#b3e600] transition-colors flex items-center gap-2">
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>
        </div>
      </div>

      {/* Projects List - Alternating Layout */}
      <div className="flex flex-col gap-24 lg:gap-40 w-full">
        {projects.map((proj, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div key={proj.name} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center justify-between gap-12 lg:gap-16 w-full group`}>

              {/* Image Side */}
              <div
                className={`w-full lg:w-6/12 overflow-hidden relative aspect-[16/10] bg-[#111] rounded-sm cursor-target ${proj.detailCards ? 'cursor-pointer' : ''}`}
                onClick={() => proj.detailCards && setOpenDetail(proj)}
              >
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-5/12 flex flex-col items-start">
                <span className="text-[#ccff00] text-xs md:text-sm font-bold tracking-widest uppercase mb-4">
                  0{idx + 1}
                </span>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white leading-[1.1] uppercase mb-6">
                  {proj.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed mb-10">
                  {proj.description}
                </p>

                <div className="flex items-center gap-4 flex-wrap">
                  {proj.live && (
                    <a href={proj.live} target="_blank" rel="noopener noreferrer" className="cursor-target cursor-pointer px-6 py-2.5 rounded-full border border-[#ccff00] bg-[#ccff00] text-black text-xs md:text-sm font-medium hover:bg-[#b3e600] hover:border-[#b3e600] transition-colors inline-flex items-center gap-2">
                      Live Demo
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </a>
                  )}
                  {proj.detailCards && (
                    <button
                      onClick={() => setOpenDetail(proj)}
                      className="cursor-pointer px-6 py-2.5 rounded-full border border-white/30 text-white text-xs md:text-sm hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2"
                    >
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {openDetail && <DetailModal project={openDetail} onClose={() => setOpenDetail(null)} />}

    </div>
  );
};

export default Project;
