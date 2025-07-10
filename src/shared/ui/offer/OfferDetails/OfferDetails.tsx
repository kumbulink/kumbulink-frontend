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
      <h2 className='text-xl mb-6 mt-4'>Anúncio #{offerId}</h2>

      {isOfferAuthor && (
        <p className='text-xs text-gray-400 mt-4 mb-4'>
          Você é o autor desta oferta. 🙂
        </p>
      )}

      <div className='flex items-center justify-between mb-4'>
        <div>
          <p className='text-gray-500 text-xs mb-1'>Eu tenho</p>
          <div>
            <span className='text-black-900 text-lg font-medium'>
              {formatCurrency(parseFloat(sourceAmount), senderCurrency)}
            </span>
          </div>
          <div className='text-[10px] text-gray-600 mt-1 flex items-center gap-2'>
            <Suspense fallback={<div className='w-6 h-4 bg-gray-200' />}>
              <Flag code={senderCode} height={4.5} width={14} />
            </Suspense>
            <span className='text-gray-600 text-[10px]'>{sellerFromCountry}</span>
          </div>
        </div>

        <div className='text-green-600'>→</div>

        <div>
          <p className='text-gray-500 text-xs mb-1'>Eu quero</p>
          <div>
            <span className='text-black-900 text-lg font-medium'>
              {formatCurrency(parseFloat(targetAmount), recipientCurrency)}
            </span>
          </div>
          <div className='text-[10px] text-gray-600 mt-1 flex items-center gap-2'>
            <Suspense fallback={<div className='w-6 h-4 bg-gray-200' />}>
              <Flag code={recipientCode} height={4.5} width={14}/>
            </Suspense>
            <span className='text-gray-600 text-[10px]'>{sellerToCountry}</span>
          </div>
        </div>
      </div>

      <div className='border border-dashed border-gray-400 rounded-md p-4 space-y-3 mt-4'>
        <div className='flex justify-between border-b border-gray-200'>
          <span className='text-xs text-gray-600'>Destino</span>
          <span className='text-xs'>{sellerToCountry}</span>
        </div>
        <div className='flex justify-between border-b border-gray-200'>
          <span className='text-gray-600 text-xs'>Eu tenho</span>
          <span className='text-xs'>
            {formatCurrency(parseFloat(sourceAmount), senderCurrency)}
          </span>
        </div>
        <div className='flex justify-between border-b border-gray-200'>
          <span className='text-gray-600 text-xs'>Eu quero</span>
          <span className='text-xs'>
            {formatCurrency(parseFloat(targetAmount), recipientCurrency)}
          </span>
        </div>
        <div className='flex justify-between border-b border-gray-200'>
          <span className='text-gray-600 text-xs'>Câmbio</span>
          <span className='text-xs'>
            {formatCurrency(exchangeRate * 100, senderCurrency)}
          </span>
        </div>
        <div className='flex justify-between border-b border-gray-200'>
          <span className='text-gray-600 text-xs'>Taxa de serviço</span>
          <span className='text-xs'>
            {formatCurrency(parseFloat(sourceAmount) * 0.03, senderCurrency)}{' '}
            (3%)
          </span>
        </div>
      </div>

      <div className='border border-dashed border-primary-orange rounded-md p-1 mt-4 mb-4'>
        <div className='text-center text-center min-w-xs'>
          <span className='text-primary-orange'>
            Total a transferir ={' '}
            <span className='font-semibold'>{formatCurrency(totalToTransfer, senderCurrency)}</span>
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

      <div className='flex gap-4 mt-6 justify-end'>
        <div className='flex gap-4 w-2/3'>
          <button
            onClick={onClose}
            className='flex-1 cursor-pointer py-2 border border-primary-orange text-primary-orange font-medium rounded-md'
          >
            Voltar
          </button>
          {!isOfferAuthor && (
            <button
              onClick={handleSubmit}
              disabled={!buyerBank || !isAuthenticated}
              className={`flex-1 cursor-pointer py-2 bg-primary-orange text-white font-medium rounded-md ${
                !buyerBank || !isAuthenticated
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              Aceitar
            </button>
          )}
        </div>
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
