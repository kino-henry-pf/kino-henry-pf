'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { userSessionInterface } from '@/types/userSession';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function OAuthSuccessPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { setDataUser } = useAuth();

  useEffect(() => {
    if (!token) return;

    const decoded = jwtDecode<TokenPayload>(token);

    const session: userSessionInterface = {
      message: true,
      access_token: token,
      user: {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.email,
      },
    };

    localStorage.setItem('userSession', JSON.stringify(session));
    setDataUser(session);

    window.location.href = '/';
  }, [token, setDataUser]);

  return <p>Procesando login...</p>;
}
