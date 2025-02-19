import type { FC } from 'react'

import adsIcon from '/icons/ads.svg'
import configIcon from '/icons/config.svg'
import profileIcon from '/icons/profile.svg'
import businessIcon from '/icons/business.svg'
import closeIcon from '/icons/close.svg'
import helpIcon from '/icons/help.svg'
import filterIcon from '/icons/filter.svg'
import searchIcon from '/icons/search.svg'

interface IconProps {
  className?: string
}

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

export const CloseIcon: FC = () => (
  <img src={closeIcon} className='w-5 h-5 text-gray-600' alt='' />
)

export const HelpIcon: FC = () => (
  <img src={helpIcon} className='w-5 h-5 text-gray-600' alt='' />
)

export const FilterIcon: FC = ({ className }: IconProps) => (
  <img src={filterIcon} className={className} alt='' />
)

export const SearchIcon: FC = ({ className }: IconProps) => (
  <img src={searchIcon} className={className} alt='' />
)