import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Navbar = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logoutUser());
    };

    return (
        <nav className={cn(
            "fixed w-full top-0 z-50 backdrop-blur-md transition-all duration-300",
            "bg-zinc-950/80 border-b border-white/5"
        )}>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex items-center'>
                        <Link to='/' className='flex-shrink-0 group'>
                            <span className='text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity'>
                                GigFlow
                            </span>
                        </Link>
                        <div className='hidden md:block'>
                            <div className='ml-10 flex items-center space-x-1'>
                                <NavLink to='/'>Find Gigs</NavLink>
                                {userInfo && (
                                    <>
                                        <NavLink to='/create-gig'>Post a Gig</NavLink>
                                        <NavLink to='/my-dashboard'>Dashboard</NavLink>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='hidden md:block'>
                        <div className='ml-4 flex items-center md:ml-6 space-x-4'>
                            {userInfo ? (
                                <div className="flex items-center gap-4">
                                    <span className='text-zinc-400 text-sm'>
                                        Welcome, <span className="text-white font-medium">{userInfo.name}</span>
                                    </span>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        onClick={logoutHandler}
                                        className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800"
                                    >
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link to='/login'>
                                        <Button variant='ghost' size='sm' className="text-zinc-400 hover:text-white">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link to='/register'>
                                        <Button size='sm' className="bg-white text-black hover:bg-zinc-200">
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ to, children }) => (
    <Link
        to={to}
        className='text-zinc-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/5'
    >
        {children}
    </Link>
);

export default Navbar;
