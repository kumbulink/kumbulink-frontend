import { useEffect, useState } from 'react'

import {
  CurrencyInput,
  BackButton,
  BankSelector,
  PopupWrapper,
  BankForm,
  ConfirmedOfferDialog
} from '@/shared/ui'
import { formatCurrency, http } from '@/shared/lib'

interface FormState {
  sender: string
  recipient: string
  senderCurrency: string
  recipientCurrency: string
  sourceAmount: string
  targetAmount: string
  senderBank: number
  recipientBank: number
  exchangeRate: string
  total: string
}

const toNumeric = (value: string) => {
  const numeric = value.replace(/\D/g, '')

  return numeric === '' ? 0 : parseInt(numeric, 10)
}

export const CreateOfferPage: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    sender: 'Angola',
    recipient: 'Brasil',
    senderCurrency: 'AOA',
    recipientCurrency: 'BRL',
    sourceAmount: '',
    targetAmount: '',
    senderBank: 0,
    recipientBank: 0,
    exchangeRate: '',
    total: ''
  })
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [bankDestinationTitle, setBankDestinationTitle] = useState('')
  // const [isLoading, setIsLoading] = useState(false)
  const [popupContent, setPopupContent] = useState<React.ReactNode>(null)
  const [refreshList, setRefreshList] = useState(0)

  useEffect(() => {
    setForm(prevForm => {
      const { targetAmount, sourceAmount } = prevForm
      const targetNumber = toNumeric(targetAmount)
      const sourceNumber = toNumeric(sourceAmount)

      const exchangeRate = targetNumber ? sourceNumber / targetNumber : 0
      const total = sourceNumber * 1.03

      return {
        ...prevForm,
        exchangeRate: exchangeRate.toFixed(6),
        total: total.toString()
      }
    })
  }, [form.sourceAmount, form.targetAmount])

  const isFormValid =
    form.senderCurrency &&
    form.recipientCurrency &&
    form.sourceAmount &&
    form.targetAmount &&
    form.senderBank &&
    form.recipientBank

  const handleRecipientAmountSelected = (value: string) => {
    setForm(prev => ({
      ...prev,
      targetAmount: value
    }))
  }

  const handleSenderAmountSelected = (value: string) => {
    setForm(prev => ({
      ...prev,
      sourceAmount: value
    }))
  }

  const handleRecipientCountrySelected = (value: string) => {
    setForm(prev => ({
      ...prev,
      recipientCurrency: value,
      recipient: value === 'AOA' ? 'Angola' : 'Brasil'
    }))
  }

  const handleSenderCountrySelected = (value: string) => {
    setForm(prev => ({
      ...prev,
      senderCurrency: value,
      sender: value === 'AOA' ? 'Angola' : 'Brasil'
    }))
  }

  const handleSubmit = async () => {
    try {
      await http.post('/wp/v2/classifieds', {
        title: 'Anúncio de câmbio',
        status: 'publish',
        acf: {
          ...form
        }
      })
      setPopupContent(
        <ConfirmedOfferDialog onClose={() => setIsPopupOpen(false)} />
      )
      setIsPopupOpen(true)
    } catch (error) {
      console.log('error', error)
    }
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
          onValueChange={handleSenderAmountSelected}
          onCountryChange={handleSenderCountrySelected}
        />
        <BankSelector
          refreshList={refreshList}
          addBank={() => {
            setPopupContent(
              <BankForm
                title={bankDestinationTitle}
                onSuccess={() => {
                  setIsPopupOpen(false)
                  setRefreshList(prev => prev + 1)
                }}
                onCancel={() => setIsPopupOpen(false)}
              />
            )
            setIsPopupOpen(true)
            setBankDestinationTitle('Conta de recebimento')
          }}
          setBank={bankId => {
            setIsPopupOpen(false)
            setForm(prev => ({ ...prev, senderBank: bankId }))
          }}
        />
        <p className='text-gray-400 text-xs'>
          Só a Kumbulink terá acesso aos teus dados bancários.
        </p>

        <label className='inline-block text-black-600 text-md mb-2'>
          Eu quero
        </label>
        <CurrencyInput
          value={form.targetAmount}
          onValueChange={handleRecipientAmountSelected}
          onCountryChange={handleRecipientCountrySelected}
        />
        <BankSelector
          refreshList={refreshList}
          addBank={() => {
            setIsPopupOpen(true)
            setBankDestinationTitle('Conta de recebimento')
          }}
          setBank={bankId => {
            setIsPopupOpen(false)
            setBankDestinationTitle('')
            setForm(prev => ({ ...prev, recipientBank: bankId }))
          }}
        />
        <p className='text-gray-400 text-xs'>
          Só a Kumbulink terá acesso aos teus dados bancários.
        </p>
      </div>

      <div className='mt-8 space-y-2'>
        <div className='flex justify-between text-gray-600'>
          <span>Câmbio</span>
          <span>
            {formatCurrency(
              (parseFloat(form.sourceAmount) / parseFloat(form.targetAmount)) *
                100 || 0,
              form.senderCurrency
            )}
          </span>
        </div>
        <div className='flex justify-between text-gray-600'>
          <span>Taxa de serviço</span>
          <span>
            {formatCurrency(
              parseFloat(form.sourceAmount) * 0.03 || 0,
              form.senderCurrency
            )}
            &nbsp;(3%)
          </span>
        </div>
        <div className='flex justify-between text-[#C25B11] font-medium'>
          <span>Total a transferir</span>
          <span>
            {formatCurrency(
              parseFloat(form.sourceAmount) * 1.03 || 0,
              form.senderCurrency
            )}
          </span>
        </div>
      </div>

      <div className='mt-6'>
        <button
          className={`w-full p-4 rounded-md font-bold shadow-lg  ${
            isFormValid
              ? 'bg-primary-green text-stone-50'
              : 'bg-gray-100 text-gray-400'
          }`}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          Publicar anúncio
        </button>
      </div>

      <PopupWrapper isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        {popupContent}
      </PopupWrapper>
    </div>
  )
}

export default CreateOfferPage
