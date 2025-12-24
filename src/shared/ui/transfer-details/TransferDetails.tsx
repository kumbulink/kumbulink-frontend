import { useState, useRef } from 'react'

import { PaymentKeys } from '@/shared/constants'
import { formatCurrency } from '@/shared/lib'

interface TransferDetails {
  total: number,
  currency: string
  userType: string
  fileCallback: (file: File | null ) => void
}

const setCountryTransferDetails = (currency: string, userType: string) => {
  if ((currency === 'AOA' && userType === 'seller') || (currency === 'BRL' && userType === 'buyer')) {
    return 'AGO'
  }

  if ((currency === 'AOA' && userType === 'buyer') || ((currency === 'BRL' && userType === 'seller'))) {
    return 'BRA'
  }
}

export const TransferDetails = ({ total, currency, userType, fileCallback } : TransferDetails) => {
  const [copyFeedback, setCopyFeedback] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const countryTransferDetails = setCountryTransferDetails(currency, userType)
  const isAngola :boolean = countryTransferDetails === 'AGO'

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      fileCallback(file)
    }
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <div className='border border-dashed border-primary-orange rounded-md p-1 mt-4 mb-4'>
          <div className='text-center min-w-xs'>
            <span className='text-primary-orange'>
              Total a transferir ={' '}
              <span className='font-semibold'>{formatCurrency(total, currency)}</span>
            </span>
          </div>
      </div>
      <div className='mt-4'>
        <p className='text-xs text-gray-600 mb-2'>
          {isAngola && ''}

          {isAngola && (
            <div className='flex justify-between items-center bg-gray-50 p-3 rounded-md gap-x-1'>
              <span>Multicaixa Expresso: 924281790</span>
              <button
                onClick={() => handleCopy('924281790')}
                className='text-primary-green text-xs cursor-pointer hover:opacity-80 transition-opacity'
              >
                {copyFeedback ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          )}
        </p>
        <div className='flex justify-between items-center bg-gray-50 p-3 rounded-md gap-x-1'>
          <span className='text-xs text-gray-600 max-w-[230px] block overflow-x-auto whitespace-nowrap'>
          {isAngola ? `IBAN: ${PaymentKeys.IBAN}` : `PIX: ${PaymentKeys.PIX}`}
          </span>
          <button
            onClick={() => handleCopy(isAngola ? PaymentKeys.IBAN : PaymentKeys.PIX)}
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
    </div>
  )
}