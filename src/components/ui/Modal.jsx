import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";

export const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl"
                    >
                        <div className="p-6">
                            {title && (
                                <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
                            )}
                            <div className="text-zinc-300">{children}</div>
                        </div>
                        {footer && (
                            <div className="border-t border-zinc-800 px-6 py-4 bg-zinc-900/50 flex justify-end gap-3">
                                {footer}
                            </div>
                        )}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
