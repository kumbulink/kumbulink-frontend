import { lazy, Suspense, useState, useRef } from 'react'
import { useUserStore } from '@/shared/model/providers/userStore'

import type { AcceptedOfferWPPostWithACF } from '@/shared/types'
import { formatCurrency, http } from '@/shared/lib'
import { useCountryInfo } from '@/shared/hooks'
import { JoinUsPopup, PopupWrapper } from '@/shared/ui'

import { PaymentKeys } from '@/shared/constants'

const Flag = lazy(() => import('react-world-flags'))

interface AcceptedOfferDetailsProps extends AcceptedOfferWPPostWithACF {
  onClose: () => void
}

export const AcceptedOfferDetails = ({
  offer,
  // acf,
  // id: matchId,
  onClose
}: AcceptedOfferDetailsProps) => {
  console.log('offerX', offer)
  const user = useUserStore(state => state.user)
  const isAuthenticated = !!user?.id

  const [copyFeedback, setCopyFeedback] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isPopUpOpen, setIsPopupOpen] = useState(false)

  const sellerFromCountry = offer?.fields.sellerFromCountry ?? ''
  const sellerToCountry = offer?.fields.sellerToCountry ?? ''

  const { code: senderCode, currency: senderCurrency } =
    useCountryInfo(sellerFromCountry)
  const { code: recipientCode, currency: recipientCurrency } =
    useCountryInfo(sellerToCountry)

  if (!offer) return null

  // const { acf, id: offerId } = offer
  const { sourceAmount, targetAmount } = offer.fields ?? {}

  const exchangeRate = parseFloat(sourceAmount) / parseFloat(targetAmount)
  const tax = 0.03 // 3%
  const totalToTransfer =
    parseFloat(sourceAmount) + parseFloat(sourceAmount) * tax

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PaymentKeys.IBAN)
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) setSelectedFile(file)
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleUpload = async () => {
    if (!isAuthenticated) {
      setIsPopupOpen(true)
    }

    if (!selectedFile) return

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('post_id', String(51))
    formData.append('type', 'seller')

    try {
      const response = await http.post('/custom/v1/payment-proof', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log(response)

      // setStatus('Comprovante enviado com sucesso!')
    } catch (err) {
      console.error(err)
      // setStatus('Erro ao enviar comprovante.')
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

      <div className='border border-dashed border-primary-orange rounded-md p-1 mt-4 mb-4'>
        <div className='text-center min-w-xs'>
          <span className='text-primary-orange'>
            Total a transferir ={' '}
            <span className='font-semibold'>{formatCurrency(totalToTransfer, senderCurrency)}</span>
          </span>
        </div>
      </div>

      <div className='mt-4'>
        <p className='text-xs text-gray-600 mb-2'>
          Transfere à Kumbulink · MBWAY
        </p>
        <div className='flex justify-between items-center bg-gray-50 p-3 rounded-md gap-x-1'>
          <span className='text-xs text-gray-600 max-w-[230px] block overflow-x-auto whitespace-nowrap'>
            {PaymentKeys.IBAN}
          </span>
          <button
            onClick={handleCopy}
            className='text-primary-green text-xs cursor-pointer hover:opacity-80 transition-opacity'
          >
            {copyFeedback ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      <div className='mt-4'>
        <h3 className='text-gray-500 text-xs mb-2'>Anexar comprovativo</h3>
        <div className='relative'>
          <input
            ref={fileInputRef}
            type='file'
            accept='.jpg,.jpeg,.png,.pdf'
            className='hidden'
            onChange={handleFileChange}
          />
          <div
            onClick={handleFileClick}
            className='flex justify-between items-center p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50'
          >
            <span className={`text-xs ${selectedFile ? 'text-gray-900' : 'text-gray-400'}`}>
              {selectedFile ? selectedFile.name : 'Ficheiros jpg, png ou pdf'}
            </span>
            <button className='text-primary-green text-xs'>
              {selectedFile ? 'Alterar' : 'Anexar'}
            </button>
          </div>
        </div>
      </div>

      <div className='flex gap-4 mt-6 justify-end'>
        <div className='flex gap-4 w-2/3'>
          <button
            onClick={onClose}
            className='flex-1 cursor-pointer py-2 border border-primary-orange text-primary-orange font-medium rounded-md'
          >
            Voltar
          </button>
          <button
            onClick={handleUpload}
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

      <PopupWrapper isOpen={isPopUpOpen} onClose={() => setIsPopupOpen(false)}>
        <JoinUsPopup />
      </PopupWrapper>
    </div>
  )
}
