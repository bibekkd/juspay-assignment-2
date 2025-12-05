import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls, PanInfo } from 'framer-motion';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import { MenuItem } from '@/types';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    items: MenuItem[];
}

// Animation variants for the slide transitions
const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
    }),
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, items }) => {
    // Navigation stack state
    const [history, setHistory] = useState<{ title: string; items: MenuItem[] }[]>([
        { title: 'Main', items },
    ]);

    // Direction tracking for animation
    const [direction, setDirection] = useState(0);

    // Drag controls to handle gesture on specific areas
    const dragControls = useDragControls();

    // Reset state when menu closes
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setHistory([{ title: 'Main', items }]);
                setDirection(0);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen, items]);

    const currentLevel = history[history.length - 1];
    const isRoot = history.length === 1;

    const handleNavigate = (item: MenuItem) => {
        if (item.children) {
            setDirection(1);
            setHistory((prev) => [
                ...prev,
                { title: item.label, items: item.children! },
            ]);
        } else {
            console.log('Navigating to:', item.href);
            onClose();
        }
    };

    const handleBack = () => {
        if (history.length > 1) {
            setDirection(-1);
            setHistory((prev) => prev.slice(0, -1));
        }
    };

    const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        // If dragged down more than 100px or with sufficient velocity, close
        if (info.offset.y > 100 || info.velocity.y > 300) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Drawer Container */}
                    <motion.div
                        drag="y"
                        dragListener={false} // Disable default drag listener to avoid scroll conflict
                        dragControls={dragControls}
                        dragConstraints={{ top: 0, bottom: 0 }} // Elastic snap back
                        dragElastic={{ top: 0, bottom: 0.5 }} // Resistance when dragging
                        onDragEnd={onDragEnd}
                        initial={{ y: '100%' }}
                        animate={{ y: '5%' }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-x-0 bottom-0 z-50 flex flex-col overflow-hidden rounded-t-[2rem] bg-gray-50 h-[95%] shadow-2xl"
                    >
                        {/* Draggable Header Area */}
                        <div
                            onPointerDown={(e) => dragControls.start(e)}
                            className="touch-none cursor-grab active:cursor-grabbing bg-gray-50 pt-3 pb-1 flex-shrink-0 flex justify-center w-full"
                        >
                            <div className="h-1.5 w-12 rounded-full bg-gray-300" />
                        </div>

                        {/* Navigation Header */}
                        <div
                            className="relative flex items-center justify-between px-6 py-4 flex-shrink-0 bg-gray-50"
                            onPointerDown={(e) => dragControls.start(e)} // Allow dragging from header too
                        >
                            <div className="w-8">
                                {!isRoot && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleBack(); }}
                                        className="flex items-center justify-center rounded-full p-1 text-gray-500 hover:bg-gray-100 transition-colors"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                )}
                            </div>

                            <h2 className="text-lg font-bold text-gray-900 pointer-events-none select-none">
                                {!isRoot ? currentLevel.title : 'Menu'}
                            </h2>

                            <div className="w-8 flex justify-end">
                                <button
                                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                                    className="rounded-full bg-gray-200 p-1.5 text-gray-500 hover:bg-gray-300 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="relative flex-1 overflow-hidden bg-gray-50 w-full">
                            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                <motion.div
                                    key={history.length}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                                    className="absolute inset-0 overflow-y-auto no-scrollbar px-4 pb-10"
                                >
                                    <div className="flex flex-col space-y-2">
                                        {currentLevel.items.map((item) => (
                                            <div
                                                key={item.id}
                                                onClick={() => handleNavigate(item)}
                                                className="group flex cursor-pointer items-start space-x-4 rounded-xl p-3 transition-colors active:scale-[0.98] active:bg-gray-200 hover:bg-white hover:shadow-sm"
                                            >
                                                {item.icon && (
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm ring-1 ring-gray-900/5 group-hover:text-blue-600">
                                                        <item.icon size={20} strokeWidth={2} />
                                                    </div>
                                                )}

                                                <div className="flex flex-1 flex-col">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-semibold text-gray-900">
                                                            {item.label}
                                                        </span>
                                                    </div>
                                                    {item.description && (
                                                        <p className="mt-0.5 text-sm leading-snug text-gray-500">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </div>

                                                {item.children && (
                                                    <div className="flex h-10 w-6 items-center justify-center text-gray-400">
                                                        <ChevronRight size={18} />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};