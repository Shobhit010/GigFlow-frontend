import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/slices/authSlice";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { BackgroundGradient } from "../../components/ui/BackgroundGradient";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            setMessage(null);
            dispatch(register({ name, email, password }));
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-[var(--color-brand-dark)] w-full py-12 px-4 sm:px-6 lg:px-8'>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className='max-w-md w-full'
            >
                <BackgroundGradient className='rounded-[22px] w-full p-4 sm:p-10 bg-zinc-900 dark:bg-zinc-900 border border-zinc-800'>
                    <div className='text-center mb-8'>
                        <h2 className='text-3xl font-extrabold text-white sm:text-4xl text-gradient'>
                            Join GigFlow
                        </h2>
                        <p className='mt-2 text-sm text-zinc-400'>
                            Start your journey today
                        </p>
                    </div>

                    <form className='space-y-6' onSubmit={submitHandler}>
                        <LabelInputContainer>
                            <Label htmlFor='name'>Full Name</Label>
                            <Input
                                id='name'
                                type='text'
                                placeholder="Tyler Durden"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor='email'>Email Address</Label>
                            <Input
                                id='email'
                                type='email'
                                placeholder="tyler@fc.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor='password'>Password</Label>
                            <Input
                                id='password'
                                type='password'
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor='confirmPassword'>Confirm Password</Label>
                            <Input
                                id='confirmPassword'
                                type='password'
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </LabelInputContainer>

                        {(message || error) && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center'
                            >
                                {message || error}
                            </motion.div>
                        )}

                        <Button
                            type='submit'
                            className='w-full bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30'
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Creating account...
                                </div>
                            ) : 'Create Account'}
                        </Button>

                        <div className='text-center mt-4'>
                            <p className='text-sm text-zinc-400'>
                                Already have an account?{' '}
                                <Link to='/login' className='font-medium text-indigo-400 hover:text-indigo-300 transition-colors'>
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </BackgroundGradient>
            </motion.div>
        </div>
    );
};

export default Signup;
