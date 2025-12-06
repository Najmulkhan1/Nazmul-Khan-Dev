const About = () => {
    return (
        // Retaining original flex/padding structure, no explicit background change
        <section className="py-20 flex-1 flex flex-col justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">

                {/* Header & Title - Clean and Prominent */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-[#181411] dark:text-white leading-tight tracking-tight">
                        About Me
                    </h2>
                    {/* Retained original separator, slightly refined */}
                    <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-2 rounded-full"></div>
                </div>

                {/* Two-Column Layout for excellent readability and visual balance */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left Column: Key Focus and Stack */}
                    <div className="p-8 border-2 border-primary rounded-xl shadow-xl shadow-primary/20 dark:shadow-primary/40 bg-white dark:bg-[#181818]">
                        <h3 className="text-2xl font-bold mb-4 text-[#181411] dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
                            The Full-Stack Specialist
                        </h3>
                        <p className="text-xl font-medium text-[#8a7560] dark:text-gray-300">
                            My expertise is dedicated to architecting and developing end-to-end digital solutions, translating complex ideas into intuitive and performant web applications.
                        </p>

                        {/* Core Stack Badges - Using Primary Color */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            {['MERN Stack', 'React & Node.js', 'Clean Code', 'Scalable APIs'].map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-1.5 text-sm font-semibold rounded-full bg-primary text-white"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Detailed Narrative (Original Content Refined) */}
                    <div className="space-y-6 text-lg">
                        <p className="text-[#8a7560] dark:text-gray-400 leading-relaxed">
                            I'm a <strong>full-stack developer</strong> specializing in the powerful <strong>MERN</strong> (MongoDB, Express.js, React, Node.js) stack. My work spans from crafting pixel-perfect, responsive user interfaces to designing and managing scalable APIs and databases.
                        </p>

                        {/* Highlighted Principle - Using border and light background for emphasis */}
                        <div className="border-l-4 border-primary pl-4 py-1 bg-gray-50/50 dark:bg-gray-800/50 rounded-md">
                            <p className="text-[#181411] dark:text-gray-300 italic">
                                My philosophy is to write <strong>clean, maintainable, and efficient code</strong> to solve complex problems and deliver high-quality digital products.
                            </p>
                        </div>

                        <p className="text-[#8a7560] dark:text-gray-400 leading-relaxed">
                            With a strong background in building dynamic web applications, I focus on creating seamless user experiences powered by robust back-end logic. I thrive on continuous learning and ensuring technical excellence.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;