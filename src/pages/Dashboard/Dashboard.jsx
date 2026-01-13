import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyGigs } from '../../store/slices/gigSlice';
import { fetchMyBids } from '../../store/slices/bidSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const { gigs, loading: gigsLoading } = useSelector((state) => state.gigs);
    const { bids, loading: bidsLoading } = useSelector((state) => state.bids);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            dispatch(fetchMyGigs());
            dispatch(fetchMyBids());
        }
    }, [dispatch, userInfo, navigate]);

    if (!userInfo) return null;

    return (
        <div className="min-h-screen bg-slate-950 pt-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
                    <Link to="/create-gig">
                        <Button>Post a New Gig</Button>
                    </Link>
                </div>

                {/* My Gigs Section */}
                <section>
                    <h2 className="text-2xl font-semibold text-white mb-6 border-b border-slate-800 pb-2">My Posted Gigs</h2>
                    {gigsLoading ? <div className="text-slate-400">Loading gigs...</div> : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {gigs.length > 0 ? gigs.map(gig => (
                                <Link to={`/gigs/${gig._id}`} key={gig._id}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-xl hover:border-indigo-500/50 transition-colors"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-white truncate w-3/4">{gig.title}</h3>
                                            <span className={`text-xs px-2 py-1 rounded-full ${gig.status === 'open' ? 'bg-green-500/20 text-green-400' :
                                                    gig.status === 'assigned' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-300'
                                                }`}>
                                                {gig.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{gig.description}</p>
                                        <div className="font-semibold text-white">${gig.budget}</div>
                                    </motion.div>
                                </Link>
                            )) : (
                                <p className="text-slate-500 col-span-full">You haven't posted any gigs yet.</p>
                            )}
                        </div>
                    )}
                </section>

                {/* My Bids Section */}
                <section>
                    <h2 className="text-2xl font-semibold text-white mb-6 border-b border-slate-800 pb-2">My Active Bids</h2>
                    {bidsLoading ? <div className="text-slate-400">Loading bids...</div> : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {bids.length > 0 ? bids.map(bid => (
                                <Link to={`/gigs/${bid.gig._id}`} key={bid._id}>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-xl hover:bg-slate-800/50 transition-colors flex justify-between items-center"
                                    >
                                        <div>
                                            <h3 className="font-bold text-white text-lg">{bid.gig?.title}</h3>
                                            <p className="text-slate-400 text-sm mb-2">My Bid: ${bid.amount}</p>
                                            <p className="text-slate-500 text-xs italic">"{bid.message.substring(0, 50)}..."</p>
                                        </div>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${bid.status === 'hired' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' :
                                                bid.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                                                    'bg-yellow-500/20 text-yellow-500'
                                            }`}>
                                            {bid.status.toUpperCase()}
                                        </span>
                                    </motion.div>
                                </Link>
                            )) : (
                                <p className="text-slate-500 col-span-full">You haven't placed any bids yet.</p>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
