import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Hero = () => {
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const fullText = "MERN Stack Developer";

    // Snippets for the background "Code Rain"
    const codeSnippets = [
        "export const App = () => {",
        "const [data, setData] = useState([]);",
        "useEffect(() => { fetchAPI(); }, []);",
        "router.post('/api/v1/deploy', (req, res) => {",
        "db.connect(process.env.MONGO_URI);",
        "model.find({ active: true }).then(res => ...)",
        "npm install @framer/motion gsap",
        "git commit -m 'feat: optimized UI'",
        "while(coding) { eat(); sleep(); code(); }",
        "const theme = { primary: '#00ff41' };",
        "axios.get('/api/user/profile')",
        "new Promise((resolve) => setTimeout(resolve))"
    ];

    // Typing Logic
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
                typeSpeed = 2000;
                setIsDeleting(true);
            } else if (isDeleting && updatedText === '') {
                setIsDeleting(false);
                typeSpeed = 500;
            }
            timeout = setTimeout(handleTyping, typeSpeed);
        };
        timeout = setTimeout(handleTyping, 100);
        const cursorInterval = setInterval(() => setShowCursor(prev => !prev), 500);
        return () => { clearTimeout(timeout); clearInterval(cursorInterval); };
    }, [typedText, isDeleting]);

    // GSAP for initial entrance
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".terminal-window", {
                opacity: 0,
                x: -50,
                duration: 1,
                ease: "power3.out"
            });
            gsap.from(".image-frame", {
                opacity: 0,
                x: 50,
                duration: 1,
                delay: 0.3,
                ease: "power3.out"
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-background-dark py-12 md:py-20 font-mono">
            
            {/* --- 1. CODE BACKGROUND LAYER --- */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none select-none overflow-hidden">
                <div className="absolute inset-0 flex flex-wrap gap-12 p-10 text-[10px] text-primary leading-loose">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ 
                                y: [0, 1200], 
                                opacity: [0, 1, 1, 0] 
                            }}
                            transition={{ 
                                duration: Math.random() * 25 + 15, 
                                repeat: Infinity, 
                                ease: "linear",
                                delay: Math.random() * -25
                            }}
                            className="whitespace-nowrap"
                        >
                            {codeSnippets[i % codeSnippets.length]}
                        </motion.div>
                    ))}
                </div>
                {/* Center fade mask */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_var(--color-background-dark)_80%)]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* --- 2. LEFT CONTENT (TERMINAL UI) --- */}
                    <div className="lg:col-span-7 terminal-window bg-background-light/20 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-lg shadow-2xl relative overflow-hidden group">
                        
                        {/* Terminal Header */}
                        <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500/40" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                            <div className="w-3 h-3 rounded-full bg-primary/40" />
                            <span className="ml-4 text-[10px] text-text-muted tracking-widest uppercase">root@developer:~</span>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center text-primary text-lg">
                                <span className="mr-3 opacity-50">&gt;</span>
                                <h2>const profile = "Engineer";</h2>
                            </div>
                            
                            <h1 className="text-4xl md:text-7xl font-bold text-text-primary tracking-tighter leading-tight">
                                {typedText}
                                <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} inline-block w-4 h-10 md:h-16 bg-primary ml-2 align-middle shadow-[0_0_10px_#00ff41]`} />
                            </h1>

                            <div className="border-l-2 border-primary/30 pl-6 py-2">
                                <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-xl">
                                    // I architect and build robust digital ecosystems using the MERN stack. 
                                    Focusing on high-performance backends and interactive, responsive frontends.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Link to="https://drive.google.com/file/d/16bs_iLUUnI0LZaicJYXL3WeE_UjF2EUH/view" 
                                      className="relative group px-8 py-4 bg-primary text-background-dark font-black overflow-hidden transition-all text-center">
                                    <span className="relative z-10">[ DOWNLOAD_RESUME ]</span>
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-20" />
                                </Link>
                                
                                <Link to="/contact" 
                                      className="px-8 py-4 border border-primary text-primary font-bold hover:bg-primary/10 transition-all text-center">
                                    &lt; Hire_Me /&gt;
                                </Link>
                            </div>
                        </div>

                        {/* Language Tags */}
                        <div className="mt-12 flex flex-wrap gap-4 text-[10px] text-primary/40 uppercase">
                            <span>#mongodb</span>
                            <span>#express</span>
                            <span>#react</span>
                            <span>#node</span>
                            <span>#gsap</span>
                        </div>
                    </div>

                    {/* --- 3. RIGHT CONTENT (TECH IMAGE) --- */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <div className="relative group image-frame">
                            
                            {/* Outer Glow & Corners */}
                            <div className="absolute -inset-4 border border-primary/10 rounded-lg pointer-events-none" />
                            <div className="absolute -top-2 -right-2 w-16 h-16 border-t-2 border-r-2 border-primary z-20" />
                            <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-2 border-l-2 border-primary z-20" />
                            
                            {/* Main Image Container */}
                            <div className="relative w-72 h-[420px] md:w-80 md:h-[500px] bg-background-light overflow-hidden border border-white/10 shadow-2xl">
                                
                                {/* Scanner Line */}
                                <motion.div 
                                    className="absolute left-0 right-0 h-[2px] bg-primary z-30 shadow-[0_0_15px_#00ff41]"
                                    animate={{ top: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Subtle Overlay Lines */}
                                <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none" />

                                <img 
                                    ref={imageRef}
                                    src="https://i.ibb.co/8gbhygq0/IMG-0644.jpg" 
                                    alt="Developer Portrait"
                                    className="w-full h-full object-cover grayscale brightness-75 contrast-125 group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-100 transition-all duration-1000 ease-in-out"
                                />

                                {/* Bottom Image Badge */}
                                <div className="absolute bottom-0 left-0 right-0 bg-background-dark/80 backdrop-blur-md p-4 border-t border-primary/30 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex justify-between items-center text-[10px]">
                                        <span className="text-primary tracking-widest">ENCRYPTION: AES-256</span>
                                        <span className="text-white/40">v.2.0.24</span>
                                    </div>
                                </div>
                            </div>

                            {/* Experience Circular Badge */}
                            <motion.div 
                                className="absolute -left-12 top-10 w-24 h-24 hidden md:block z-30"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-full h-full border border-dashed border-primary/40 rounded-full flex items-center justify-center">
                                    <span className="text-[8px] text-primary font-bold text-center leading-tight">
                                        FULLSTACK<br/>ENGINEER<br/>2024
                                    </span>
                                </div>
                            </motion.div>

                            {/* Profile Status Badge */}
                            <div className="absolute -right-10 bottom-20 bg-background-dark border border-primary/40 p-3 hidden md:block z-30">
                                <div className="flex flex-col gap-1 font-mono text-[9px]">
                                    <span className="text-primary flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                        LIVE_SESSION
                                    </span>
                                    <span className="text-text-muted">LOC: DHAKA_BD</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;