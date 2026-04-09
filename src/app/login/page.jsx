'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      setError('Invalid credentials');
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6 border border-primary/20 bg-background-light p-8 shadow-[4px_4px_0px_0px_rgba(0,255,65,0.2)]">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold font-mono tracking-tight text-primary">System Auth</h1>
          <p className="text-sm font-mono text-text-muted">Enter credentials to proceed</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2 font-mono">
            <Label htmlFor="email" className="text-text-primary">Email</Label>
            <Input 
              id="email" 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background-dark border-primary/30 text-text-primary focus-visible:ring-primary h-12" 
            />
          </div>
          <div className="space-y-2 font-mono">
            <Label htmlFor="password" className="text-text-primary">Password</Label>
            <Input 
              id="password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background-dark border-primary/30 text-text-primary focus-visible:ring-primary h-12" 
            />
          </div>
          {error && <p className="text-red-500 font-mono text-sm">{error}</p>}
          <Button type="submit" className="w-full h-12 bg-primary text-background-dark font-bold font-mono hover:bg-primary/90">
            [ Authenticate ]
          </Button>
        </form>
      </div>
    </div>
  );
}
