import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    <html lang="en" className="dark scroll-smooth">
      <body className="relative min-h-screen flex flex-col bg-background-dark text-text-primary overflow-x-hidden antialiased selection:bg-primary/20 selection:text-primary-light">
        {/* Subtle Ambient Background Gradients */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-primary/15 via-cyan-accent/10 to-transparent blur-3xl opacity-70" />
          <div className="absolute top-[30%] -left-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] opacity-40" />
          <div className="absolute top-[60%] -right-40 w-[600px] h-[600px] bg-cyan-accent/10 rounded-full blur-[140px] opacity-30" />
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
