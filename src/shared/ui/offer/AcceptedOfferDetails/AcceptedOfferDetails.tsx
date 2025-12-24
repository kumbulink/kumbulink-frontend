import { lazy, Suspense, useState } from 'react'
import { useUserStore } from '@/shared/model/providers/userStore'

import type { AcceptedOfferWPPostWithACF } from '@/shared/types'
import { formatCurrency, http } from '@/shared/lib'
import { useCountryInfo } from '@/shared/hooks'
import { TransferDetails } from '@/shared/ui/transfer-details'

const Flag = lazy(() => import('react-world-flags'))

interface AcceptedOfferDetailsProps extends AcceptedOfferWPPostWithACF {
  onClose: () => void,
  handlePaymentProofSubmit: () => void
}

export const AcceptedOfferDetails = ({
  acf: customFields,
  id: matchId,
  offer,
  onClose,
  handlePaymentProofSubmit
}: AcceptedOfferDetailsProps) => {
  const user = useUserStore(state => state.user)
  const isAuthenticated = !!user?.id
  const hasBuyerPaymentProof = customFields.buyerPaymentProof

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const sellerFromCountry = offer?.fields.sellerFromCountry ?? ''
  const sellerToCountry = offer?.fields.sellerToCountry ?? ''

  const { code: senderCode, currency: senderCurrency } =
    useCountryInfo(sellerFromCountry)
  const { code: recipientCode, currency: recipientCurrency } =
    useCountryInfo(sellerToCountry)

  if (!offer) return null

  const { sourceAmount, targetAmount } = offer.fields ?? {}

  const exchangeRate = parseFloat(sourceAmount) / parseFloat(targetAmount)
  const tax = 0.03 // 3%
  const totalToTransfer =
    parseFloat(targetAmount) + parseFloat(targetAmount) * tax

  const handleUpload = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('post_id', matchId.toString())
    formData.append('type', 'buyer')

    try {
      await http.post('/custom/v1/payment-proof', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      handlePaymentProofSubmit()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='p-4 bg-white rounded-md w-full max-w-md'>
      <h2 className='text-xl mb-6 mt-4'>Anúncio #{offer.id}</h2>

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

      {!hasBuyerPaymentProof && (
        <TransferDetails
          userType='buyer'
          total={totalToTransfer} 
          currency={senderCurrency} 
          fileCallback={setSelectedFile}
        />
      )}

      {hasBuyerPaymentProof && (
        <p className='text-xs text-gray-400 mt-4 mb-4'>Comprovante anexado com sucesso. Se tudo estiver correto com as transferencias, você receberá seu cambio em até 72 horas ou seu dinheiro retorna automaticamente</p>
      )}
      

      <div className='flex gap-4 mt-6 justify-end'>
        <div className='flex gap-4 w-2/3'>
          <button
            onClick={onClose}
            className='flex-1 cursor-pointer py-2 border border-primary-orange text-primary-orange font-medium rounded-md'
          >
            Voltar
          </button>
          <button
            onClick={!hasBuyerPaymentProof ? handleUpload : onClose}
            disabled={!isAuthenticated}
            className={`flex-1 cursor-pointer py-2 bg-primary-orange text-white font-medium rounded-md ${
              !isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            OK
          </button>
        </div>
      </div>

      {!isAuthenticated && (
        <p className='text-xs text-gray-400 mt-4 text-center'>
          Você precisa estar autenticado para enviar uma oferta.
        </p>
      )}
    </div>
  )
}
