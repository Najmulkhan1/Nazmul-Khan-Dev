const SkillCard = ({ title, category, icon }) => (
    <div className="flex flex-1 flex-col gap-3 border border-primary/20 bg-background-light p-4 hover:border-primary transition-all hover:bg-background-light/80 group">
        <div className="text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div className="flex flex-col gap-1">
            <h2 className="text-text-primary text-base font-bold leading-tight font-mono">{title}</h2>
            <p className="text-text-muted text-sm font-normal leading-normal font-mono">// {category}</p>
        </div>
    </div>
);

const Skills = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-1 w-full py-12 sm:py-24">
            <div className="flex flex-wrap justify-between gap-3 py-10">
                <div className="flex min-w-72 flex-col gap-3">
                    <p className="text-text-primary text-4xl font-black leading-tight tracking-[-0.033em]">
                        <span className="text-primary mr-3">&gt;</span>My Technical Toolkit
                    </p>
                    <p className="text-text-muted text-base font-normal leading-normal font-mono border-l-2 border-primary/50 pl-4">
                        /* A comprehensive overview of my skills in the MERN stack, <br />
                        frontend, backend, databases, and development tools. */
                    </p>
                </div>
            </div>

            <section className="py-5">
                <h2 className="text-text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 border-b border-primary/20">
                    <span className="text-primary mr-2">#</span>MERN Stack
                </h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 pt-4">
                    <SkillCard title="MongoDB" category="Database" icon="database" />
                    <SkillCard title="Express.js" category="Backend Framework" icon="hub" />
                    <SkillCard title="React" category="Frontend Library" icon="group" />
                    <SkillCard title="Node.js" category="Runtime Environment" icon="data_object" />
                </div>
            </section>

            <section className="py-5">
                <h2 className="text-text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 border-b border-primary/20">
                    <span className="text-primary mr-2">#</span>Frontend Technologies
                </h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 pt-4">
                    <SkillCard title="HTML5" category="Markup Language" icon="code" />
                    <SkillCard title="CSS3 & Tailwind" category="Styling" icon="css" />
                    <SkillCard title="JavaScript (ES6+)" category="Programming Language" icon="javascript" />
                    <SkillCard title="TypeScript" category="Typed JavaScript" icon="integration_instructions" />
                    <SkillCard title="Redux" category="State Management" icon="memory" />
                    <SkillCard title="Next.js" category="React Framework" icon="arrow_forward" />
                </div>
            </section>

            <section className="py-5">
                <h2 className="text-text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 border-b border-primary/20">
                    <span className="text-primary mr-2">#</span>Tools & Platforms
                </h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 pt-4">
                    <SkillCard title="Git & GitHub" category="Version Control" icon="terminal" />
                    <SkillCard title="REST APIs" category="API Architecture" icon="deployed_code" />
                    <SkillCard title="GraphQL" category="Query Language" icon="query_stats" />
                    <SkillCard title="Vercel" category="Deployment Platform" icon="cloud_upload" />
                </div>
            </section>
        </div>
    );
};

export default Skills;
