'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-2 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-6">The page you are looking for does not exist.</p>
      <p className="text-lg mb-4">Redirecting to the home page...</p>
      <Link 
        href="/"
        className="bg-blue-1 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        Go Home Now
      </Link>
    </div>
  );
}