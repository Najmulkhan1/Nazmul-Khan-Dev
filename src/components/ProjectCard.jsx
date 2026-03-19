import { Link } from 'react-router-dom';

const ProjectCard = ({ id, title, description, image, tags, liveLink }) => {
    return (
        <div className="flex flex-col gap-4 pb-3 group border border-primary/20 bg-background-light p-4 hover:border-primary transition-colors">
            <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-300 shadow-md border-b border-primary/20"
                style={{ backgroundImage: `url("${image}")` }}
                role="img"
                aria-label={title}
            ></div>
            <div>
                <p className="text-text-primary text-lg font-bold leading-normal font-mono mb-2">{title}</p>
                <p className="text-text-muted text-sm font-normal leading-normal mt-1 border-l-2 border-primary/50 pl-3 line-clamp-3">{description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map((tag, index) => (
                        <span key={index} className="text-xs font-medium bg-secondary text-primary px-2 py-1 border border-primary/30">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex gap-4 mt-4">
                    <Link to={`/projects/${id}`} className="inline-block text-primary text-sm font-bold leading-normal group-hover:underline font-mono">
                        [ View Details ]
                    </Link>
                    {liveLink && (
                        <a className="inline-block text-primary text-sm font-bold leading-normal group-hover:underline font-mono" href={liveLink || "#"} target="_blank" rel="noopener noreferrer">
                            [ Live Demo ]
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
