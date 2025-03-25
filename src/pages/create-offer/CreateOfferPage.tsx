import { useEffect, useState } from 'react'

import countries from '@shared/utils/countries.json'

import { CountrySelector } from '@/components/CountrySelector'
import { BackButton } from '@/components/BackButton'

import { formatCurrency } from '@/shared/utils/currency'

import { HiPencil } from 'react-icons/hi'

interface FormState {
  sender: string,
  recipient: string
  sourceAmount: string
  targetAmount: string
  tax: string
  bank: string
  paymentKey: string
}

const toNumeric = (value: string) => {
  const numeric = value.replace(/\D/g, '')
  
  return numeric === '' ? 0 : parseInt(numeric, 10)
}

export const CreateOfferPage: React.FC = () => {
  const [senderCurrencyCode, setSenderCurrency] = useState<string>('BRL')
  const [recipientCurrencyCode, setRecipientCurrency] = useState<string>('BRL')
  const [form, setForm] = useState<FormState>({
    sender: '',
    recipient: '',
    sourceAmount: '0',
    targetAmount: '0',
    tax: '',
    bank: '',
    paymentKey: ''
  })

  useEffect(() => {
    setForm((prevForm) => {
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
    form.tax && 
    form.bank && 
    form.paymentKey

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    const numericValue = toNumeric(value)
    const currency = name === 'sourceAmount' ? senderCurrencyCode : recipientCurrencyCode

    setForm((prev) => ({ ...prev, [name]: formatCurrency(numericValue, currency) }))
  }

  const handleCountryRecipientSelected = (
    recipient: string
  ) => {
    const countryCurrency = countries.find(country => country.name === recipient)?.currency ?? 'BRL'
    const numericValue = form.targetAmount.replace(/\D/g, '')

    setForm({ 
      ...form, 
      recipient, 
      targetAmount: formatCurrency(parseInt(numericValue), countryCurrency)
    })
    setRecipientCurrency(countryCurrency)
  }

  const handleCountrySenderSelected = (
    sender: string
  ) => {
    const countryCurrency = countries.find(country => country.name === sender)?.currency ?? 'BRL'
    const numericValue = form.sourceAmount.replace(/\D/g, '')
    
    setForm({ 
      ...form, 
      sender, 
      sourceAmount: formatCurrency(parseInt(numericValue), countryCurrency) 
    })
    setSenderCurrency(countryCurrency)
  }

  return (
    <div className='max-w-md mx-auto p-4'>
      <div className='flex items-center pt-4 mb-20'>
        <BackButton pathname='/home' />
        <h1 className='text-lg'>Anunciar</h1>
      </div>

      <div className='space-y-4'>
        <label className='text-gray-800 text-xs'>Origem</label>
        <CountrySelector handleSelect={handleCountrySenderSelected} />

        <label className='text-gray-800 text-xs'>Destino</label>
        <CountrySelector handleSelect={handleCountryRecipientSelected} />

        <div className='flex gap-2 mb-4'>
          <div className='flex-1'>
            <label className='text-gray-800 text-xs'>Eu tenho</label>
            <input
              type='text'
              name='sourceAmount'
              value={form.sourceAmount}
              onChange={handleChange}
              placeholder='Digite o valor'
              className='w-full rounded-sm border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400'
            />
            <span className='text-gray-500 text-xs'>{senderCurrencyCode}</span>
          </div>
          <div className='flex-1'>
            <label className='text-gray-800 text-xs'>Eu quero</label>
            <input
              type='text'
              name='targetAmount'
              value={form.targetAmount}
              onChange={handleChange}
              placeholder='Digite o valor'
              className='w-full rounded-sm border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400'
            />
            <span className='text-gray-500 text-xs'>{recipientCurrencyCode}</span>
          </div>
        </div>

        <label className='text-gray-800 text-xs'>Taxa de câmbio</label>
        <input
          type='text'
          name='tax'
          value={form.tax}
          readOnly
          placeholder='Digite a taxa de câmbio'
          className='w-full rounded-sm border border-gray-300 p-4 text-gray-300 placeholder:text-gray-400'
        />

        <label className='text-gray-800 text-xs'>Banco</label>
        <select
          name='bank'
          onChange={handleChange}
          className='w-full rounded-sm border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400'
        >
          <option value=''>Selecione o banco da transação</option>
          <option value='bank A'>bank A</option>
        </select>

        <div className='mt-6  '>
          <h2 className='mb-4'>Dados bancários</h2>
          <label className='text-gray-800 text-xs'>Chave para transferência</label>
          <div className='relative items-center border border-gray-300 rounded-md mb-4'>
            <input
              type='text'
              name='paymentKey'
              onChange={handleChange}
              className='w-full rounded-sm p-4 text-gray-600 placeholder:text-gray-400'
              placeholder='abbc12Dd-34ef-gH567iJK-89MnopQr'
            />
            <HiPencil className='absolute top-5 right-5 text-gray-500 cursor-pointer' />
          </div>

          <button
            className={`w-full p-4 rounded-sm font-bold shadow-lg  ${
              isFormValid ? 'bg-primary-green text-stone-50' : 'bg-gray-100 text-gray-400'
            }`}
            disabled={!isFormValid}
          >
            Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateOfferPage
