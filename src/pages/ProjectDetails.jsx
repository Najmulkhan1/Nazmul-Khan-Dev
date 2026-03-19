import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useEffect } from 'react';

const ProjectDetails = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <h2 className="text-3xl font-bold text-primary font-mono mb-4">404: Project Not Found</h2>
                <Link to="/projects" className="text-text-primary hover:text-primary underline font-mono">
                    &lt; Return to Projects /&gt;
                </Link>
            </div>
        );
    }

    return (
        <section className="py-20 flex-1 w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <div className="mb-8">
                    <Link to="/projects" className="text-text-muted hover:text-primary transition-colors font-mono flex items-center gap-2">
                        <span>&larr;</span> Back to Projects
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Visual Section */}
                    <div className="space-y-6">
                        <div className="border-2 border-primary/20 p-2 bg-background-light shadow-[4px_4px_0px_0px_rgba(0,255,65,0.2)]">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>

                        {/* Links Block */}
                        <div className="flex gap-4">
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-primary text-background py-3 text-center font-bold font-mono hover:bg-secondary transition-colors"
                            >
                                [ LIVE DEMO ]
                            </a>
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 border border-primary text-primary py-3 text-center font-bold font-mono hover:bg-primary/10 transition-colors"
                            >
                                [ VIEW CODE ]
                            </a>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-extrabold text-text-primary mb-2 font-mono">
                                {project.title}
                            </h1>
                            <p className="text-text-muted text-lg leading-relaxed border-l-4 border-primary pl-4 py-2 bg-background-light/50">
                                {project.description}
                            </p>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h3 className="text-xl font-bold text-primary font-mono mb-3">&lt; Tech Stack /&gt;</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 bg-background-light border border-primary/30 text-text-primary font-mono text-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Challenges */}
                        <div>
                            <h3 className="text-xl font-bold text-primary font-mono mb-3">&lt; Challenges Faced /&gt;</h3>
                            <ul className="list-disc list-inside space-y-2 text-text-muted font-mono text-sm">
                                {project.challenges.map((challenge, i) => (
                                    <li key={i} className="leading-relaxed">
                                        {challenge}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Future Improvements */}
                        <div>
                            <h3 className="text-xl font-bold text-primary font-mono mb-3">&lt; Future Plans /&gt;</h3>
                            <ul className="list-disc list-inside space-y-2 text-text-muted font-mono text-sm">
                                {project.improvements.map((improvement, i) => (
                                    <li key={i} className="leading-relaxed">
                                        {improvement}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectDetails;
