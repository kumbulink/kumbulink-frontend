import { useState, useEffect } from 'react'
import { Datepicker, type CustomFlowbiteTheme } from 'flowbite-react'

import type { WP_User } from 'wp-types'

import {
  http,
  validatePassport,
  validateAngolanID,
  countries
} from '@/shared/lib'

import {
  PopupWrapper,
  MembershipTerms,
  PrivacyPolicy,
  CountrySelector
} from '@/shared/ui'

import { useRegisterStore } from '@/shared/model'

import CalendarIcon from '/icons/calendar.svg'

import 'react-datepicker/dist/react-datepicker.css'
import '../style.css'

const customTheme: CustomFlowbiteTheme['datepicker'] = {
  root: {
    base: 'relative',
    input: {
      base: 'w-full rounded-md border border-gray-300 p-2 text-gray-600 placeholder:text-gray-400 !bg-white',
      field: {
        base: 'block w-full p-0 text-gray-600 !bg-white',
        input: {
          base: 'w-full border-0 p-0 focus:outline-none focus:ring-0 !bg-white !text-base !pl-2'
        }
      }
    }
  },
  popup: {
    footer: {
      button: {
        today: 'hidden',
        clear: 'hidden'
      }
    }
  },
  views: {
    days: {
      items: {
        item: {
          selected: 'bg-primary-green text-white hover:bg-primary-green'
        }
      }
    }
  }
}

export const Step2: React.FC = () => {
  const { currentStep, prevStep, nextStep, formData, setFormData } =
    useRegisterStore()
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedDocument, setSelectedDocument] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isDocumentValid, setIsDocumentValid] = useState<boolean>(false)
  const [fullName, setFullName] = useState<string>('')
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [documentNumber, setDocumentNumber] = useState<string>('')
  const [isPopUpOpen, setIsPopupOpen] = useState(false)
  const [popUpContent, setPopUpContent] = useState<React.ReactNode>(null)
  const handleCountrySelect = (countryName: string) => {
    setSelectedCountry(countryName)
    setSelectedDocument('')
  }

  const handleDocumentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDocument(event.target.value)
  }

  const handleDocumentNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    setDocumentNumber(value)

    if (selectedCountry === 'Angola') {
      if (selectedDocument === 'Passaporte') {
        setIsDocumentValid(validatePassport(value, selectedCountry))
      } else if (selectedDocument === 'Bilhete de Identidade') {
        setIsDocumentValid(validateAngolanID(value))
      }
    } else {
      setIsDocumentValid(validatePassport(value, selectedCountry))
    }
  }

  const isFormValid = () => {
    const isNameValid = fullName.trim().length >= 3 && fullName.includes(' ')
    const isDateValid = selectedDate !== null && selectedDate < new Date()

    return isNameValid && isDateValid && isDocumentValid && termsAccepted
  }

  const handleRegister = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const username = formData.step2.fullName.split(' ').join('').toLowerCase()

      const response = await http.post<WP_User>('/custom/v1/create-user', {
        username: username,
        ...formData.step1,
        ...formData.step2,
        name: formData.step2.fullName
      })

      if (response.status !== 201) {
        throw new Error('Erro ao criar usuário')
      }

      nextStep()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar usuário')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTerms = (type: 'membership' | 'privacy') => {
    setIsPopupOpen(true)

    switch (type) {
      case 'membership':
        setPopUpContent(<MembershipTerms />)
        break
      case 'privacy':
        setPopUpContent(<PrivacyPolicy />)
    }
  }

  useEffect(() => {
    setFormData('step2', {
      fullName,
      birthDate: selectedDate,
      country: selectedCountry,
      documentType: selectedDocument,
      documentNumber,
      termsAccepted
    })
  }, [
    setFormData,
    fullName,
    selectedDate,
    selectedCountry,
    selectedDocument,
    documentNumber,
    termsAccepted
  ])

  return (
    <div className='flex min-h-screen flex-col bg-white px-4'>
      <div className='flex items-center pt-4'>
        {currentStep > 1 && (
          <>
            <button className='mr-4' onClick={prevStep}>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M15 18L9 12L15 6'
                  stroke='black'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
            <span className='text-title'>Cadastro</span>
          </>
        )}
      </div>

      <h1 className='text-title font-light mt-20 mb-8'>Insira seus dados</h1>

      <div className='space-y-4'>
        <div>
          <input
            type='text'
            placeholder='Nome completo'
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className='w-full focus:outline-primary-green rounded-md border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400'
          />
        </div>

        <div className='relative'>
          <Datepicker
            value={selectedDate}
            onChange={date => setSelectedDate(date)}
            icon={() => false}
            rightIcon={() => (
              <img src={CalendarIcon} alt='Calendar' className='w-6 h-6' />
            )}
            theme={customTheme}
            placeholder='Data de nascimento'
            language='pt-BR'
          />
        </div>

        <CountrySelector handleSelect={handleCountrySelect} />
        {selectedCountry && (
          <div className='relative'>
            <select
              value={selectedDocument}
              onChange={handleDocumentChange}
              className='w-full focus:outline-primary-green rounded-md border border-gray-300 p-4 text-gray-600 appearance-none bg-white'
            >
              <option value='' disabled>
                Selecione o tipo de documento
              </option>
              {countries
                .find(c => c.name === selectedCountry)
                ?.documents.map(doc => (
                  <option key={doc} value={doc}>
                    {doc}
                  </option>
                ))}
            </select>
            <span className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
              ▼
            </span>
          </div>
        )}

        {!selectedDocument && (
          <p className='text-sm text-gray-500'>
            Selecione o país e tipo de documento
          </p>
        )}

        {selectedDocument && (
          <div>
            <input
              type='text'
              placeholder={
                selectedDocument === 'Bilhete de Identidade'
                  ? 'Número do bilhete de identidade'
                  : 'Número do passaporte'
              }
              className={`w-full focus:outline-primary-green rounded-md border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400 ${
                documentNumber && !isDocumentValid && 'border-red-500'
              }`}
              onChange={handleDocumentNumberChange}
            />
            {documentNumber && !isDocumentValid && (
              <p className='text-sm text-red-500 mt-1'>
                {selectedDocument === 'Bilhete de Identidade'
                  ? 'Bilhete de identidade inválido. Use 9 dígitos, 2 letras e 3 dígitos.'
                  : 'Passaporte inválido.'}
              </p>
            )}
          </div>
        )}

        {/* Terms checkbox */}
        <label className='mt-4 flex items-start'>
          <input
            type='checkbox'
            checked={termsAccepted}
            onChange={e => setTermsAccepted(e.target.checked)}
            className='mt-1 mr-2 accent-primary-orange'
          />
          <span className='text-sm text-gray-600'>
            Li e concordo com os termos da{' '}
            <a
              href='#'
              className='text-primary-orange'
              onClick={() => handleTerms('membership')}
            >
              contrato de adesão
            </a>{' '}
            da{' '}
            <a
              href='#'
              className='text-primary-orange'
              onClick={() => handleTerms('privacy')}
            >
              política de privacidade
            </a>
          </span>
        </label>

        {error && (
          <div className='p-4 mb-4 text-red-700 bg-red-100 rounded-md'>
            {error}
          </div>
        )}

        <button
          type='submit'
          className={`mt-20 w-full rounded-md py-4 text-white ${
            isFormValid() && !isLoading
              ? 'bg-primary-green'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={handleRegister}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </div>

      {/* Progress bar */}
      <div className='mt-6 h-1 w-1/3 bg-primary-orange' />

      <PopupWrapper isOpen={isPopUpOpen} onClose={() => setIsPopupOpen(false)}>
        {popUpContent}
      </PopupWrapper>
    </div>
  )
}

export default Step2
