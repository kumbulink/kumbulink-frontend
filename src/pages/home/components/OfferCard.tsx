import { lazy, Suspense } from 'react'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { countries } from '@shared/utils'

interface OfferCardProps {
  id: number
  date: string
  sender: string
  recipient: string
  sourceAmount: string
  targetAmount: string
  tax?: string
  bank: string
  paymentKey?: string
  handleClick: (id: number) => void
}

const Flag = lazy(() => import('react-world-flags'))

export const OfferCard = ({
  id,
  date,
  sender,
  recipient,
  sourceAmount,
  targetAmount,
  bank,
  handleClick
}: OfferCardProps) => {
  const getCountryCode = (country: string) => {
    const countryCode = countries.find(c => c.name === country)

    return countryCode?.iso
  }

  const getCountryCurrency = (country: string) => {
    const countryCode = countries.find(c => c.name === country)

    return countryCode?.currency
  }

  return (
    <div
      className='bg-white rounded-lg p-4 shadow-sm cursor-pointer'
      onClick={() => handleClick(id)}
    >
      <div className='flex items-center justify-between mt-2'>
        <div>
          <div className='font-medium mt-1'>
            <p className='text-gray-500 text-sm mb-2'>Eu tenho</p>
            <span className='text-black-900 text-xl'>
              {getCountryCurrency(sender)}{' '}
              {parseFloat(sourceAmount).toLocaleString('pt-BR', {
                minimumFractionDigits: 2
              })}
            </span>
          </div>
          <div className='flex items-center gap-2 mt-1'>
            <Suspense fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}>
              <Flag
                code={getCountryCode(sender)}
                height={10}
                width={20}
                className='mr-2'
              />
            </Suspense>
            <span className='text-xs text-gray-600'>{sender}</span>
          </div>
          <div className='text-xs text-gray-600'>{bank}</div>
        </div>

        <div className='text-green-600'>→</div>

        <div className='text-right'>
          <div className='font-medium mt-1'>
            <p className='text-gray-500 text-sm mb-2'>Eu quero</p>
            <span className='text-black-900 text-xl mb-2'>
              {getCountryCurrency(recipient)}{' '}
              {parseFloat(targetAmount).toLocaleString('pt-BR', {
                minimumFractionDigits: 2
              })}
            </span>
          </div>
          <div className='flex items-center gap-2 mt-1'>
            <Suspense fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}>
              <Flag
                code={getCountryCode(recipient)}
                height={10}
                width={20}
                className='mr-2'
              />
            </Suspense>
            <span className='text-xs text-gray-600'>{recipient}</span>
          </div>
          <div className='text-xs text-gray-600'>&nbsp;</div>
        </div>
      </div>

      <div className='flex justify-between items-center mt-3'>
        <span className='text-xs text-gray-400'>
          Oferta realizada{' '}
          {formatDistanceToNow(new Date(date), {
            locale: ptBR,
            addSuffix: true
          })}
        </span>
        <button className='text-primary-orange font-medium'>Ver anúncio</button>
      </div>
    </div>
  )
}
