import type { FC } from 'react'

import adsIcon from '/icons/ads.svg'
import configIcon from '/icons/config.svg'
import profileIcon from '/icons/profile.svg'
import businessIcon from '/icons/business.svg'
import closeIcon from '/icons/close.svg'
import helpIcon from '/icons/help.svg'
import filterIcon from '/icons/filter.svg'
import searchIcon from '/icons/search.svg'
import chevronRightIcon from '/icons/chevron-right.svg'

interface IconProps {
  className?: string
}

export const MenuIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-6 w-6'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M4 6h16M4 12h16M4 18h16'
    />
  </svg>
)

export const AdsIcon: FC = () => (
  <img src={adsIcon} className='w-5 h-5 text-gray-600' alt='' />
)

export const ConfigIcon: FC = () => (
  <img src={configIcon} className='w-5 h-5 text-gray-600' alt='' />
)

export const ProfileIcon: FC = () => (
  <img src={profileIcon} className='w-5 h-5 text-gray-600' alt='' />
)

export const BusinessIcon: FC = () => (
  <img src={businessIcon} className='w-5 h-5 text-gray-600' alt='' />
)

export const BankIcon: FC = () => (
  <img src={businessIcon} className='w-5 h-5 text-gray-600' alt='' />
)

export const LogoutIcon: FC = () => (
  <img src={businessIcon} className='w-5 h-5 text-gray-600' alt='' />
)

export const CloseIcon: FC = () => (
  <img src={closeIcon} className='w-5 h-5 text-gray-600' alt='' />
)

export const HelpIcon: FC = () => (
  <img src={helpIcon} className='w-5 h-5 text-gray-600' alt='' />
)

export const FilterIcon = ({ className }: IconProps) => (
  <img
    src={filterIcon}
    className={className ?? 'w-5 h-5 text-gray-600'}
    alt=''
  />
)

export const SearchIcon = ({ className }: IconProps) => (
  <img
    src={searchIcon}
    className={className ?? 'w-5 h-5 text-gray-600'}
    alt=''
  />
)

export const ChevronRightIcon = ({ className }: IconProps) => (
  <img
    src={chevronRightIcon}
    className={className ?? 'w-5 h-5 text-gray-600'}
    alt=''
  />
)
