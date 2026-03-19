import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

const Projects = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-1 w-full">
            <section className="py-12">
                <h2 className="text-text-primary text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 border-b border-primary/20">
                    <span className="text-primary mr-2">&gt;</span>Recent Work
                </h2>
            </section>
            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} {...project} tags={project.technologies.slice(0, 3)} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Projects;
