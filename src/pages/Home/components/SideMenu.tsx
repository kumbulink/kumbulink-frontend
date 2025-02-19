import { Link } from 'react-router-dom'

import { AdsIcon, ConfigIcon, ProfileIcon, BusinessIcon, CloseIcon, HelpIcon } from '@shared/icons'

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const SideMenu = ({ isOpen, onClose }: SideMenuProps) => (
  <div
    className={`fixed inset-0 z-50 transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
  >
    <div className='bg-white w-64 h-full shadow-lg'>
      <div className='p-4 flex justify-between items-center border-b'>
        <span>Mateus Teca</span>
        <button onClick={onClose} className='p-2'>
          <CloseIcon />
        </button>
      </div>

      <nav className='p-4 space-y-4'>
        {[
          { icon: ProfileIcon, label: 'Minha conta', href: '/login' },
          { icon: AdsIcon, label: 'Meus Anúncios', href: '/ads' },
          {
            icon: BusinessIcon,
            label: 'Anúncios aceitos',
            href: '/accepted-ads'
          },
          { icon: ConfigIcon, label: 'Configurações', href: '/settings' },
          { icon: HelpIcon, label: 'Ajuda', href: '/help' }
        ].map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className='flex items-center gap-3 w-full p-2 hover:bg-gray-100 rounded-lg'
          >
            <item.icon />
            <span className='text-gray-700'>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  </div>
)
