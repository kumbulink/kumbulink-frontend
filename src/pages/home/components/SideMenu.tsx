import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'

import { useUserStore } from '@/shared/model/providers/userStore'
import {
  ProfileIcon,
  AdsIcon,
  BusinessIcon,
  BankIcon,
  HelpIcon,
  LogoutIcon,
  CloseIcon
} from '@/shared/ui'

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  const { user, logout } = useUserStore()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  const isAuthenticated = useUserStore(state => state.user !== null)

  const menuItems = [
    { icon: ProfileIcon, label: 'Minha conta', href: '/profile' },
    { icon: AdsIcon, label: 'Meus anúncios', href: '/my-ads' },
    { icon: BusinessIcon, label: 'Anúncios aceites', href: '/accepted-ads' },
    { icon: BankIcon, label: 'Bancos cadastrados', href: '/banks' },
    { icon: HelpIcon, label: 'Ajuda', href: '/help' }
  ]

  const loggedOutMenuItems = [
    { icon: ProfileIcon, label: 'Entrar', href: '/login' },
    { icon: HelpIcon, label: 'Ajuda', href: '/help' }
  ]
  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        ref={menuRef}
        className='relative bg-white w-64 h-full shadow-lg flex flex-col'
      >
        {isAuthenticated && (
          <div className='p-4 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span className='text-gray-700 p-2'>
                Olá, <strong>{user?.displayName}</strong>
              </span>
            </div>
            <button onClick={onClose} className='p-1 cursor-pointer h-5 w-5'>
              <CloseIcon />
            </button>
          </div>
        )}

        <nav className='flex-1 p-4'>
          {isAuthenticated &&
            menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className='flex items-center gap-3 pt-6 w-full p-2 hover:bg-gray-100 rounded-lg'
              >
                <item.icon />
                <span className='text-gray-700'>{item.label}</span>
              </Link>
            ))}

          {!isAuthenticated &&
            loggedOutMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className='flex items-center gap-3 pt-6 w-full p-2 hover:bg-gray-100 rounded-lg'
              >
                <item.icon />
                <span className='text-gray-700'>{item.label}</span>
              </Link>
            ))}
        </nav>

        {!isAuthenticated && (
          <div className='p-4'>
            <Link
              to='/login'
              className='block w-full bg-primary-green text-white py-3 rounded text-center text-xs hover:bg-primary-green/90'
            >
              Entrar
            </Link>

            <Link
              to='/register'
              className='block text-primary-orange text-center mt-2 text-xs hover:underline'
            >
              Ainda não tem registo?
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <div className='p-4'>
            <button
              onClick={logout}
              className='flex items-center gap-3 w-full p-2 rounded-lg text-gray-700 cursor-pointer'
            >
              <LogoutIcon />
              <span>Sair</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
