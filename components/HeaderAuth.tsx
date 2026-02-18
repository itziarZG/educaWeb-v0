'use client';

import { useAuth } from '@/context/auth-context';
import CreditosBadge from './CreditosBadge';
import Button from './Button';
import LinkButton from './LinkButton';

export default function HeaderAuth() {
  const { user, signOut } = useAuth();

  return (
    <div className="flex items-center md:gap-6 gap-2">
      {user ? (
        <div className="flex items-center md:gap-4 gap-1">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Hola,{' '}
            {user.user_metadata?.name ||
              user.identities?.[0]?.identity_data?.name ||
              'Usuario'}
          </span>
          <CreditosBadge />
          <Button onClick={() => signOut()}>Salir</Button>
        </div>
      ) : (
        <>
          <LinkButton href="/login">Login</LinkButton>
          <LinkButton href="/register">Probar gratis</LinkButton>
        </>
      )}
    </div>
  );
}
