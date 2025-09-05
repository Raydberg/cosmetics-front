import { Link } from "react-router"
import { ModeToggle } from "./mode-toggle"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { useTheme } from 'next-themes';


interface NavItem {
    name: string;
    href: string;
}

const navItems: NavItem[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Products', href: '/products' },
    // { name: 'Contacto', href: '/contact' },
];

export const CustomHeader = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerVariants = {
        initial: { y: -100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        scrolled: {
            backdropFilter: 'blur(20px)',
            backgroundColor:
                theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
    };

    const mobileMenuVariants = {
        closed: { opacity: 0, height: 0 },
        open: { opacity: 1, height: 'auto' },
    };



    return (

        <motion.header
            className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
            variants={headerVariants}
            initial="initial"
            animate={isScrolled ? 'scrolled' : 'animate'}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
                backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                backgroundColor: isScrolled
                    ? theme === 'dark'
                        ? 'rgba(0, 0, 0, 0.8)'
                        : 'rgba(255, 255, 255, 0.8)'
                    : 'transparent',
                boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : 'none',
            }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between lg:h-20">
                    <motion.div
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                        <Link to="/" className="flex items-center space-x-2" viewTransition>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-rose-700">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <span className="bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-xl font-bold text-transparent">
                                BeautyShop Catálogos
                            </span>
                        </Link>
                    </motion.div>

                    <nav className="hidden items-center space-x-8 lg:flex">
                        {navItems.map((item) => (
                            <div
                                key={item.name}
                                className="relative"
                            >
                                <Link
                                    to={item.href}
                                    className="text-foreground flex items-center space-x-1 font-medium transition-colors duration-200 hover:text-rose-500"
                                    viewTransition
                                >
                                    <span>{item.name}</span>
                                </Link>

                            </div>
                        ))}
                    </nav>

                    <div className="hidden items-center space-x-4 lg:flex">
                        <ModeToggle/>
                        
                    </div>

                    <motion.button
                        className="hover:bg-muted rounded-lg p-2 transition-colors duration-200 lg:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </motion.button>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="overflow-hidden lg:hidden"
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <div className="border-border bg-background/95 mt-4 space-y-2 rounded-xl border py-4 shadow-xl backdrop-blur-lg">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="text-foreground hover:bg-muted block px-4 py-3 font-medium transition-colors duration-200"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="space-y-2 px-4 py-2">
                                    <ModeToggle/>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    )
}
