import type { FC } from 'react'
import adsIcon from '/icons/ads.svg'
import configIcon from '/icons/config.svg'
import profileIcon from '/icons/profile.svg'
import businessIcon from '/icons/business.svg'
import closeIcon from '/icons/close.svg'

// Wrapper components with PascalCase naming
const AdsIcon: FC = () => (
  <img src={adsIcon} className='w-5 h-5 text-gray-600' alt='' />
)
const ConfigIcon: FC = () => (
  <img src={configIcon} className='w-5 h-5 text-gray-600' alt='' />
)
const ProfileIcon: FC = () => (
  <img src={profileIcon} className='w-5 h-5 text-gray-600' alt='' />
)
const BusinessIcon: FC = () => (
  <img src={businessIcon} className='w-5 h-5 text-gray-600' alt='' />
)
const CloseIcon: FC = () => (
  <img src={closeIcon} className='w-5 h-5 text-gray-600' alt='' />
)

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
          { icon: ProfileIcon, label: 'Minha conta' },
          { icon: AdsIcon, label: 'Meus Anúncios' },
          { icon: BusinessIcon, label: 'Anúncios aceitos' },
          { icon: ConfigIcon, label: 'Configurações' },
          { icon: CloseIcon, label: 'Ajuda' }
        ].map((item, index) => (
          <button
            key={index}
            className='flex items-center gap-3 w-full p-2 hover:bg-gray-100 rounded-lg'
          >
            <item.icon />
            <span className='text-gray-700'>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  </div>
)
