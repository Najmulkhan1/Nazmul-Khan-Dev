import { Outlet, NavLink } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden font-display bg-background-dark text-text-primary transition-colors duration-300">
            {/* Navbar */}
            <header className="flex items-center justify-center sticky top-0 z-50 bg-background-light/95 backdrop-blur-sm border-b border-primary/20">
                <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-10 py-3 w-full max-w-7xl">
                    <NavLink to="/" className="flex items-center gap-4 group">
                        <div className="text-primary group-hover:scale-110 transition-transform font-bold text-xl">
                            &gt;_
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-primary">~/nazmul-khan-dev</h2>
                    </NavLink>
                    <div className="hidden sm:flex flex-1 justify-end gap-8">
                        <div className="flex items-center gap-9">
                            <NavLink to="/" className={({ isActive }) => `text-sm font-medium leading-normal transition-colors hover:text-primary ${isActive ? 'text-primary font-bold decoration-2 underline underline-offset-4' : 'text-text-muted'}`}>./Home</NavLink>
                            <NavLink to="/projects" className={({ isActive }) => `text-sm font-medium leading-normal transition-colors hover:text-primary ${isActive ? 'text-primary font-bold decoration-2 underline underline-offset-4' : 'text-text-muted'}`}>./Projects</NavLink>
                            <NavLink to="/skills" className={({ isActive }) => `text-sm font-medium leading-normal transition-colors hover:text-primary ${isActive ? 'text-primary font-bold decoration-2 underline underline-offset-4' : 'text-text-muted'}`}>./Skills</NavLink>
                            <NavLink to="/about" className={({ isActive }) => `text-sm font-medium leading-normal transition-colors hover:text-primary ${isActive ? 'text-primary font-bold decoration-2 underline underline-offset-4' : 'text-text-muted'}`}>./About</NavLink>
                            <NavLink to="/contact" className={({ isActive }) => `text-sm font-medium leading-normal transition-colors hover:text-primary ${isActive ? 'text-primary font-bold decoration-2 underline underline-offset-4' : 'text-text-muted'}`}>./Contact</NavLink>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto dark:text-white">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="w-full flex justify-center py-8 border-t border-primary/20 mt-auto bg-background-light">
                <div className="px-4 text-center">
                    <p className="text-text-muted text-sm">&copy; {new Date().getFullYear()} Nazmul Khan Dev. <span className="text-primary">All rights reserved.</span></p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
