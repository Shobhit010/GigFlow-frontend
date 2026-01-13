import React from "react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

export const Button = React.forwardRef(
    ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
        const variants = {
            primary:
                "bg-gradient-to-r from-[var(--color-primary-violet)] to-[var(--color-primary-cyan)] text-white hover:opacity-90 shadow-lg shadow-indigo-500/20",
            secondary:
                "bg-[var(--color-brand-gray)] border border-[var(--color-brand-border)] text-white hover:bg-zinc-800",
            outline:
                "bg-transparent border border-[var(--color-brand-border)] text-zinc-300 hover:text-white hover:border-zinc-600",
            ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/50",
        };

        const sizes = {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";
