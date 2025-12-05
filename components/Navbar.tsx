import React, { useState } from 'react';
import { Menu, LayoutGrid, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_ITEMS } from '@/constants';
import { MenuItem } from '@/types';

interface NavbarProps {
    onMenuClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
    return (
        <header className="fixed top-0 inset-x-0 z-30 h-20 bg-white border-b border-gray-100 shadow-sm">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24 h-full flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer select-none">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <LayoutGrid className="text-white h-5 w-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-gray-900">Nexus</span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-2 xl:gap-6">
                    {MENU_ITEMS.map((item) => (
                        <DesktopNavItem key={item.id} item={item} />
                    ))}
                </nav>

                {/* Actions & Mobile Trigger */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-4">
                        <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                            Log in
                        </button>
                        <button className="group relative inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                            <span>Get Started</span>
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    );
};

// Desktop Navigation Item Component
const DesktopNavItem: React.FC<{ item: MenuItem }> = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                className={`
          flex items-center gap-1 px-3 xl:px-4 py-2 rounded-full text-sm xl:text-base font-medium transition-all
          ${isHovered ? 'bg-gray-50 text-blue-600' : 'text-gray-600 hover:text-gray-900'}
        `}
            >
                {item.label}
                {hasChildren && (
                    <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${isHovered ? 'rotate-180 text-blue-600' : 'text-gray-400'}`}
                    />
                )}
            </button>

            <AnimatePresence>
                {hasChildren && isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-visible z-40 p-2"
                    >
                        <div className="grid gap-1">
                            {item.children!.map((child) => (
                                <DropdownMenuItem key={child.id} item={child} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Recursive Dropdown Menu Item Component
const DropdownMenuItem: React.FC<{ item: MenuItem }> = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <a
                href={item.href || '#'}
                className="group flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors relative"
            >
                {item.icon && (
                    <div className="shrink-0 mt-0.5">
                        <div className="h-8 w-8 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-md transition-all">
                            <item.icon size={16} />
                        </div>
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {item.label}
                        </div>
                        {hasChildren && (
                            <ChevronDown
                                size={14}
                                className={`transform -rotate-90 text-gray-400 transition-transform ${isHovered ? 'text-blue-600' : ''}`}
                            />
                        )}
                    </div>
                    {item.description && (
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                            {item.description}
                        </p>
                    )}
                </div>
            </a>

            <AnimatePresence>
                {hasChildren && isHovered && (
                    <motion.div
                        initial={{ opacity: 0, x: -10, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-0 left-full ml-2 w-72 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-visible z-50 p-2"
                    >
                        <div className="grid gap-1">
                            {item.children!.map((child) => (
                                <DropdownMenuItem key={child.id} item={child} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};