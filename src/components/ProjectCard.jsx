const ProjectCard = ({ title, description, image, tags, link }) => {
    return (
        <div className="flex flex-col gap-4 pb-3 group">
            <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-md"
                style={{ backgroundImage: `url("${image}")` }}
                role="img"
                aria-label={title}
            ></div>
            <div>
                <p className="text-[#181411] dark:text-white text-lg font-bold leading-normal">{title}</p>
                <p className="text-[#8a7560] dark:text-gray-400 text-sm font-normal leading-normal mt-1">{description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag, index) => (
                        <span key={index} className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
                <a className="inline-block mt-4 text-primary text-sm font-bold leading-normal group-hover:underline" href={link || "#"}>
                    View Case Study &rarr;
                </a>
            </div>
        </div>
    );
};

export default ProjectCard;
