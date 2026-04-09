import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Nazmul Khan - Dev',
  description: 'Portfolio of Nazmul Khan',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden font-display bg-background-dark text-text-primary transition-colors duration-300">
          <Navbar />
          <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto dark:text-white">
            {children}
          </main>
          {/* Footer */}
          <footer className="w-full flex justify-center py-8 border-t border-primary/20 mt-auto bg-background-light">
            <div className="px-4 text-center">
              <p className="text-text-muted text-sm">&copy; {new Date().getFullYear()} Nazmul Khan Dev. <span className="text-primary">All rights reserved.</span></p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
