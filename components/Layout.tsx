'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { MobileMenu } from './MobileMenu';
import { MENU_ITEMS } from '@/constants';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            {/* Fixed Header */}
            <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />

            {/* Main Content */}
            <main className="pt-20 pb-16">
                {children}
            </main>

            {/* Mobile Drawer */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                items={MENU_ITEMS}
            />
        </div>
    );
};