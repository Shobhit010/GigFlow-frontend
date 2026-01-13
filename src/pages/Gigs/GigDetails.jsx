import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGigById } from '../../store/slices/gigSlice';
import { placeBid, fetchBidsByGig, hireFreelancer, resetBidState } from '../../store/slices/bidSlice';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { TextArea } from '../../components/ui/TextArea';
import { Label } from '../../components/ui/Label';
import { Modal } from '../../components/ui/Modal';
import BidCard from '../../components/BidCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '../../components/ui/Skeleton';

const GigDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { gig, loading: gigLoading, error: gigError } = useSelector((state) => state.gigs);
    const { userInfo } = useSelector((state) => state.auth);
    const { bids, loading: bidLoading, success: bidSuccess, error: bidError } = useSelector((state) => state.bids);

    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [isHireModalOpen, setIsHireModalOpen] = useState(false);
    const [selectedBidId, setSelectedBidId] = useState(null);

    useEffect(() => {
        dispatch(fetchGigById(id));
        return () => {
            dispatch(resetBidState());
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (gig && userInfo && gig.user?._id === userInfo._id) {
            dispatch(fetchBidsByGig(id));
        }
    }, [dispatch, gig, userInfo, id, bidSuccess]);

    useEffect(() => {
        if (bidSuccess) {
            if (gig?.user?._id !== userInfo?._id) {
                setAmount('');
                setMessage('');
                alert('Proposal sent successfully!'); // Could be a toast
            }
            setIsHireModalOpen(false);
            setSelectedBidId(null);
            dispatch(resetBidState());
            // Re-fetch gig to update status if hired
            dispatch(fetchGigById(id));
        }
    }, [bidSuccess, dispatch, gig, userInfo, id]);

    const submitBidHandler = (e) => {
        e.preventDefault();
        dispatch(placeBid({ gigId: id, amount, message }));
    };

    const initiateHire = (bidId) => {
        setSelectedBidId(bidId);
        setIsHireModalOpen(true);
    };

    const confirmHire = () => {
        if (selectedBidId) {
            dispatch(hireFreelancer(selectedBidId));
        }
    };

    if (gigLoading) return (
        <div className="min-h-screen bg-[var(--color-brand-dark)] pt-32 px-4 max-w-7xl mx-auto">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Skeleton className="col-span-2 h-96 rounded-2xl" />
                <Skeleton className="h-64 rounded-2xl" />
            </div>
        </div>
    );

    if (gigError) return <div className="text-center text-red-500 mt-32">{gigError}</div>;
    if (!gig) return null;

    const isOwner = userInfo && gig.user?._id === userInfo._id;

    return (
        <div className="min-h-screen bg-[var(--color-brand-dark)] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Gig Info */}
                <div className="lg:col-span-2 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
                            <span className="text-9xl font-bold text-white tracking-tighter">
                                {gig.status === 'open' ? 'GIG' : gig.status.toUpperCase()}
                            </span>
                        </div>

                        <div className="relative z-10">
                            <div className="flex gap-3 mb-6">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${gig.status === 'open' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        gig.status === 'assigned' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                            'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                                    }`}>
                                    {gig.status.toUpperCase()}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                    Full-Stack Development
                                </span>
                            </div>

                            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
                                {gig.title}
                            </h1>

                            <div className="flex items-center flex-wrap gap-6 text-sm text-zinc-400 border-b border-zinc-800 pb-8 mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-zinc-800 rounded-lg">
                                        💰
                                    </div>
                                    <div>
                                        <p className="text-xs">Budget</p>
                                        <p className="font-bold text-white text-lg">${gig.budget}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-zinc-800 rounded-lg">
                                        👤
                                    </div>
                                    <div>
                                        <p className="text-xs">Client</p>
                                        <p className="font-bold text-white text-base">{gig.user?.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-zinc-800 rounded-lg">
                                        📅
                                    </div>
                                    <div>
                                        <p className="text-xs">Posted</p>
                                        <p className="font-bold text-white text-base">{new Date(gig.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-invert prose-p:text-zinc-300 prose-headings:text-white max-w-none">
                                <h3 className="text-xl font-semibold mb-4 text-white">Project Description</h3>
                                <p className="whitespace-pre-line leading-relaxed text-zinc-300">
                                    {gig.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bids List (Owner) */}
                    {isOwner && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                Received Proposals
                                <span className="bg-zinc-800 text-zinc-400 text-sm py-1 px-3 rounded-full">{bids.length}</span>
                            </h2>
                            <div className="flex flex-col gap-4">
                                <AnimatePresence mode="popLayout">
                                    {bids.length === 0 ? (
                                        <div className="text-center py-12 bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed">
                                            <p className="text-zinc-500">No proposals yet. Check back soon!</p>
                                        </div>
                                    ) : (
                                        bids.map((bid) => (
                                            <BidCard
                                                key={bid._id}
                                                bid={bid}
                                                isOwner={isOwner}
                                                gigStatus={gig.status}
                                                onHire={initiateHire}
                                            />
                                        ))
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Right Column: Action Sidebar */}
                <div className="lg:col-span-1">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="sticky top-32"
                    >
                        {/* Freelancer Apply Form */}
                        {!isOwner && userInfo && gig.status === 'open' && (
                            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-white mb-4">Submit a Proposal</h3>
                                <p className="text-sm text-zinc-400 mb-6">
                                    Interest in this gig? Send a competitive bid to work with {gig.user?.name}.
                                </p>

                                {bidError && (
                                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                        {bidError}
                                    </div>
                                )}

                                <form onSubmit={submitBidHandler} className="space-y-4">
                                    <div>
                                        <Label>Your Bid ($)</Label>
                                        <div className="relative mt-1">
                                            <span className="absolute left-3 top-2.5 text-zinc-500">$</span>
                                            <Input
                                                type="number"
                                                className="pl-8 bg-zinc-950/50"
                                                placeholder={gig.budget}
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Cover Letter</Label>
                                        <TextArea
                                            className="mt-1 bg-zinc-950/50 min-h-[150px]"
                                            placeholder="Introduce yourself and explain why you're the best fit..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                                        disabled={bidLoading}
                                    >
                                        {bidLoading ? 'Sending...' : 'Submit Proposal'}
                                    </Button>
                                </form>
                            </div>
                        )}

                        {!userInfo && (
                            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center">
                                <h3 className="text-white font-bold mb-2">Join to Apply</h3>
                                <p className="text-zinc-400 text-sm mb-6">You must be logged in to bid on gigs.</p>
                                <Button onClick={() => navigate('/login')} className="w-full">
                                    Log In / Sign Up
                                </Button>
                            </div>
                        )}

                        {gig.status !== 'open' && (
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 text-center opacity-80">
                                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    🔒
                                </div>
                                <h3 className="text-white font-bold mb-2">Gig Closed</h3>
                                <p className="text-zinc-400 text-sm">
                                    This gig is no longer accepting proposals.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Hire Confirmation Modal */}
            <Modal
                isOpen={isHireModalOpen}
                onClose={() => setIsHireModalOpen(false)}
                title="Hire Freelancer"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsHireModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            className="bg-green-600 hover:bg-green-500"
                            onClick={confirmHire}
                        >
                            Confirm Hire
                        </Button>
                    </>
                }
            >
                <p className="text-zinc-300">
                    Are you sure you want to hire this freelancer? This action:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-zinc-400">
                    <li>Will mark the gig as <strong>Assigned</strong>.</li>
                    <li>Will notify the freelancer.</li>
                    <li>Cannot be undone easily.</li>
                </ul>
            </Modal>
        </div>
    );
};

export default GigDetails;
