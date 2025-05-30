import { lazy, Suspense } from 'react'

const Flag = lazy(() => import('react-world-flags'))

interface OfferCardPopupProps {
  id: string
  sourceAmount: string
  sourceCurrency: string
  sourceCountry: string
  sourceBank: string
  targetAmount: string
  targetCurrency: string
  targetCountry: string
  targetBank: string
  exchangeRate: string
  tax: string
  totalAmount: string
  onAccept: () => void
}

export const OfferCardPopup = ({
  id,
  sourceAmount,
  sourceCurrency,
  sourceCountry,
  sourceBank,
  targetAmount,
  targetCurrency,
  targetCountry,
  targetBank,
  exchangeRate,
  tax,
  totalAmount,
  onAccept
}: OfferCardPopupProps) => {
  return (
    <div className='bg-white rounded-md w-full max-w-md p-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-gray-700 text-lg'>Anúncio #{id}</h2>
      </div>

      {/* Exchange Info */}
      <div className='flex justify-between items-center mb-8'>
        <div className='space-y-1'>
          <p className='text-sm text-gray-500'>Eu tenho</p>
          <p className='text-xl font-medium'>
            {sourceCurrency} {sourceAmount}
          </p>
          <div className='flex items-center gap-2'>
            <Suspense fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}>
              <Flag code={'BRA'} height={10} width={20} className='mr-2' />
            </Suspense>
            <span className='text-sm text-gray-700'>{sourceCountry}</span>
          </div>
          <p className='text-sm text-gray-600'>{sourceBank}</p>
        </div>

        <div className='text-primary-green'>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path
              d='M4 12h16M16 8l4 4-4 4'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>

        <div className='space-y-1 text-right'>
          <p className='text-sm text-gray-500'>Eu quero</p>
          <p className='text-xl font-medium'>
            {targetCurrency} {targetAmount}
          </p>
          <div className='flex items-center gap-2 justify-end'>
            <Suspense fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}>
              <Flag code={'BRA'} height={10} width={20} className='mr-2' />
            </Suspense>
            <span className='text-sm text-gray-700'>{targetCountry}</span>
          </div>
          <p className='text-sm text-gray-600'>{targetBank}</p>
        </div>
      </div>

      {/* Details Box */}
      <div className='border border-dashed border-gray-300 rounded-md p-4 space-y-3 mb-6'>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Destino</span>
          <span className='text-gray-700'>{targetCountry}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Eu tenho</span>
          <span className='text-gray-700'>
            {sourceCurrency} {sourceAmount}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Eu quero</span>
          <span className='text-gray-700'>
            {targetCurrency} {targetAmount}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Câmbio</span>
          <span className='text-gray-700'>{exchangeRate} Kz</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Taxa de Serviço</span>
          <span className='text-gray-700'>{tax} Kwanzas (3%)</span>
        </div>
      </div>

      {/* Total */}
      <div className='border border-primary-orange rounded-md p-3 mb-8'>
        <div className='flex justify-between text-primary-orange'>
          <span>Total a transferir</span>
          <span>= {totalAmount} Kz</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-4'>
        <button className='flex-1 py-3 border border-primary-orange text-primary-orange rounded-md font-medium'>
          Cancelar
        </button>
        <button
          onClick={onAccept}
          className='flex-1 py-3 bg-primary-orange text-white rounded-md font-medium'
        >
          Aceitar
        </button>
      </div>
    </div>
  )
}
