'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@//redux/hooks';

export default function AuthRedirect({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const currentUser = useAppSelector(
    (state) => state.users.currentUser
  );

  useEffect(() => {

    if (currentUser && pathname === '/') {
      router.replace('/home');
    }

    if(currentUser?.role === 'ADMIN' &&  pathname === '/'){
      router.replace('/admin');
    }

  }, [currentUser, pathname, router]);

  return <>{children}</>;
}
