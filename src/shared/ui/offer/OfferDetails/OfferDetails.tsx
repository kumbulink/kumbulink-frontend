import { lazy, Suspense, useState } from 'react'
import { useUserStore } from '@/shared/model/providers/userStore'

import type { WPPostWithACF } from '@/shared/types'
import { formatCurrency, http } from '@/shared/lib'
import { useCountryInfo } from '@/shared/hooks'
import { BankSelector, PopupWrapper } from '@/shared/ui'

import { OfferMatchedDialog } from '../OfferMatchedDialog'

const Flag = lazy(() => import('react-world-flags'))

interface OfferDetailsProps {
  offer: WPPostWithACF | null
  onClose: () => void
}

export const OfferDetails = ({ offer, onClose }: OfferDetailsProps) => {
  const [copyFeedback, setCopyFeedback] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isAuthenticated = useUserStore(state => state.user !== null)
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)

  const sender = offer?.acf.sender ?? ''
  const recipient = offer?.acf.recipient ?? ''

  const { code: senderCode, currency: senderCurrency } = useCountryInfo(sender)
  const { code: recipientCode, currency: recipientCurrency } =
    useCountryInfo(recipient)

  if (!offer) return null

  const { acf, id } = offer
  const { sourceAmount, targetAmount, bank, paymentKey } = acf

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) setSelectedFile(file)
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleUpload = async () => {
    if (!isAuthenticated) {
      setIsPopUpOpen(true)
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
      <h2 className='text-xl font-medium mb-4'>Anúncio #{id}</h2>

      <div className='flex items-center justify-between mb-4'>
        <div>
          <p className='text-gray-500 text-sm mb-1'>Eu tenho</p>
          <div className='flex items-center gap-2'>
            <Suspense fallback={<div className='w-6 h-4 bg-gray-200' />}>
              <Flag code={senderCode} height={16} width={24} />
            </Suspense>
            <span className='text-black-900 text-lg font-medium'>
              {senderCurrency} {parseFloat(sourceAmount).toLocaleString()}
            </span>
          </div>
          <div className='text-xs text-gray-600 mt-1'>{bank}</div>
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
          <div className='text-xs text-gray-600 mt-1'>Banco Bai</div>
        </div>
      </div>

      <div className='border border-gray-200 rounded-md p-4 space-y-3 mt-4'>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Destino</span>
          <span className='font-medium'>{recipient}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Eu tenho</span>
          <span className='font-medium'>
            {senderCurrency} {parseFloat(sourceAmount).toLocaleString()}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Eu quero</span>
          <span className='font-medium'>
            {recipientCurrency} {parseFloat(targetAmount).toLocaleString()}
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
            {parseFloat(sourceAmount) * 0.03} {senderCurrency} (3%)
          </span>
        </div>
      </div>

      <div className='border border-dashed border-primary-orange rounded-md p-4 mt-4'>
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
        <div className='flex justify-between items-center bg-gray-50 p-3 rounded-md'>
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
        <h3 className='text-gray-500 text-sm mb-2'>Anexar comprovativo</h3>
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
            className='flex justify-between items-center p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50'
          >
            <span className='text-gray-400 text-sm'>
              Ficheiros jpg, png ou pdf
            </span>
            <button className='text-primary-orange font-medium'>Anexar</button>
          </div>
        </div>
      </div>

      <div className='flex gap-4 mt-6'>
        <button
          onClick={onClose}
          className='flex-1 cursor-pointer py-3 border border-primary-orange text-primary-orange font-medium rounded-md'
        >
          Voltar
        </button>
        <button
          onClick={handleUpload}
          className='flex-1 cursor-pointer py-3 bg-primary-orange text-white font-medium rounded-md'
        >
          OK
        </button>
      </div>
      <PopupWrapper isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)}>
        <JoinUsPopup />
      </PopupWrapper>
    </div>
  )
}
