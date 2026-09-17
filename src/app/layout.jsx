import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata = {
  title: 'Nazmul Khan | Full Stack Engineer & MERN Specialist',
  description: 'Portfolio of Nazmul Khan — Full Stack Software Engineer specializing in Next.js, React, Node.js, Express, and MongoDB. Building high-performance web applications.',
  keywords: ['Nazmul Khan', 'Full Stack Developer', 'MERN Stack', 'Next.js', 'React', 'Node.js', 'Web Developer Bangladesh', 'Software Engineer'],
  authors: [{ name: 'Nazmul Khan' }],
  openGraph: {
    title: 'Nazmul Khan | Full Stack Engineer & MERN Specialist',
    description: 'Explore the full-stack projects, technical skills, and software engineering journey of Nazmul Khan.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="relative min-h-screen flex flex-col bg-background-dark text-text-primary overflow-x-hidden antialiased selection:bg-primary/20 selection:text-primary">
        
        {/* Subtle Ambient Background */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="bg-noise" />
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full opacity-30" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 flex flex-col w-full">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
