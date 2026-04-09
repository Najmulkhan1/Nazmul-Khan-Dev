import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard',
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-[calc(100vh-100px)] border border-primary/20 bg-background-light/50 p-6 m-4 gap-6">
      <div className="flex justify-between items-center border-b border-primary/20 pb-4">
        <h1 className="text-xl font-bold font-mono text-primary">&lt;AdminPanel /&gt;</h1>
        <div className="flex gap-4">
          <Link href="/admin" className="text-sm font-mono text-text-primary hover:text-primary transition-colors">
            [ Dashboard ]
          </Link>
          <a href="/api/auth/signout" className="text-sm font-mono text-red-500 hover:text-red-400 transition-colors">
            [ Logout ]
          </a>
        </div>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
