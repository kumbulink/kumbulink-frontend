import { lazy, Suspense, useState } from 'react'
import { useUserStore } from '@/shared/model/providers/userStore'

import type { OfferWPPostWithACF } from '@/shared/types'
import { formatCurrency, http } from '@/shared/lib'
import { useCountryInfo } from '@/shared/hooks'
import { BankSelector, PopupWrapper } from '@/shared/ui'

import { OfferMatchedDialog } from '../OfferMatchedDialog'

const Flag = lazy(() => import('react-world-flags'))

interface OfferDetailsProps {
  offer: OfferWPPostWithACF | null
  onClose: () => void
}

export const OfferDetails = ({ offer, onClose }: OfferDetailsProps) => {
  const user = useUserStore(state => state.user)
  const isAuthenticated = !!user?.id
  const isOfferAuthor = user?.id === offer?.author

  const [isPopUpOpen, setIsPopupOpen] = useState(false)
  const [buyerBank, setBuyerBank] = useState<number | null>(null)

  const sellerFromCountry = offer?.acf.sellerFromCountry ?? ''
  const sellerToCountry = offer?.acf.sellerToCountry ?? ''

  const { code: senderCode, currency: senderCurrency } =
    useCountryInfo(sellerFromCountry)
  const { code: recipientCode, currency: recipientCurrency } =
    useCountryInfo(sellerToCountry)

  if (!offer) return null

  const { acf, id: offerId } = offer
  const { sourceAmount, targetAmount, sellerTo, sellerFrom } = acf

  const exchangeRate = parseFloat(sourceAmount) / parseFloat(targetAmount)
  const tax = 0.03 // 3%
  const totalToTransfer =
    parseFloat(sourceAmount) + parseFloat(sourceAmount) * tax

  const handleSubmit = async () => {
    try {
      const response = await http.post('/wp/v2/matches', {
        title: `Match para oferta #${offerId} - ${sellerFrom.bank} - ${buyerBank}`,
        acf: {
          relatedOffer: offerId,
          buyer: user?.id,
          seller: offer?.author,
          sellerFrom: Number(sellerFrom.id),
          sellerTo: Number(sellerTo.id),
          // buyerFrom: buyerFrom, // TODO: add buyerFrom to acf
          buyerTo: buyerBank,
          totalToSeller: sourceAmount,
          totalToBuyer: targetAmount,
          exchangeRate: exchangeRate.toString(),
          tax: tax.toString(),
          status: 'pending'
        },
        status: 'publish'
      })
      setIsPopupOpen(true)

      if (response.status === 201) {
        setIsPopupOpen(true)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='p-4 bg-white rounded-md w-full max-w-md'>
      <h2 className='text-xl font-medium mb-4'>Anúncio #{offerId}</h2>

      {isOfferAuthor && (
        <p className='text-xs text-gray-400 mt-4 mb-4'>
          Você é o autor desta oferta. 🙂
        </p>
      )}

      <div className='flex items-center justify-between mb-4'>
        <div>
          <p className='text-gray-500 text-sm mb-1'>Eu tenho</p>
          <div className='flex items-center gap-2'>
            <Suspense fallback={<div className='w-6 h-4 bg-gray-200' />}>
              <Flag code={senderCode} height={16} width={24} />
            </Suspense>
            <span className='text-black-900 text-lg font-medium'>
              {formatCurrency(parseFloat(sourceAmount), senderCurrency)}
            </span>
          </div>
          <div className='text-xs text-gray-600 mt-1'>{sellerFrom.bank}</div>
        </div>

        <div className='text-green-600'>→</div>

        <div className='text-right'>
          <p className='text-gray-500 text-sm mb-1'>Eu quero</p>
          <div className='flex items-center gap-2 justify-end'>
            <Suspense fallback={<div className='w-6 h-4 bg-gray-200' />}>
              <Flag code={recipientCode} height={16} width={24} />
            </Suspense>
            <span className='text-black-900 text-lg font-medium'>
              {recipientCurrency} {parseFloat(targetAmount).toLocaleString()}
            </span>
          </div>
          <div className='text-xs text-gray-600 mt-1'>
            {sellerTo.bank || 'Banco não informado'}
          </div>
        </div>
      </div>

      <div className='border border-gray-200 rounded-md p-4 space-y-3 mt-4'>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Destino</span>
          <span className='font-medium'>
            {sellerTo.bank || 'Banco não informado'}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Eu tenho</span>
          <span className='font-medium'>
            {formatCurrency(parseFloat(sourceAmount), senderCurrency)}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Eu quero</span>
          <span className='font-medium'>
            {formatCurrency(parseFloat(targetAmount), recipientCurrency)}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Câmbio</span>
          <span className='font-medium'>
            {formatCurrency(exchangeRate * 100, senderCurrency)}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Taxa de serviço</span>
          <span className='font-medium'>
            {formatCurrency(parseFloat(sourceAmount) * 0.03, senderCurrency)}{' '}
            (3%)
          </span>
        </div>
      </div>

      <div className='border border-dashed border-primary-orange rounded-md p-4 mt-4'>
        <div className='text-center'>
          <span className='text-primary-orange font-semibold'>
            Total a transferir ={' '}
            {formatCurrency(totalToTransfer, senderCurrency)}
          </span>
        </div>
      </div>

      {!isOfferAuthor && (
        <div className='mt-10'>
          <h2 className='text-lg mb-4 text-gray-600'>Onde deseja receber</h2>
          <BankSelector
            addBank={() => setIsPopupOpen(true)}
            setBank={bankId => setBuyerBank(bankId)}
          />
        </div>
      )}

      <div className='flex gap-4 mt-6'>
        <button
          onClick={onClose}
          className='flex-1 cursor-pointer py-3 border border-primary-orange text-primary-orange font-medium rounded-md'
        >
          Voltar
        </button>
        {!isOfferAuthor && (
          <button
            onClick={handleSubmit}
            disabled={!buyerBank || !isAuthenticated}
            className={`flex-1 cursor-pointer py-3 bg-primary-orange text-white font-medium rounded-md ${
              !buyerBank || !isAuthenticated
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            OK
          </button>
        )}
      </div>

      {!isAuthenticated && (
        <p className='text-xs text-gray-400 mt-4 text-center'>
          Você precisa estar autenticado para enviar uma oferta.
        </p>
      )}

      <PopupWrapper isOpen={isPopUpOpen} onClose={() => setIsPopupOpen(false)}>
        <OfferMatchedDialog onClose={() => setIsPopupOpen(false)} />
      </PopupWrapper>
    </div>
  )
}
