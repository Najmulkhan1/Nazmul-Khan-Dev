import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Hero = () => {
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const statsRef = useRef([]);
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const [loopNum, setLoopNum] = useState(0);

    const fullText = "I'm MERN Developer, Full Stack Engineer";

    useEffect(() => {
        let timeout;
        
        const handleTyping = () => {
            const currentText = fullText;
            const updatedText = isDeleting 
                ? currentText.substring(0, typedText.length - 1)
                : currentText.substring(0, typedText.length + 1);

            setTypedText(updatedText);

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && updatedText === currentText) {
                typeSpeed = 2000; // Pause at end
                setIsDeleting(true);
            } else if (isDeleting && updatedText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                typeSpeed = 500; // Pause before retyping
            }

            timeout = setTimeout(handleTyping, typeSpeed);
        };

        timeout = setTimeout(handleTyping, 100);

        // Cursor blinking
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => {
            clearTimeout(timeout);
            clearInterval(cursorInterval);
        };
    }, [typedText, isDeleting, loopNum]);

    useEffect(() => {
        // GSAP animations
        const ctx = gsap.context(() => {
            // Animate title container
            gsap.from(titleRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out'
            });

            // Animate image with rotation
            gsap.from(imageRef.current, {
                opacity: 0,
                scale: 0.8,
                rotation: -10,
                duration: 1.2,
                ease: 'back.out(1.7)',
                delay: 0.3
            });

            // Animate stats cards with stagger
            gsap.from(statsRef.current, {
                opacity: 0,
                scale: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: 'back.out(1.7)',
                delay: 0.8
            });
        });

        return () => ctx.revert();
    }, []);

    // Framer Motion variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.3, ease: 'easeInOut' }
        },
        tap: { scale: 0.95 }
    };

    return (
        <section className="relative overflow-hidden py-12 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="relative text-center lg:text-left order-2 lg:order-1"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div ref={titleRef}>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#181411] dark:text-white">
                                <span className="text-primary">
                                    {typedText}
                                    <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
                                </span>
                            </h1>
                        </div>
                        <motion.p
                            variants={itemVariants}
                            className="mt-6 text-lg text-[#8a7560] dark:text-gray-400 max-w-lg mx-auto lg:mx-0"
                        >
                            Building scalable, robust, and user-centric web applications with the MERN stack.
                        </motion.p>
                        <motion.div
                            variants={itemVariants}
                            className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <motion.div
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="w-full sm:w-auto"
                            >
                                <Link to="https://drive.google.com/file/d/16bs_iLUUnI0LZaicJYXL3WeE_UjF2EUH/view?usp=drive_link" className="bg-primary text-white px-8 py-4 rounded-full flex items-center justify-center text-lg font-medium hover:opacity-90 transition-all shadow-lg hover:shadow-xl w-full">
                                    Download Resume <span className="material-symbols-outlined ml-2">arrow_forward</span>
                                </Link>
                            </motion.div>
                            <motion.div
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="w-full sm:w-auto"
                            >
                                <Link to="/contact" className="bg-transparent text-[#181411] dark:text-white px-8 py-4 rounded-full flex items-center justify-center text-lg font-medium border border-[#e6e0db] dark:border-[#3a2d1f] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full">
                                    Hire Me
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    <div className="relative flex justify-center lg:justify-start order-1 lg:order-2">
                        <div className="relative w-[300px] h-[350px] sm:w-[450px] sm:h-[500px]">
                            <motion.div
                                className="absolute inset-0 bg-primary/20 rounded-3xl -rotate-6 backdrop-blur-sm"
                                initial={{ opacity: 0, rotate: -20 }}
                                animate={{ 
                                    opacity: 1, 
                                    rotate: [-6, -8, -4, -6],
                                    y: [0, -10, 0]
                                }}
                                transition={{ 
                                    opacity: { duration: 1, ease: 'easeOut' },
                                    rotate: { 
                                        duration: 6, 
                                        repeat: Infinity, 
                                        ease: 'easeInOut' 
                                    },
                                    y: { 
                                        duration: 4, 
                                        repeat: Infinity, 
                                        ease: 'easeInOut' 
                                    }
                                }}
                            />
                            <motion.img
                                ref={imageRef}
                                alt="Portrait of Developer"
                                className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl"
                                src="https://i.ibb.co/C5Csvgv8/Gemini-Generated-Image-mvnwkwmvnwkwmvnw.png"
                                animate={{ 
                                    y: [0, -15, 0]
                                }}
                                transition={{ 
                                    duration: 5, 
                                    repeat: Infinity, 
                                    ease: 'easeInOut' 
                                }}
                                whileHover={{ scale: 1.02 }}
                            />
                           
                            <motion.div
                                ref={(el) => (statsRef.current[1] = el)}
                                className="absolute top-1/2 -right-12 -translate-y-1/2 bg-white dark:bg-[#221910] p-4 rounded-lg shadow-lg w-48 border border-[#e6e0db] dark:border-[#3a2d1f] hidden sm:block"
                                animate={{ 
                                    x: [0, -8, 0],
                                    y: [0, 8, 0]
                                }}
                                transition={{ 
                                    duration: 4, 
                                    repeat: Infinity, 
                                    ease: 'easeInOut',
                                    delay: 0.5
                                }}
                                whileHover={{ x: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                            >
                                <p className="font-bold text-[#181411] dark:text-white text-sm">"Exceptional code quality and delivery speed."</p>
                            </motion.div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
