'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    return (
        <header className="flex items-center justify-center sticky top-0 z-50 bg-background-light/95 backdrop-blur-sm border-b border-primary/20">
            <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-10 py-3 w-full max-w-7xl">
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="text-primary group-hover:scale-110 transition-transform font-bold text-xl">
                        &gt;_
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-primary">~/nazmul-khan-dev</h2>
                </Link>
                <div className="hidden sm:flex flex-1 justify-end gap-8">
                    <div className="flex items-center gap-9">
                        <Link href="/" className={`text-sm font-medium leading-normal transition-colors hover:text-primary ${pathname === '/' ? 'text-primary font-bold decoration-2 underline underline-offset-4' : 'text-text-muted'}`}>./Home</Link>
                        <Link href="/projects" className={`text-sm font-medium leading-normal transition-colors hover:text-primary ${pathname.startsWith('/projects') ? 'text-primary font-bold decoration-2 underline underline-offset-4' : 'text-text-muted'}`}>./Projects</Link>
                        <Link href="/skills" className={`text-sm font-medium leading-normal transition-colors hover:text-primary ${pathname === '/skills' ? 'text-primary font-bold decoration-2 underline underline-offset-4' : 'text-text-muted'}`}>./Skills</Link>
                        <Link href="/about" className={`text-sm font-medium leading-normal transition-colors hover:text-primary ${pathname === '/about' ? 'text-primary font-bold decoration-2 underline underline-offset-4' : 'text-text-muted'}`}>./About</Link>
                        <Link href="/contact" className={`text-sm font-medium leading-normal transition-colors hover:text-primary ${pathname === '/contact' ? 'text-primary font-bold decoration-2 underline underline-offset-4' : 'text-text-muted'}`}>./Contact</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
