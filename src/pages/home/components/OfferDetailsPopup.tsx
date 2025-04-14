import { lazy, Suspense, useState } from 'react'

import type { WPPostWithACF } from '../home'

const Flag = lazy(() => import('react-world-flags'))
import countries from '@shared/utils/countries.json'

interface OfferDetailsPopupProps {
  offer: WPPostWithACF | null
  onClose: () => void
}

export const OfferDetailsPopup = ({
  offer,
  onClose
}: OfferDetailsPopupProps) => {
  const [copyFeedback, setCopyFeedback] = useState(false)

  if (!offer) return null

  const { acf, id } = offer
  const { sender, recipient, sourceAmount, targetAmount, bank, paymentKey } =
    acf

  const getCountryCode = (country: string) => {
    const countryCode = countries.find(c => c.name === country)
    return countryCode?.iso
  }

  const getCountryCurrency = (country: string) => {
    const countryCode = countries.find(c => c.name === country)
    return countryCode?.currency
  }

  const exchangeRate = parseFloat(sourceAmount) / parseFloat(targetAmount)
  const tax = 0.03 // 3%
  const totalToTransfer =
    parseFloat(sourceAmount) + parseFloat(sourceAmount) * tax

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(paymentKey)
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className='p-4 bg-white rounded-lg w-[400px]'>
      <h2 className='text-xl font-medium mb-4'>Anúncio #{id}</h2>

      <div className='flex items-center justify-between mb-4'>
        <div>
          <p className='text-gray-500 text-sm mb-1'>Eu tenho</p>
          <div className='flex items-center gap-2'>
            <Suspense fallback={<div className='w-6 h-4 bg-gray-200' />}>
              <Flag code={getCountryCode(sender)} height={16} width={24} />
            </Suspense>
            <span className='text-black-900 text-lg font-medium'>
              {getCountryCurrency(sender)}{' '}
              {parseFloat(sourceAmount).toLocaleString()}
            </span>
          </div>
          <div className='text-xs text-gray-600 mt-1'>{bank}</div>
        </div>

        <div className='text-green-600'>→</div>

        <div className='text-right'>
          <p className='text-gray-500 text-sm mb-1'>Eu quero</p>
          <div className='flex items-center gap-2 justify-end'>
            <Suspense fallback={<div className='w-6 h-4 bg-gray-200' />}>
              <Flag code={getCountryCode(recipient)} height={16} width={24} />
            </Suspense>
            <span className='text-black-900 text-lg font-medium'>
              {getCountryCurrency(recipient)}{' '}
              {parseFloat(targetAmount).toLocaleString()}
            </span>
          </div>
          <div className='text-xs text-gray-600 mt-1'>Banco Bai</div>
        </div>
      </div>

      <div className='border border-gray-200 rounded-lg p-4 space-y-3 mt-4'>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Destino</span>
          <span className='font-medium'>{recipient}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Eu tenho</span>
          <span className='font-medium'>
            {getCountryCurrency(sender)}{' '}
            {parseFloat(sourceAmount).toLocaleString()}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Eu quero</span>
          <span className='font-medium'>
            {getCountryCurrency(recipient)}{' '}
            {parseFloat(targetAmount).toLocaleString()}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Câmbio</span>
          <span className='font-medium'>
            {exchangeRate.toLocaleString()} Kz
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Taxa de venda</span>
          <span className='font-medium'>
            {parseFloat(sourceAmount) * 0.03} {getCountryCurrency(sender)} (3%)
          </span>
        </div>
      </div>

      <div className='border border-dashed border-primary-orange rounded-lg p-4 mt-4'>
        <div className='text-center'>
          <span className='text-primary-orange font-semibold'>
            Total a transferir = {totalToTransfer.toLocaleString()} EUR
          </span>
        </div>
      </div>

      <div className='mt-4'>
        <p className='text-sm text-gray-600 mb-2'>
          Transfere à Kumbulink · MBWAY
        </p>
        <div className='flex justify-between items-center bg-gray-50 p-3 rounded-lg'>
          <span className='font-medium'>{paymentKey}</span>
          <button
            onClick={handleCopy}
            className='text-primary-orange font-medium cursor-pointer hover:opacity-80 transition-opacity'
          >
            {copyFeedback ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      <div className='mt-4'>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-gray-600'>Anexar comprovativo</span>
          <button className='text-primary-orange font-medium'>Anexar</button>
        </div>
        <div className='text-xs text-gray-400 mt-1'>
          Ficheiros jpg, png ou pdf
        </div>
      </div>

      <div className='flex gap-4 mt-6'>
        <button
          onClick={onClose}
          className='flex-1 cursor-pointer py-3 border border-primary-orange text-primary-orange font-medium rounded-lg'
        >
          Voltar
        </button>
        <button
          onClick={onClose}
          className='flex-1 cursor-pointer py-3 bg-primary-orange text-white font-medium rounded-lg'
        >
          OK
        </button>
      </div>
    </div>
  )
}
