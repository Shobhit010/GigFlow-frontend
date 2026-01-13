import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGigs } from '../../store/slices/gigSlice';
import { Input } from '../../components/ui/Input';
import { Skeleton } from '../../components/ui/Skeleton';
import GigCard from '../../components/GigCard';
import { motion, AnimatePresence } from 'framer-motion';

const GigFeed = () => {
    const dispatch = useDispatch();
    const { gigs, loading, error } = useSelector((state) => state.gigs);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        // Debounce search
        const delayDebounceFn = setTimeout(() => {
            dispatch(fetchGigs(keyword));
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [keyword, dispatch]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-brand-dark)] pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-grid-white/[0.02]">
            {/* Background decorative elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                    <div className="text-center md:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
                        >
                            Find your next <span className="text-gradient">Opportunity</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-zinc-400 text-lg max-w-lg"
                        >
                            Browse high-quality gigs and start earning today.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full md:w-96 relative z-50"
                    >
                        <Input
                            placeholder="Search gigs by title or keywords..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="bg-zinc-900 border-zinc-800 focus:ring-indigo-500 h-12"
                        />
                    </motion.div>
                </div>

                {loading && gigs.length === 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 h-64 flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-6 w-1/2" />
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                </div>
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/5" />
                                <Skeleton className="h-4 w-3/4" />
                                <div className="mt-auto pt-4 border-t border-zinc-800 flex justify-between items-center">
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                    <Skeleton className="h-10 w-32 rounded-lg" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center text-red-400 mt-20 bg-red-500/10 p-4 rounded-xl border border-red-500/20 max-w-lg mx-auto">
                        {error}
                    </div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {gigs.map((gig) => (
                                <GigCard key={gig._id} gig={gig} />
                            ))}
                        </AnimatePresence>
                        {gigs.length === 0 && !loading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full flex flex-col items-center justify-center text-zinc-500 py-32"
                            >
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-medium text-white">No gigs found</h3>
                                <p className="mt-2">Try adjusting your search terms.</p>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default GigFeed;
