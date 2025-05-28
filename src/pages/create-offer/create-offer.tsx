import { useEffect, useState } from 'react'

import {
  CurrencyInput,
  BackButton,
  BankSelector,
  PopupWrapper,
  BankForm
} from '@shared/ui'

interface FormState {
  sender: string
  recipient: string
  sourceAmount: string
  targetAmount: string
  senderBank: string
  recipientBank: string
}

const toNumeric = (value: string) => {
  const numeric = value.replace(/\D/g, '')

  return numeric === '' ? 0 : parseInt(numeric, 10)
}

export const CreateOfferPage: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    sender: '',
    recipient: '',
    sourceAmount: '',
    targetAmount: '',
    senderBank: '',
    recipientBank: ''
  })
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useEffect(() => {
    setForm(prevForm => {
      const { targetAmount, sourceAmount } = prevForm
      const targetNumber = toNumeric(targetAmount)
      const sourceNumber = toNumeric(sourceAmount)

      const tax = targetNumber ? sourceNumber / targetNumber : 0

      return { ...prevForm, tax: tax.toFixed(4) }
    })
  }, [form.sourceAmount, form.targetAmount])

  const isFormValid =
    form.sender &&
    form.recipient &&
    form.sourceAmount &&
    form.targetAmount &&
    form.senderBank &&
    form.recipientBank

  const handleCountryRecipientSelected = (value: string) => {
    setForm(prev => ({
      ...prev,
      targetAmount: value
    }))
  }

  const handleCountrySenderSelected = (value: string) => {
    setForm(prev => ({
      ...prev,
      sourceAmount: value
    }))
  }

  const setBank = (bank: string) => {
    setForm(prev => ({
      ...prev,
      senderBank: bank
    }))
  }

  return (
    <div className='max-w-md mx-auto p-4'>
      <div className='flex items-center pt-4 mb-20'>
        <BackButton pathname='/' />
        <h1 className='text-title'>Anunciar</h1>
      </div>

      <div className='space-y-4'>
        <label className='inline-block text-black-600 text-md mb-2'>
          Eu tenho
        </label>
        <CurrencyInput
          value={form.sourceAmount}
          onChange={handleCountrySenderSelected}
        />
        <BankSelector addBank={() => setIsPopupOpen(true)} setBank={setBank} />
        <p className='text-gray-400 text-xs'>
          Só a Kumbulink terá acesso aos teus dados bancários.
        </p>

        <label className='inline-block text-black-600 text-md mb-2'>
          Eu quero
        </label>
        <CurrencyInput
          value={form.targetAmount}
          onChange={handleCountryRecipientSelected}
        />
        <BankSelector addBank={() => setIsPopupOpen(true)} setBank={setBank} />
        <p className='text-gray-400 text-xs'>
          Só a Kumbulink terá acesso aos teus dados bancários.
        </p>
      </div>

      {isFormValid && (
        <div className='mt-8 space-y-2'>
          <div className='flex justify-between text-gray-600'>
            <span>Câmbio</span>
            <span>953,50 Kz</span>
          </div>
          <div className='flex justify-between text-gray-600'>
            <span>Taxa de serviço</span>
            <span>3 Euros (3%)</span>
          </div>
          <div className='flex justify-between text-[#C25B11] font-medium'>
            <span>Total a transferir</span>
            <span>103 Euros</span>
          </div>
        </div>
      )}

      <div className='mt-6'>
        <button
          className={`w-full p-4 rounded-sm font-bold shadow-lg  ${
            isFormValid
              ? 'bg-primary-green text-stone-50'
              : 'bg-gray-100 text-gray-400'
          }`}
          disabled={!isFormValid}
        >
          Publicar anúncio
        </button>
      </div>

      <PopupWrapper isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <AddBankPopup setBank={setBank} onClose={() => setIsPopupOpen(false)} />
      </PopupWrapper>
    </div>
  )
}

export default CreateOfferPage
