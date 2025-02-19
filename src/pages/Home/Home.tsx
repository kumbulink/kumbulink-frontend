import { useState } from 'react'
import { SearchBar } from './components/SearchBar'
import { ExchangeCard } from './components/ExchangeCard'
import { SideMenu } from './components/SideMenu'

export const HomePage = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  const exchangeOffers = [
    {
      from: { country: 'Brasil', amount: 100, currency: 'R$' },
      to: { country: 'Angola', amount: 15655.99, currency: 'Kwz' },
      bank: 'Banco Santander',
      timeAgo: '10 minutos'
    },
    {
      from: { country: 'Brasil', amount: 500.0, currency: 'R$' },
      to: { country: 'Angola', amount: 73593.48, currency: 'Kwz' },
      bank: 'Banco Santander',
      timeAgo: '10 minutos'
    },
    {
      from: { country: 'Brasil', amount: 100, currency: 'R$' },
      to: { country: 'Angola', amount: 15655.99, currency: 'Kwz' },
      bank: 'Banco Santander',
      timeAgo: '10 minutos'
    },
    {
      from: { country: 'Brasil', amount: 500.0, currency: 'R$' },
      to: { country: 'Angola', amount: 73593.48, currency: 'Kwz' },
      bank: 'Banco Santander',
      timeAgo: '10 minutos'
    },
    {
      from: { country: 'Brasil', amount: 100, currency: 'R$' },
      to: { country: 'Angola', amount: 15655.99, currency: 'Kwz' },
      bank: 'Banco Santander',
      timeAgo: '10 minutos'
    },
    {
      from: { country: 'Brasil', amount: 500.0, currency: 'R$' },
      to: { country: 'Angola', amount: 73593.48, currency: 'Kwz' },
      bank: 'Banco Santander',
      timeAgo: '10 minutos'
    },
    {
      from: { country: 'Brasil', amount: 100, currency: 'R$' },
      to: { country: 'Angola', amount: 15655.99, currency: 'Kwz' },
      bank: 'Banco Santander',
      timeAgo: '10 minutos'
    },
    {
      from: { country: 'Brasil', amount: 500.0, currency: 'R$' },
      to: { country: 'Angola', amount: 73593.48, currency: 'Kwz' },
      bank: 'Banco Santander',
      timeAgo: '10 minutos'
    },
    // ... more offers
  ]

  return (
    <div className='min-h-screen bg-primary-green'>
      <header className='px-4 py-2 flex items-center justify-between bg-primary-green'>
        <button
          onClick={() => setIsSideMenuOpen(true)}
          className='text-white p-2'
        >
          <MenuIcon />
        </button>
        <img src='kumbulink-horizontal.svg' alt='Kumbulink' className='h-10' />
        <div className='w-8' />
      </header>

      {/* Search Bar */}
      <div className='px-4 py-2 bg-primary-green'>
        <SearchBar />
      </div>

      {/* Main Content */}
      <main className='bg-gray-100 min-h-[calc(100vh-8rem)]'>
        <div className='px-4 pt-4'>
          <div className='flex justify-end items-center'>
            <span className='text-gray-700'>Filtro (5)</span>
          </div>

          <div className='space-y-4 mt-4 pb-24'>
            {exchangeOffers.map((offer, index) => (
              <ExchangeCard key={index} {...offer} />
            ))}
          </div>
        </div>

        <div className='fixed bottom-8 left-4 right-4'>
          <button className='w-full bg-primary-orange text-white py-4 font-medium rounded-lg'>
            Anunciar
          </button>
        </div>
      </main>

      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />
    </div>
  )
}

const MenuIcon = () => (
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
