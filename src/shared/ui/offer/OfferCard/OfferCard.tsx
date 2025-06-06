import { lazy, Suspense } from 'react'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { formatCurrency } from '@/shared/lib'
import { useCountryInfo } from '@/shared/hooks'

import { Status } from '@/shared/ui'
import type { Offer } from '@/shared/types'

interface OfferCardProps extends Offer {
  handleClick: (id: number) => void
  displayStatus?: boolean
}

const Flag = lazy(() => import('react-world-flags'))

export const OfferCard = ({
  date,
  id,
  sender,
  recipient,
  sourceAmount,
  targetAmount,
  bank,
  status,
  displayStatus = false,
  handleClick
}: OfferCardProps) => {
  const { code: recipientCode, currency: recipientCurrency } =
    useCountryInfo(recipient)
  const { code: senderCode, currency: senderCurrency } = useCountryInfo(sender)

  return (
    <div
      className='bg-white rounded-md p-4 border border-[#e0e0e0] cursor-pointer'
      onClick={() => handleClick(id)}
    >
      <div className='flex items-center justify-between mt-2'>
        <div>
          <div className='font-medium mt-1'>
            <p className='text-gray-500 text-sm mb-2'>Eu tenho</p>
            <span className='text-black-900 text-xl'>
              {formatCurrency(parseFloat(sourceAmount), senderCurrency)}
            </span>
          </div>
          <div className='flex items-center gap-2 mt-1'>
            <Suspense fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}>
              <Flag code={senderCode} height={10} width={20} className='mr-2' />
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
              {formatCurrency(parseFloat(targetAmount), recipientCurrency)}
            </span>
          </div>
          <div className='flex items-center gap-2 mt-1'>
            <Suspense fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}>
              <Flag
                code={recipientCode}
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
        {displayStatus && <Status status={status} label='Sem matches' />}
        {!displayStatus && (
          <span className='text-xs text-gray-400'>
            Oferta realizada{' '}
            {formatDistanceToNow(new Date(date), {
              locale: ptBR,
              addSuffix: true
            })}
          </span>
        )}
        <button className='text-primary-orange font-medium'>Ver anúncio</button>
      </div>
    </div>
  )
}
