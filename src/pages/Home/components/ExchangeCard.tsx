import { lazy, Suspense } from 'react'

interface ExchangeCardProps {
  from: { country: string; amount: number; currency: string }
  to: { country: string; amount: number; currency: string }
  bank: string
  timeAgo: string
}

const Flag = lazy(() => import('react-world-flags'))

import countries from '@shared/utils/countries.json'

export const ExchangeCard = ({
  from,
  to,
  bank,
  timeAgo
}: ExchangeCardProps) => (
  <div className='bg-white rounded-lg p-4 shadow-sm'>
    <div className='text-sm text-gray-600'>{bank}</div>
    <div className='flex items-center justify-between mt-2'>
      <div>
        <div className='flex items-center gap-2'>
          <Suspense fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}>
            <Flag
              code={countries[1].iso}
              height={20}
              width={30}
              className='mr-2'
            />
          </Suspense>
          <span className='text-gray-600'>{from.country}</span>
        </div>
        <div className='font-medium mt-1'>
          {from.currency}{' '}
          {from.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
      </div>

      <div className='text-green-600'>→</div>

      <div className='text-right'>
        <div className='flex items-center gap-2 justify-end'>
          <Suspense fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}>
            <Flag
              code={countries[0].iso}
              height={20}
              width={30}
              className='mr-2'
            />
          </Suspense>
          <span className='text-gray-600'>{to.country}</span>
        </div>
        <div className='font-medium mt-1'>
          {to.currency}{' '}
          {to.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
      </div>
    </div>

    <div className='flex justify-between items-center mt-3'>
      <span className='text-sm text-gray-500'>
        Oferta realizada há {timeAgo}
      </span>
      <button className='text-[#DA7739] font-medium'>Ver anúncio</button>
    </div>
  </div>
)
