'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { userSessionInterface } from '@/types/userSession';
import { jwtDecode } from 'jwt-decode';
import * as Icon from "akar-icons"

interface TokenPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function OAuthSuccessPage({
  token
}: {
  token: string
}) {
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
        role: decoded.role,
      },
    };

    localStorage.setItem('userSession', JSON.stringify(session));
    setDataUser(session);

    window.location.href = '/';
  }, [token, setDataUser]);

  return <main className='flex items-center flex-col gap-5 justify-center w-full h-[calc(100dvh-6rem)] pb-[6rem]'>
    <Icon.GoogleFill className='size-14' />
    <p className='text-xl font-semibold'>Processing login...</p>
  </main>;
}
