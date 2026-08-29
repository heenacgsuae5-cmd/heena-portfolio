import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryMedia = {
  sea: {
    video: 'https://res.cloudinary.com/drjkfozmr/video/upload/v1780763305/WhatsApp_Video_2026-06-06_at_19.39.03_fplywu.mp4',
    images: [
      'https://i.imgur.com/wQPGDlH.jpg',
      'https://i.imgur.com/7unUsa6.jpg',
      'https://i.imgur.com/QpG7F9v.jpg',
      'https://i.imgur.com/CDDLrWh.jpg',
      'https://i.imgur.com/qAXgLzv.jpg',
    ],
  },
  air: {
    images: [
      'https://i.imgur.com/2wbzrIk.jpg',
      'https://i.imgur.com/CcrfU3W.jpg',
      'https://i.imgur.com/eEVaZyJ.jpeg',
      'https://i.imgur.com/CDSFUAU.jpeg',
    ],
  },
  land: {
    images: [
      'https://i.imgur.com/TkRz2Wo.jpeg',
      'https://i.imgur.com/yuONcEL.jpeg',
      'https://i.imgur.com/fgjF2CH.jpeg',
      'https://i.imgur.com/Egd7aJD.jpeg',
    ],
  },
  customs: {
    video: 'https://res.cloudinary.com/drjkfozmr/video/upload/WhatsApp_Video_2026-08-19_at_14.37.08_y0yviy.mp4',
  },
};

const galleryTitles = {
  sea: { eyebrow: 'Handled Sea Freight', heading: 'Sea Freight — My Work' },
  air: { heading: 'Air Freight — My Work' },
  land: { heading: 'Land Freight — My Work' },
  customs: { eyebrow: 'Documentation Handling', heading: 'Customs Clearance & Documentation — My Work' },
};

const servicesData = [
  {
    id: '01',
    title: 'SEA FREIGHT',
    description: 'I coordinate end-to-end import and export shipments by ocean freight, working with carriers and partners across the GCC, Asia, and global trade corridors to deliver reliable, cost-effective transportation.',
    capabilities: [
      'Freight sourcing and rate negotiation with carriers',
      'Shipment planning and end-to-end coordination',
      'Cross-border logistics across GCC, Asia & global corridors',
      'Converting client enquiries into long-term relationships',
      'Reliable, cost-effective transportation solutions'
    ],
    buttonText: 'MY WORK',
    gallery: true,
    galleryKey: 'sea'
  },
  {
    id: '02',
    title: 'AIR FREIGHT',
    description: 'I manage time-sensitive air freight shipments end to end, coordinating with airlines and partners to move cargo quickly and reliably across international trade corridors.',
    capabilities: [
      'Air freight sourcing and rate negotiation',
      'Time-sensitive shipment coordination',
      'Cross-border logistics across GCC, Asia & global corridors',
      'Converting client enquiries into long-term relationships',
      'Reliable, cost-effective transportation solutions'
    ],
    buttonText: 'MY WORK',
    gallery: true,
    galleryKey: 'air'
  },
  {
    id: '03',
    title: 'LAND FREIGHT',
    description: 'I coordinate land freight shipments across regional and cross-border routes, ensuring smooth, on-time delivery for clients across the GCC and beyond.',
    capabilities: [
      'Land freight sourcing and rate negotiation',
      'Shipment planning and end-to-end coordination',
      'Cross-border logistics across GCC, Asia & global corridors',
      'Converting client enquiries into long-term relationships',
      'Reliable, cost-effective transportation solutions'
    ],
    buttonText: 'MY WORK',
    gallery: true,
    galleryKey: 'land'
  },
  {
    id: '04',
    title: 'CUSTOMS CLEARANCE & DOCUMENTATION',
    description: 'I handle customs clearance documentation and compliance to keep shipments moving without delays, so businesses can trade across borders with confidence.',
    capabilities: [
      'Customs clearance documentation',
      'VAT compliance',
      'Import/export paperwork',
      'Regulatory compliance checks',
      'Client RFQ handling'
    ],
    buttonText: 'MY WORK',
    gallery: true,
    galleryKey: 'customs'
  },
  {
    id: '05',
    title: 'CLIENT & CRM MANAGEMENT',
    description: 'I manage client relationships and service operations end to end — from resolving order issues to maintaining accurate records that keep every account running smoothly.',
    capabilities: [
      'Zendesk',
      'Salesforce Service Cloud',
      'Customer escalations',
      'CRM record management',
      'Order issue resolution',
      'Client handling'
    ]
  },
  {
    id: '06',
    title: 'LOGISTICS WEB DEVELOPMENT',
    description: 'I build websites for logistics and freight brands — combining my industry knowledge with web development to create sites that showcase services and generate leads.',
    capabilities: [
      'React & modern frontend frameworks',
      'Conversion-focused landing pages',
      'GSAP animations',
      'Lead-generation forms',
      'Deployment (Netlify / Vercel)'
    ],
    buttonText: 'VIEW WEBSITE',
    link: 'https://heena-freight-broker.vercel.app/'
  },
  {
    id: '07',
    title: 'DIGITAL MARKETING & LEAD GEN',
    description: 'I use website development and content strategy as tools for lead generation, helping logistics and trade businesses turn visitors into enquiries.',
    capabilities: [
      'Website Development & Lead Generation',
      'Digital Marketing',
      'Content Management',
      'Brand positioning'
    ]
  },
  {
    id: '08',
    title: 'TOOLS & OPERATIONS',
    description: 'I keep operations running smoothly using the right tools for communication, service management, and shipment tracking.',
    capabilities: [
      'Git & GitHub',
      'Web3Forms',
      'Zendesk',
      'Salesforce',
      'Shipment coordination tools'
    ]
  }
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(null);
  const itemRefs = useRef([]);

  const titleRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  // Lock scroll while gallery modal is open
  useEffect(() => {
    document.body.style.overflow = galleryOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [galleryOpen]);

  const handleServiceButtonClick = (e, service) => {
    e.stopPropagation();
    if (service.link) {
      window.open(service.link, '_blank', 'noopener,noreferrer');
    } else if (service.gallery) {
      setGalleryOpen(service.galleryKey);
    }
  };

  return (
    <section id="service" className="md:min-h-screen bg-[#050505] text-white pt-12 pb-12 md:pb-24 px-6 md:px-16 flex flex-col relative overflow-hidden">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row items-end md:items-start justify-end w-full mt-0 z-0 pb-12">
        {/* Giant Title */}
        <div className="flex flex-col md:flex-row items-start justify-end gap-2 md:gap-4 lg:gap-8 pr-2 md:pr-0 text-right">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl leading-[1.1] md:leading-[0.9] text-right">
            WHAT I<br/>CAN DO
          </h2>
        </div>
      </div>

      {/* Accordion List */}
      <div className="z-10 relative mt-0 -mx-6 md:-mx-16 border-t border-white/20">
        {servicesData.map((service, index) => {
          const isHighlighted = activeIndex === index || (!isMobile && hoveredIndex === index);
          
          return (
          <div 
            key={service.id} 
            ref={(el) => itemRefs.current[index] = el}
            data-index={index}
            className={`cursor-target border-b border-white/20 py-5 md:py-7 px-6 md:px-16 cursor-pointer transition-all duration-300 ease-in-out ${
              isHighlighted ? 'bg-[#ccff00]' : ''
            }`}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start">
              
              {/* Left Side: Number, Title & Capabilities */}
              <div className="flex items-start justify-between w-full lg:w-1/2 gap-2">
                <div className="flex items-start gap-3 md:gap-16 w-full min-w-0">
                  <div className="h-7 flex items-center md:h-10 flex-shrink-0">
                    <span className={`text-lg md:text-3xl font-medium transition-colors duration-300 ease-in-out leading-none ${
                      isHighlighted ? 'text-black' : 'text-white'
                    }`}>
                      {service.id}
                    </span>
                  </div>
                  <div className="flex flex-col w-full min-w-0">
                    <div className="h-7 flex items-center md:h-10">
                      <h3 className={`text-[11px] sm:text-sm md:text-xl lg:text-2xl font-black uppercase tracking-wide leading-none transition-colors duration-300 ease-in-out whitespace-nowrap overflow-hidden text-ellipsis ${
                        isHighlighted ? 'text-black' : 'text-white'
                      }`}>
                        {service.title}
                      </h3>
                    </div>
                    
                    {/* Expanded Capabilities */}
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out w-full ${
                        activeIndex === index ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pt-6 lg:pt-8 flex flex-col gap-3">
                        <ul className={`transition-colors duration-300 ease-in-out text-sm md:text-base font-light space-y-2 flex flex-col ${
                          isHighlighted ? 'text-black/80' : 'text-gray-300'
                        }`}>
                          {service.capabilities.map((cap, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className={`transition-colors duration-300 ease-in-out mt-1.5 opacity-70 text-[10px] ${
                                isHighlighted ? 'text-black' : 'text-[#ccff00]'
                              }`}>■</span>
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Arrow Icon */}
                <div className="h-7 flex items-center flex-shrink-0 lg:hidden">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`w-6 h-6 transition-all duration-300 ${
                      isHighlighted ? 'text-black' : 'text-[#ccff00]'
                    } ${activeIndex === index ? '-rotate-45' : 'rotate-45'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Right Side: Description, Button & Desktop Arrow */}
              <div className="flex flex-row gap-6 w-full lg:w-1/2 justify-between lg:justify-end relative items-start">
                
                {/* Expanded Description */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out flex flex-col items-start w-full ${
                    activeIndex === index ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                   <div className="pt-4 md:pt-6 lg:pt-[72px] flex flex-col gap-6 w-full pr-0 lg:pr-12">
                     <p className={`transition-colors duration-300 ease-in-out text-base md:text-lg leading-relaxed max-w-lg font-light ${
                       isHighlighted ? 'text-black/80' : 'text-gray-300'
                     }`}>
                       {service.description}
                     </p>
                     {service.buttonText && (
                       <button
                         onClick={(e) => handleServiceButtonClick(e, service)}
                         className={`font-bold uppercase tracking-wider text-xs md:text-sm px-6 py-3 border transition-colors duration-300 ease-in-out flex items-center gap-2 mt-4 ${
                         isHighlighted ? 'bg-black text-[#ccff00] border-black' : 'bg-[#ccff00] text-black border-[#ccff00]'
                       }`}>
                         <span className="w-2 h-2 border-t border-l border-current"></span>
                         {service.buttonText}
                         <span className="w-2 h-2 border-b border-r border-current"></span>
                       </button>
                     )}
                   </div>
                </div>

                {/* Desktop Arrow Icon */}
                <div className="hidden lg:flex flex-shrink-0 h-10 items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`w-10 h-10 transition-all duration-300 ${
                      isHighlighted ? 'text-black' : 'text-[#ccff00]'
                    } ${activeIndex === index ? '-rotate-45' : 'rotate-45'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

              </div>

            </div>
          </div>
          );
        })}
      </div>

      {/* Gallery Modal — Sea / Air / Land Freight project media */}
      {galleryOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-start md:items-center justify-center overflow-y-auto py-10 px-4"
          onClick={() => setGalleryOpen(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setGalleryOpen(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-[#ccff00] hover:text-black flex items-center justify-center transition-colors z-10"
              aria-label="Close gallery"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide mb-6 pr-10">
              {galleryTitles[galleryOpen]?.eyebrow && (
                <span className="block text-[#ccff00] text-xs md:text-sm font-bold uppercase tracking-widest mb-2">
                  {galleryTitles[galleryOpen].eyebrow}
                </span>
              )}
              {galleryTitles[galleryOpen]?.heading}
            </h3>

            {galleryMedia[galleryOpen].video && (
              <video
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full rounded-lg mb-6 bg-black"
              >
                <source src={galleryMedia[galleryOpen].video} type="video/mp4" />
              </video>
            )}

            {galleryMedia[galleryOpen].images && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {galleryMedia[galleryOpen].images.map((src, i) => (
                  <div key={i} className="aspect-[4/3] overflow-hidden rounded-lg bg-[#111]">
                    <img
                      src={src}
                      alt={`${galleryOpen} freight project ${i + 1}`}
                      className="w-full h-full object-contain bg-[#111]"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
    </section>
  );
};

export default Services;
