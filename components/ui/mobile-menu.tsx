/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { Menu, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import CreditosBadge from '../CreditosBadge';
import Button from '../Button';
import LinkButton from '../LinkButton';
import ThemeToggle from './theme-toggle';

interface MobileMenuProps {
  navigationLinks?: Array<{
    label: string;
    href: string;
  }>;
}

export default function MobileMenu({ navigationLinks = [] }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    setPortalReady(true);
  }, []);

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (!portalReady) {
      return;
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup al desmontar
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, portalReady]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          md:hidden w-10 h-10 rounded-lg 
          bg-white dark:bg-dark-surface 
          border border-slate-300 dark:border-dark-border
          flex items-center justify-center
          shadow-sm hover:shadow-md
          transition-shadow duration-200
          focus:outline-none focus:ring-2 focus:ring-primary/20
        "
        aria-label="Abrir menú"
      >
        <Menu
          className="w-5 h-5 text-slate-600 dark:text-slate-300"
          strokeWidth={2}
        />
      </button>

      {portalReady &&
        createPortal(
          <>
            {/* Overlay */}
            {isOpen && (
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120] md:hidden"
                onClick={closeMenu}
                aria-hidden="true"
              />
            )}

            {/* Menú deslizable */}
            <div
              className={`
                fixed top-0 right-0 h-full w-full max-w-[380px]
                bg-white dark:bg-[#121a2d]
                border-l border-slate-200 dark:border-white/10
                shadow-2xl z-[130] md:hidden
                transform transition-transform duration-300 ease-out
                ${isOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'}
                overflow-y-auto
              `}
            >
              {/* Header del menú */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-dark-border">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Menú
                </h3>
                <button
                  onClick={closeMenu}
                  className="
                    w-8 h-8 rounded-lg 
                    bg-slate-100 dark:bg-dark-highlight
                    flex items-center justify-center
                    hover:bg-slate-200 dark:hover:bg-slate-600
                    transition-colors duration-200
                  "
                  aria-label="Cerrar menú"
                >
                  <X
                    className="w-4 h-4 text-slate-600 dark:text-slate-300"
                    strokeWidth={2}
                  />
                </button>
              </div>

              {/* Contenido del menú */}
              <div className="flex flex-col min-h-[100dvh] text-slate-900 dark:text-slate-100">
                {/* Sección de navegación futura */}
                {navigationLinks.length > 0 && (
                  <nav className="px-6 py-4 border-b border-slate-200 dark:border-white/10">
                    <h4 className="text-sm font-medium text-slate-700 dark:text-white mb-3">
                      Navegación
                    </h4>
                    <ul className="space-y-2">
                      {navigationLinks.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.href}
                            onClick={closeMenu}
                            className="
                        block px-3 py-2 rounded-lg
                        text-slate-600 dark:text-slate-200
                        hover:bg-slate-100 dark:hover:bg-white/10
                        transition-colors duration-200
                      "
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}

                {/* Sección de tema */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-white mb-3">
                    Apariencia
                  </h4>
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-left">
                      <p className="text-sm font-medium text-slate-700 dark:text-white">
                        Tema
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-300">
                        Claro / Oscuro
                      </p>
                    </div>
                    <ThemeToggle className="flex-shrink-0" />
                  </div>
                </div>

                {/* Sección de usuario/auth */}
                <div className="px-6 py-4 flex-1 bg-white/90 dark:bg-white/5">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-white mb-3">
                    Cuenta
                  </h4>

                  {user ? (
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-50 dark:bg-white/10 rounded-lg">
                        <p className="text-sm font-medium text-slate-700 dark:text-white mb-1">
                          Hola,
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-200">
                          {user.user_metadata?.name ||
                            user.identities?.[0]?.identity_data?.name ||
                            'Usuario'}
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <CreditosBadge />
                      </div>

                      <div className="space-y-3">
                        <div onClick={closeMenu}>
                          <LinkButton href="/select-profile">
                            Abrir app
                          </LinkButton>
                        </div>

                        <Button
                          onClick={() => {
                            signOut();
                            closeMenu();
                          }}
                        >
                          Salir
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-full" onClick={closeMenu}>
                        <LinkButton href="/login">Login</LinkButton>
                      </div>
                      <div className="w-full" onClick={closeMenu}>
                        <LinkButton href="/register">Probar gratis</LinkButton>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer opcional */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-dark-border">
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    TUTOR_AI © {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}
