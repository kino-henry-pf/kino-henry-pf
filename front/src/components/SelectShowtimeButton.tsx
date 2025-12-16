'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/authContext'
import toast from 'react-hot-toast'

interface Props {
  href: string
}

export default function SelectShowtimeButton({ href }: Props) {
  const router = useRouter()
  const { dataUser } = useAuth()

  const handleClick = () => {
    if (!dataUser) {
        toast.error(
        "❌ Error, el usuario no esta logueado"
      );
      setTimeout(() => {
        router.push(`/login?redirect=${encodeURIComponent(href)}`)
    }, 1500);
    return
    }

    router.push(href)
  }

  return (
    <button
      onClick={handleClick}
      className="mt-4 px-4 py-2 rounded bg-[var(--color-primary)] text-[var(--primary-foreground)] font-bold cursor-pointer"
    >
      Select
    </button>
  )
}