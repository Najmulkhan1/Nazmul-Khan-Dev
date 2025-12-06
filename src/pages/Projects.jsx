import ProjectCard from '../components/ProjectCard';

const projects = [
    {
        title: "WarmPaws",
        description: "A full-stack e-commerce solution with features like product management, user authentication, and a Stripe-integrated checkout process.",
        image: "https://i.ibb.co/LDv14ZPS/Screenshot-2025-12-06-140834.png",
        tags: ["React", "Node.js", "MongoDB"],
        link: "#"
    },
    {
        title: "The Book Haven",
        description: "A WebSocket-powered chat application allowing users to join rooms and communicate in real-time. Built with Socket.IO and Express.",
        image: "https://i.ibb.co/Xr3qTbj8/Screenshot-2025-12-06-141647.png",
        tags: ["React", "Express", "Socket.IO"],
        link: "#"
    },
    {
        title: "Task Management API",
        description: "A robust RESTful API for a task management system, featuring JWT authentication, data validation, and comprehensive CRUD operations.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzv257ZAOVhQ8B_bK_vZhOoPtkrjTHJigEDUTYLbZQ0XyW9uZW5SokCWkhIxSZu6oYa4pPyxzNQhNSCJPmDsuew0L2t4RcCOCtfZBnqaWZKcs8rSyDaHwvfKHnQ8uyOKZGMEAuRWKuG_k-JsyWRegBdWmG-jIrO2-VsPc6JYenJ6cmfQD0G6e5peFe7c2AkrqBb5MStG6G1BMClOf_-1qhClBF2_q0pmhExPiaKeIkV4sGWZJW82hrbnzO63Ar34UjXhJgvDeyAGBY",
        tags: ["Node.js", "Express", "MongoDB"],
        link: "#"
    }
];

const Projects = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-1 w-full">
            <section className="py-12">
                <h2 className="text-[#181411] dark:text-white text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                    Recent Work
                </h2>
                <hr className="border-[#e6e0db] dark:border-[#3a2d1f] mx-4" />
            </section>
            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Projects;
