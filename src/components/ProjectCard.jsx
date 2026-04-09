// Dependencies
import Link from 'next/link';
import { getYoutubeEmbedUrl, getDriveEmbedUrl } from '@/lib/utils';
import ImageSlider from '@/components/ImageSlider';

const ProjectCard = ({ id, title, description, images = [], videos = [], tags = [], liveLink }) => {
    const mediaList = [
        ...videos.map(v => {
            const ytUrl = getYoutubeEmbedUrl(v);
            const driveUrl = getDriveEmbedUrl(v);
            return { type: 'video', url: ytUrl || driveUrl || v };
        }),
        ...images.map(img => ({ type: 'image', url: img }))
    ];

    if (mediaList.length === 0) {
        mediaList.push({ type: 'image', url: 'https://placehold.co/600x400/0d0d0d/00ff41?text=No+Image' });
    }

    return (
        <div className="flex flex-col gap-4 pb-3 group border border-primary/20 bg-background-light p-4 hover:border-primary transition-colors">
            <ImageSlider media={mediaList} title={title} />
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
                    <Link href={`/projects/${id}`} className="inline-block text-primary text-sm font-bold leading-normal group-hover:underline font-mono">
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
