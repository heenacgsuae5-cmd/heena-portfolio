import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import contactBgVideo from '../assets/contact_assets/contact_bg.mp4';

const ContactSection = () => {
    const formRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

    const sendEmail = (e) => {
        e.preventDefault();
        
        const formData = new FormData(formRef.current);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
            setStatusMessage({ text: 'Please fill in all required fields.', type: 'error' });
            return;
        }

        setIsSubmitting(true);
        setStatusMessage({ text: '', type: '' });

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            formRef.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then(() => {
            setStatusMessage({ text: 'Message sent successfully!', type: 'success' });
            formRef.current.reset();
        })
        .catch((error) => {
            console.error('EmailJS error:', error);
            setStatusMessage({ text: 'Failed to send message. Please try again later.', type: 'error' });
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    return (
        <div id="contact" className="relative min-h-screen text-white font-sans flex items-center overflow-hidden [clip-path:inset(0)]">
            
            {/* Background Video */}
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="fixed top-0 left-0 w-full h-[100vh] object-cover z-0"
            >
                <source src={contactBgVideo} type="video/mp4" />
            </video>
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70 z-0 pointer-events-none"></div>

            <div className="w-full max-w-7xl mx-auto px-6 md:px-16 py-12 flex flex-col lg:flex-row gap-20 lg:gap-32 relative z-10">
                
                {/* Left Side: Contact Info */}
                <div className="w-full lg:w-5/12 flex flex-col justify-start">
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl mb-16">
                        Get in touch
                    </h2>

                    <div className="flex flex-col gap-10">
                        {/* Email */}
                        <div className="hidden md:block">
                            <p className="text-gray-400 text-sm mb-2">Hire Me</p>
                            <a
                                href="/resume.pdf"
                                download
                                className="inline-flex items-center gap-2 text-xl tracking-wide hover:text-[#ccff00] transition-colors"
                            >
                                Download Resume
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                            </a>
                            {/* Resume PDF placeholder — replace /resume.pdf with the real file path once provided */}
                        </div>

                        {/* Location */}
                        <div className="hidden md:block">
                            <p className="text-gray-400 text-sm mb-2">Location:</p>
                            <p className="text-xl tracking-wide">Sheikh Zayed Road (SZR), Dubai</p>
                        </div>



                        {/* Follow Us */}
                        <div className="mt-4 flex flex-col items-center md:items-start">
                            <p className="text-gray-400 text-sm mb-4">Follow us</p>
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <a href="https://www.linkedin.com/in/heena-ratherb8927117b" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                        <rect width="4" height="12" x="2" y="9"/>
                                        <circle cx="4" cy="4" r="2"/>
                                    </svg>
                                </a>
                                <a href="https://github.com/heenacgsuae5-cmdd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="w-full lg:w-7/12 flex flex-col lg:pt-4">
                    <form ref={formRef} className="flex flex-col gap-5 w-full" onSubmit={sendEmail}>
                        
                        {/* Name and Email Row */}
                        <div className="flex flex-col md:flex-row gap-4 w-full">
                            <div className="flex flex-col gap-1.5 w-full md:w-1/2">
                                <label className="text-xs text-gray-400 font-medium">Your Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="Your full name" 
                                    required
                                    className="w-full bg-[#111] text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all placeholder:text-gray-600 border border-transparent"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5 w-full md:w-1/2">
                                <label className="text-xs text-gray-400 font-medium">Email address</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Your email address" 
                                    required
                                    className="w-full bg-[#111] text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all placeholder:text-gray-600 border border-transparent"
                                />
                            </div>
                        </div>

                        {/* Phone and Subject Row */}
                        <div className="flex flex-col md:flex-row gap-4 w-full">
                            <div className="flex flex-col gap-1.5 w-full md:w-1/2">
                                <label className="text-xs text-gray-400 font-medium">Phone</label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    placeholder="Your phone number" 
                                    className="w-full bg-[#111] text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all placeholder:text-gray-600 border border-transparent"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5 w-full md:w-1/2">
                                <label className="text-xs text-gray-400 font-medium">Subject</label>
                                <input 
                                    type="text" 
                                    name="subject"
                                    placeholder="Subject" 
                                    className="w-full bg-[#111] text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all placeholder:text-gray-600 border border-transparent"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-xs text-gray-400 font-medium">Message</label>
                            <textarea 
                                name="message"
                                placeholder="Write something...." 
                                rows="5"
                                required
                                className="w-full bg-[#111] text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all placeholder:text-gray-600 border border-transparent resize-none"
                            ></textarea>
                        </div>

                        {/* Status Message */}
                        {statusMessage.text && (
                            <div className={`text-sm px-4 py-3 rounded-lg border ${statusMessage.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'}`}>
                                {statusMessage.text}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-white text-black text-sm font-semibold rounded-lg py-3 hover:bg-gray-200 transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </>
                            ) : (
                                'Send Message'
                            )}
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default ContactSection;
