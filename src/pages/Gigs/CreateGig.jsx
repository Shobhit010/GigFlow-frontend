import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createGig, resetGigState } from "../../store/slices/gigSlice";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { TextArea } from "../../components/ui/TextArea";
import { Label } from "../../components/ui/Label";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

const CreateGig = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.gigs);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        }
        if (success) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                dispatch(resetGigState());
                navigate("/");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [navigate, userInfo, success, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createGig({ title, description, budget }));
    };

    return (
        <div className="min-h-screen bg-[var(--color-brand-dark)] pt-24 pb-12 px-4 flex justify-center overflow-hidden relative">
            {/* Background blobs */}
            <div className="absolute top-0 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 -right-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full relative z-10"
            >
                <div className="bg-zinc-900/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-zinc-800 shadow-2xl">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Post a New Gig</h2>
                        <p className="text-zinc-400">Describe your project and find the perfect freelancer.</p>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 overflow-hidden"
                            >
                                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
                                    <span className="text-lg">⚠️</span> {error}
                                </div>
                            </motion.div>
                        )}

                        {showSuccess && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm rounded-3xl"
                            >
                                <div className="text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                                    >
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Gig Posted!</h3>
                                    <p className="text-zinc-400">Redirecting to feed...</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <LabelInputContainer>
                            <Label htmlFor="title">Project Title</Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="E.g. Build a React E-commerce Site"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="description">Description</Label>
                            <TextArea
                                id="description"
                                placeholder="Describe the project requirements, deliverables, and timeline in detail..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="budget">Budget ($)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-zinc-500">$</span>
                                <Input
                                    id="budget"
                                    type="number"
                                    className="pl-8"
                                    placeholder="500"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    required
                                />
                            </div>
                        </LabelInputContainer>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full h-12 text-base bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-lg shadow-indigo-500/25"
                                disabled={loading || showSuccess}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Posting...
                                    </div>
                                ) : 'Post Gig Now'}
                            </Button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default CreateGig;
