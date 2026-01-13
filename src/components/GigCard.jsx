import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';

const GigCard = ({ gig }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -5 }}
            className="group relative h-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition-all duration-300 flex flex-col overflow-hidden"
        >
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-px rounded-[15px] bg-zinc-950/50 group-hover:bg-zinc-950/30 transition-colors duration-300 -z-10" />

            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all duration-300">
                    {gig.title}
                </h3>
                <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-500/20 shadow-[0_0_10px_-5px_var(--color-primary-violet)]">
                    ${gig.budget}
                </span>
            </div>

            <p className="text-zinc-400 text-sm mb-6 line-clamp-3 text-pretty flex-grow">
                {gig.description}
            </p>

            <div className="mt-auto">
                <div className="flex justify-between items-center text-xs text-zinc-500 border-t border-zinc-800 pt-4 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
                            {gig.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <span className="font-medium text-zinc-400">{gig.user?.name || 'Unknown'}</span>
                    </div>
                </div>

                <Link to={`/gigs/${gig._id}`} className="block w-full">
                    <Button
                        variant="secondary"
                        className="w-full group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500/50 transition-all duration-300"
                    >
                        View Details
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
};

export default GigCard;
