const About = () => {
    return (
        // Retaining original flex/padding structure, no explicit background change
        <section className="py-20 flex-1 flex flex-col justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">

                {/* Header & Title - Clean and Prominent */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-text-primary leading-tight tracking-tight">
                        <span className="text-primary">&lt;</span> About Me <span className="text-primary">/&gt;</span>
                    </h2>
                    {/* Retained original separator, slightly refined */}
                    <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-2"></div>
                </div>

                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Profile Card (4 cols) */}
                    <div className="lg:col-span-4 p-8 border border-primary/30 bg-background-light shadow-[4px_4px_0px_0px_rgba(0,255,65,0.2)]">
                        <div className="text-center mb-6">
                            <div className="w-32 h-32 mx-auto bg-background border-2 border-primary rounded-full flex items-center justify-center mb-4 text-4xl">
                                <img className="w-full h-full object-cover rounded-full" src="https://i.ibb.co/8gbhygq0/IMG-0644.jpg" alt="" />
                            </div>
                            <h3 className="text-2xl font-bold text-text-primary font-mono">Nazmul Khan</h3>
                            <p className="text-primary font-mono text-sm mt-1">Full Stack Developer</p>
                        </div>

                        <div className="space-y-4 font-mono text-sm">
                            <div>
                                <p className="text-text-muted mb-1">// Location</p>
                                <p className="text-text-primary">Dhaka, Bangladesh</p>
                            </div>
                            <div>
                                <p className="text-text-muted mb-1">// Experience</p>
                                <p className="text-text-primary">3+ Years</p>
                            </div>
                            <div>
                                <p className="text-text-muted mb-1">// Interests</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {['Coding', 'Problem Solving', 'Tech Blogging', 'Gaming'].map((interest, i) => (
                                        <span key={i} className="text-xs border border-primary/40 px-2 py-1 text-primary rounded-sm">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Detailed Narrative (8 cols) */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* 1. Introduction & Personality */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-primary text-xl">01.</span>
                                <h3 className="text-2xl font-bold text-text-primary font-mono">Who Am I?</h3>
                            </div>
                            <p className="text-text-muted leading-relaxed font-mono text-sm border-l-2 border-primary/30 pl-4">
                                <span className="text-primary">const</span> <span className="text-secondary">personality</span> = <span className="text-text-primary">['Curious', 'Persistent', 'Detail-oriented'];</span>
                                <br /><br />
                                I am a passionate developer who thrives on turning complex problems into elegant concepts. I don't just write code; I build solutions. My personality is rooted in a deep curiosity for how things work, driven by a persistence to find the best possible implementation. I believe in continuous optimization—not just in code, but in life.
                            </p>
                        </div>

                        {/* 2. Programming Journey */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-primary text-xl">02.</span>
                                <h3 className="text-2xl font-bold text-text-primary font-mono">The Journey</h3>
                            </div>
                            <div className="bg-background-light p-6 border border-primary/10 rounded-sm">
                                <p className="text-text-muted leading-relaxed font-mono text-sm">
                                    It started with a simple <span className="text-primary">"Hello World"</span>. My fascination with technology began when I first inspected a webpage's source code. That curiosity led me down the rabbit hole of HTML & CSS, eventually evolving into full-stack architecture.
                                    <br /><br />
                                    From struggling with basic loops to architecting scalable MERN applications, every error message was a lesson, and every successful deployment was a milestone. Today, I navigate the entire stack with confidence, constantly keeping up with the ever-evolving JavaScript ecosystem.
                                </p>
                            </div>
                        </div>

                        {/* 3. The Work I Enjoy */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-primary text-xl">03.</span>
                                <h3 className="text-2xl font-bold text-text-primary font-mono">What I Do Best</h3>
                            </div>
                            <p className="text-text-muted leading-relaxed font-mono text-sm">
                                // I specialize in building robust, scalable web applications.
                                <br />
                                I enjoy working on the <span className="text-primary">Backend</span>—designing database schemas, optimizing API response times, and ensuring security. However, I also love the instant gratification of crafting beautiful, responsive <span className="text-primary">Front-end</span> interfaces using React and Tailwind.
                                <br /><br />
                                The type of work that excites me most involves <span className="text-secondary">logic-heavy challenges</span>, real-time data processing, and creating systems that help businesses grow.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;