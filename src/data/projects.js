export const projects = [
    {
        id: "warmpaws",
        title: "WarmPaws",
        image: "https://i.ibb.co/LDv14ZPS/Screenshot-2025-12-06-140834.png", // Keeping original image
        description: "A comprehensive e-commerce platform dedicated to pet products. WarmPaws provides a seamless shopping experience with features like product filtering, secure checkout, and user order history.",
        technologies: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Stripe API", "Tailwind CSS"],
        liveLink: "https://strong-creponne-968836.netlify.app/",
        githubLink: "https://github.com/Najmulkhan1/Warmpaws-pet-care-in-winter",
        challenges: [
            "Integrating Stripe for secure and handle varying payment states.",
            "Managing complex state for the shopping cart and user authentication across components.",
            "Optimizing image loading for a media-rich product catalog."
        ],
        improvements: [
            "Implement AI-based product recommendations.",
            "Add a user review and rating system.",
            "Develop a mobile application using React Native."
        ]
    },
    {
        id: "book-haven",
        title: "The Book Haven",
        image: "https://i.ibb.co/Xr3qTbj8/Screenshot-2025-12-06-141647.png", // Keeping original image
        description: "A real-time chat application designed for book lovers to discuss their favorite reads. Users can join varied interest rooms, share messages instantly.",
        technologies: ["React", "Express", "Socket.IO", "Node.js", "Tailwind CSS"],
        liveLink: "https://roaring-ganache-3c8c0f.netlify.app/",
        githubLink: "https://github.com/Najmulkhan1/B12-A10-the-book-haven-client",
        challenges: [
            "Ensuring real-time message delivery with low latency using Socket.IO.",
            "Handling user disconnections and reconnections gracefully.",
            "Designing a responsive chat interface that works well on mobile devices."
        ],
        improvements: [
            "Add private 1-on-1 messaging functionality.",
            "Implement message persistence using a database.",
            "Add typing indicators and read receipts."
        ]
    },
    {
        id: "ticket-bari",
        title: "Ticket Bari",
        image: "https://i.ibb.co.com/dsQZTwrj/Screenshot-2026-01-06-194238.png", // Keeping original image
        description: "Ticket Bari is a modern, full-stack digital ticketing platform designed to revolutionize how people travel across Bangladesh. Built with the powerful MERN stack (MongoDB, Express.js, React, and Node.js), our platform offers a seamless, secure, and lightning-fast booking experience.",
        technologies: ["React", "Node.js", "MongoDB", "Express", "JWT Auth", "React Beautiful DND"],
        liveLink: "https://ticket-bari-frontend.vercel.app/",
        githubLink: "https://github.com/Najmulkhan1/ticket-bari-frontend",
        challenges: [
            "Implementing secure drag-and-drop functionality that persists limits state.",
            "Building a robust authentication system using JWT.",
            "Designing an intuitive dashboard for task overview."
        ],
        improvements: [
            "Add team collaboration features.",
            "Integrate third-party calendar syncing.",
            "Add dark/light mode toggle."
        ]
    }
];
