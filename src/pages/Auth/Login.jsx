import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { BackgroundGradient } from "../../components/ui/BackgroundGradient";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                navigate("/");
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-brand-dark)] w-full py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-20 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-md w-full relative z-10"
            >
                <BackgroundGradient className="rounded-[22px] w-full p-4 sm:p-10 bg-zinc-900 dark:bg-zinc-900 border border-zinc-800">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl text-gradient">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm text-zinc-400">
                            Sign in to manage your gigs
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={submitHandler}>
                        <LabelInputContainer>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="projectmayhem@fc.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </LabelInputContainer>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center"
                                >
                                    {error}
                                </motion.div>
                            )}
                            {showSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center font-medium"
                                >
                                    Login successful! Redirecting...
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30"
                            disabled={loading || showSuccess}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </Button>

                        <div className="text-center mt-4">
                            <p className="text-sm text-zinc-400">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </BackgroundGradient>
            </motion.div>
        </div>
    );
};

export default Login;
