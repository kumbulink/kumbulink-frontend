import { lazy, Suspense } from 'react'

import { formatCurrency } from '@/shared/lib'
import { useCountryInfo } from '@/shared/hooks'

import { Status } from '@/shared/ui'
import type { AcceptedOffer } from '@/shared/types'

interface AcceptOfferCardProps extends AcceptedOffer {
  handleClick: (id: number) => void
}

const Flag = lazy(() => import('react-world-flags'))

export const AcceptedOfferCard = ({
  offer: { fields },
  id: matchId,
  status,
  totalToBuyer,
  totalToSeller,
  handleClick
}: AcceptOfferCardProps) => {
  const { sellerFrom, sellerTo, sellerFromCountry, sellerToCountry } = fields
  const { code: sellerToCode, currency: sellerToCurrency } =
    useCountryInfo(sellerToCountry)
  const { code: sellerFromCode, currency: sellerFromCurrency } =
    useCountryInfo(sellerFromCountry)

  return (
    <div
      className='bg-white rounded-md p-4 border border-[#e0e0e0] cursor-pointer'
      onClick={() => handleClick(matchId)}
    >
      <div className='flex items-center justify-between mt-2'>
        <div>
          <div className='font-medium mt-1'>
            <p className='text-gray-500 text-sm mb-2'>Eu tenho</p>
            <span className='text-black-900 text-xl'>
              {formatCurrency(parseFloat(totalToSeller), sellerFromCurrency)}
            </span>
          </div>
          <div className='flex items-center gap-2 mt-1'>
            <Suspense fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}>
              <Flag
                code={sellerFromCode}
                height={10}
                width={20}
                className='mr-2'
              />
            </Suspense>
            <span className='text-xs text-gray-600'>{sellerFromCountry}</span>
          </div>
          <div className='text-xs text-gray-600'>
            {sellerFrom?.bank || 'Banco não informado'}
          </div>
        </div>

        <div className='text-green-600'>→</div>

        <div className='text-right'>
          <div className='font-medium mt-1'>
            <p className='text-gray-500 text-sm mb-2'>Eu quero</p>
            <span className='text-black-900 text-xl mb-2'>
              {formatCurrency(parseFloat(totalToBuyer), sellerToCurrency)}
            </span>
          </div>
          <div className='flex items-center gap-2 mt-1'>
            <Suspense fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}>
              <Flag
                code={sellerToCode}
                height={10}
                width={20}
                className='mr-2'
              />
            </Suspense>
            <span className='text-xs text-gray-600'>{sellerToCountry}</span>
          </div>
          <div className='text-xs text-left text-gray-600'>
            {sellerTo?.bank || 'Banco não informado'}
          </div>
        </div>
      </div>

      <div className='flex justify-between items-center mt-3'>
        <Status status={status} />
        <button className='text-primary-orange font-medium'>Ver anúncio</button>
      </div>
    </div>
  )
}
