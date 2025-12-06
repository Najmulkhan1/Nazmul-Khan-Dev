const SkillCard = ({ title, category, icon }) => (
    <div className="flex flex-1 flex-col gap-3 rounded-lg border border-[#e6e0db] dark:border-[#3a2d1f] bg-white dark:bg-[#181411] p-4 transition-all hover:shadow-md">
        <div className="text-primary">
            <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div className="flex flex-col gap-1">
            <h2 className="text-[#181411] dark:text-white text-base font-bold leading-tight">{title}</h2>
            <p className="text-[#8a7560] dark:text-gray-400 text-sm font-normal leading-normal">{category}</p>
        </div>
    </div>
);

const Skills = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-1 w-full py-12 sm:py-24">
            <div className="flex flex-wrap justify-between gap-3 py-10">
                <div className="flex min-w-72 flex-col gap-3">
                    <p className="text-[#181411] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                        My Technical Toolkit
                    </p>
                    <p className="text-[#8a7560] dark:text-gray-400 text-base font-normal leading-normal">
                        A comprehensive overview of my skills in the MERN stack, frontend, backend, databases, and development tools.
                    </p>
                </div>
            </div>

            <section className="py-5">
                <h2 className="text-[#181411] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">MERN Stack</h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 pt-4">
                    <SkillCard title="MongoDB" category="Database" icon="database" />
                    <SkillCard title="Express.js" category="Backend Framework" icon="hub" />
                    <SkillCard title="React" category="Frontend Library" icon="group" />
                    <SkillCard title="Node.js" category="Runtime Environment" icon="data_object" />
                </div>
            </section>

            <section className="py-5">
                <h2 className="text-[#181411] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">Frontend Technologies</h2>
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
                <h2 className="text-[#181411] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">Tools & Platforms</h2>
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
