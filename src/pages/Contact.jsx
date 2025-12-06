const Contact = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col w-full py-16 sm:py-24">
            <div className="flex flex-wrap justify-center text-center gap-3 p-4">
                <div className="flex w-full flex-col gap-4 items-center">
                    <p className="text-[#181411] dark:text-white text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">Get in Touch</p>
                    <p className="text-[#8a7560] dark:text-[#a18a72] text-base sm:text-lg font-normal leading-normal max-w-xl">
                        Feel free to reach out for collaborations or just a friendly hello. I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision.
                    </p>
                </div>
            </div>

            <div className="w-full mx-auto mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <div className="flex flex-col gap-8 p-4 sm:p-0">
                    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <label className="flex flex-col w-full">
                                <p className="text-[#181411] dark:text-white text-base font-medium leading-normal pb-2">Name</p>
                                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#181411] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e6e0db] dark:border-[#3a2d1f] bg-white dark:bg-[#181411] h-14 placeholder:text-[#8a7560] dark:placeholder:text-[#a18a72] p-[15px] text-base font-normal leading-normal transition-shadow" placeholder="Enter your name" type="text" />
                            </label>
                            <label className="flex flex-col w-full">
                                <p className="text-[#181411] dark:text-white text-base font-medium leading-normal pb-2">Email Address</p>
                                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#181411] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e6e0db] dark:border-[#3a2d1f] bg-white dark:bg-[#181411] h-14 placeholder:text-[#8a7560] dark:placeholder:text-[#a18a72] p-[15px] text-base font-normal leading-normal transition-shadow" placeholder="Enter your email" type="email" />
                            </label>
                        </div>
                        <label className="flex flex-col w-full">
                            <p className="text-[#181411] dark:text-white text-base font-medium leading-normal pb-2">Message</p>
                            <textarea className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-[#181411] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e6e0db] dark:border-[#3a2d1f] bg-white dark:bg-[#181411] min-h-36 placeholder:text-[#8a7560] dark:placeholder:text-[#a18a72] p-[15px] text-base font-normal leading-normal transition-shadow" placeholder="Your message here..."></textarea>
                        </label>
                        <button className="flex min-w-[84px] max-w-[480px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary text-[#181411] text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-opacity">
                            <span className="truncate">Send Message</span>
                        </button>
                    </form>
                </div>

                <div className="flex flex-col p-6 sm:p-8 rounded-xl border border-solid border-[#e6e0db] dark:border-[#3a2d1f] bg-background-light dark:bg-[#221910]">
                    <h3 className="text-[#181411] dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em] mb-6">Contact Details</h3>
                    <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 size-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <span className="material-symbols-outlined">mail</span>
                            </div>
                            <div>
                                <p className="text-[#181411] dark:text-white text-base font-bold">Email</p>
                                <a className="text-[#8a7560] dark:text-[#a18a72] text-base font-medium hover:text-primary dark:hover:text-primary transition-colors" href="mailto:najmulislam624@gmail.com">najmulislam624@gmail.com</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 size-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-[#181411] dark:text-white text-base font-bold">LinkedIn</p>
                                <a className="text-[#8a7560] dark:text-[#a18a72] text-base font-medium hover:text-primary dark:hover:text-primary transition-colors" href="https://www.linkedin.com/in/nazmul-khan-mukit/" rel="noopener noreferrer" target="_blank">linkedin.com/in/nazmul-khan-mukit/</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 size-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-[#181411] dark:text-white text-base font-bold">GitHub</p>
                                <a className="text-[#8a7560] dark:text-[#a18a72] text-base font-medium hover:text-primary dark:hover:text-primary transition-colors" href="https://github.com/Najmulkhan1" rel="noopener noreferrer" target="_blank">github.com/Najmulkhan1</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
