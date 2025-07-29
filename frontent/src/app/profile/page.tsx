'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MilitaryProfileApp from '../../components/MilitaryProfile';

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  return <MilitaryProfileApp />;
}