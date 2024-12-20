import React from 'react';
import LLogo from '../LLogo';

function LLawFooter() {
    // Navigation Links
    const navLinks = [
        { text: 'About', href: '/about' },
        { text: 'Services', href: '/services' },
        { text: 'Why us', href: '/why-us' },
        { text: 'Contact', href: '/contact' }
    ];

    // Social Media Links
    const socialLinks = [
        {
            name: 'Facebook',
            href: 'https://facebook.com/loopholelaw',
            icon: (
                <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M3.89782 12V6.53514H5.67481L5.93895 4.39547H3.89782V3.03259C3.89782 2.41516 4.06363 1.99243 4.91774 1.99243H6V0.0847928C5.47342 0.0262443 4.94412 -0.00202566 4.41453 0.000112795C2.84383 0.000112795 1.76542 0.994936 1.76542 2.82122V4.39147H0V6.53114H1.76928V12H3.89782Z" fill="currentColor" />
                </svg>
            )
        },
        {
            name: 'Instagram',
            href: 'https://instagram.com/loopholelaw',
            icon: (
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M5.99536 2.91345C5.17815 2.91345 4.39441 3.23809 3.81655 3.81594C3.2387 4.3938 2.91406 5.17754 2.91406 5.99475C2.91406 6.81196 3.2387 7.5957 3.81655 8.17356C4.39441 8.75141 5.17815 9.07605 5.99536 9.07605C6.81257 9.07605 7.59631 8.75141 8.17417 8.17356C8.75202 7.5957 9.07666 6.81196 9.07666 5.99475C9.07666 5.17754 8.75202 4.3938 8.17417 3.81594C7.59631 3.23809 6.81257 2.91345 5.99536 2.91345Z" fill="currentColor" />
                    <path d="M11.6821 2.06975C11.5279 1.67138 11.2921 1.30961 10.99 1.00759C10.6879 0.705576 10.326 0.469972 9.92759 0.31586C9.46135 0.140842 8.9688 0.0462069 8.4709 0.0359839C7.82919 0.00799638 7.62594 0 5.99867 0C4.37139 0 4.16282 -6.70254e-08 3.52643 0.0359839C3.02891 0.0456842 2.53671 0.140339 2.07108 0.31586C1.67255 0.469792 1.31059 0.705333 1.00844 1.00737C0.706289 1.30941 0.47061 1.67127 0.316526 2.06975C0.141474 2.53595 0.0470554 3.02855 0.0373167 3.52643C0.00866281 4.16748 0 4.37072 0 5.99867C0 7.62594 -4.96485e-09 7.83319 0.0373167 8.4709C0.0473123 8.96935 0.14127 9.46113 0.316526 9.92825C0.471042 10.3266 0.70695 10.6883 1.00918 10.9903C1.3114 11.2923 1.6733 11.5279 2.07175 11.6821C2.5365 11.8642 3.0289 11.9656 3.52777 11.982C4.16948 12.01 4.37272 12.0187 6 12.0187C7.62728 12.0187 7.83585 12.0187 8.47223 11.982C8.97008 11.9719 9.46262 11.8775 9.92892 11.7028C10.3272 11.5483 10.689 11.3125 10.9911 11.0104C11.2932 10.7083 11.529 10.3466 11.6835 9.94825C11.8587 9.48179 11.9527 8.99 11.9627 8.49156C11.9913 7.85051 12 7.64727 12 6.01932C12 4.39138 12 4.18481 11.9627 3.54709C11.9549 3.04216 11.86 2.54237 11.6821 2.06975Z" fill="currentColor" />
                </svg>
            )
        },
        {
            name: 'YouTube',
            href: 'https://www.youtube.com/channel/UCjtCbnkIaiCJgj13sEZ9iqw',
            icon: (
                <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12.7355 1.415C12.6616 1.14357 12.517 0.896024 12.3162 0.697014C12.1154 0.498004 11.8654 0.354468 11.5911 0.280692C10.5739 0.00450089 6.5045 4.87928e-06 6.5045 4.87928e-06C6.5045 4.87928e-06 2.43578 -0.00449139 1.41795 0.259496C1.14379 0.336667 0.894302 0.482233 0.693428 0.68222C0.492554 0.882207 0.347041 1.1299 0.270859 1.40152C0.00259923 2.40737 9.51671e-07 4.49358 9.51671e-07 4.49358C9.51671e-07 4.49358 -0.0025972 6.59006 0.263714 7.58564C0.413109 8.13609 0.851549 8.57094 1.40885 8.71931C2.43643 8.9955 6.49476 9 6.49476 9C6.49476 9 10.5641 9.00449 11.5813 8.74115C11.8557 8.6675 12.106 8.52429 12.3073 8.32569C12.5086 8.12709 12.6539 7.87996 12.729 7.60876C12.998 6.60355 12.9999 4.51798 12.9999 4.51798C12.9999 4.51798 13.0129 2.42086 12.7355 1.415ZM5.20282 6.42628L5.20607 2.57244L8.58823 4.50257L5.20282 6.42628Z" fill="currentColor" />
                </svg>
            )
        }
    ];

    return (
        <footer className="w-full bg-black text-white">
            <div className="max-w-[1240px] mx-auto px-4 py-16">
                {/* Contact Section */}
                <div className="w-full text-5xl md:text-7xl font-bold mb-8">
                    <h2 className="w-full md:w-2/3">How can we help you. get in touch</h2>
                </div>
                <div className="flex mt-8 flex-col md:flex-row md:justify-between">
                    <p className="w-full md:w-2/3 text-gray-400">
                        Need legal assistance? Our experienced team is here to help navigate complex legal matters with precision and expertise. 
                        Contact us today for a consultation and let us guide you towards the best legal solutions.
                    </p>
                    <div className="w-44 pt-6 md:pt-0">
                        <a 
                            href="/contact" 
                            className="bg-green-500 hover:bg-green-600 justify-center text-center rounded-lg shadow px-10 py-3 flex items-center transition-colors"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="mt-16">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* Logo */}
                        <a href="/" className="hover:opacity-90 transition-opacity">
                            <LLogo />
                        </a>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.text}
                                    href={link.href}
                                    className="cursor-pointer text-gray-600 hover:text-green-400 uppercase transition-colors"
                                >
                                    {link.text}
                                </a>
                            ))}
                        </nav>

                        {/* Social Links */}
                        <div className="flex gap-8 items-center">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="text-white hover:text-green-400 transition-colors"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <hr className="border-gray-600 my-8" />
                    <p className="text-center text-gray-600">
                        Copyright © 2024 LoopHoleLaw. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default LLawFooter;