import React from 'react';
import Logo from '@/components/logo';
import Link from "next/link"

const Footer = () => {
    return (
        <footer>
            <Logo />
            <div className="legal-links">
                <Link href="/terms">Terms of Service</Link>
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/contact">Contact Us</Link>
            </div>
            <div className="copyright">
                &copy; {new Date().getFullYear()} Francisco Coya. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;