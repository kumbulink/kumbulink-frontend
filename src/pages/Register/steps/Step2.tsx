import { lazy, Suspense } from 'react'

import { useRegisterStore } from '../../../contexts/RegisterStore'

import DatePicker from 'react-datepicker'

import CalendarIcon from '/icons/calendar.svg'
import 'react-datepicker/dist/react-datepicker.css'
import '../style.css'

import { useState } from 'react'

import countries from '../../../shared/countries.json'

const Flag = lazy(() => import('react-world-flags'))

const Step2: React.FC = () => {
  const { currentStep, prevStep, nextStep } = useRegisterStore()
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showDocumentDropdown, setShowDocumentDropdown] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country)
    setSelectedDocument(null)
    setShowCountryDropdown(false)
  }

  const handleDocumentSelect = (document: string) => {
    setSelectedDocument(document)
    setShowDocumentDropdown(false)
  }

  return (
    <div className='flex min-h-screen flex-col bg-white px-6'>
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
            <span className='text-lg'>Cadastro</span>
          </>
        )}
      </div>

      <h1 className='text-2xl font-light mt-20 mb-8'>Insira seus dados</h1>

      <div className='space-y-4'>
        <div>
          <input
            type='text'
            placeholder='Nome completo'
            className='w-full rounded-lg border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400'
          />
        </div>

        <div className='relative'>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat='dd/MM/yyyy'
            className='w-full rounded-lg border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400'
            placeholderText='Data de nascimento'
            wrapperClassName='w-full'
            showPopperArrow={false}
            calendarClassName='!border-gray-200'
            formatWeekDay={nameOfDay => nameOfDay.substring(0, 3)}
            showMonthDropdown={true}
            showYearDropdown={true}
            previousMonthButtonLabel='<'
            nextMonthButtonLabel='>'
          />
          <img
            src={CalendarIcon}
            alt='Calendar'
            className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6'
          />
          {/* <FaCalendarAlt className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400' /> */}
        </div>

        <div className='relative'>
          <button
            type='button'
            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
            className='flex w-full items-center rounded-lg border border-gray-300 p-4'
          >
            {selectedCountry ? (
              <>
                <Suspense
                  fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}
                >
                  <Flag
                    height={20}
                    width={30}
                    className='mr-2'
                    code={countries.find(c => c.name === selectedCountry)?.flag}
                  />
                </Suspense>
                <span className='text-gray-700'>{selectedCountry}</span>
              </>
            ) : (
              <span className='text-gray-500'>Selecione o país</span>
            )}
            <span className='ml-auto'>▼</span>
          </button>

          {showCountryDropdown && (
            <div className='absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg'>
              {countries.map(country => (
                <button
                  key={country.name}
                  onClick={() => handleCountrySelect(country.name)}
                  className='flex w-full items-center p-4 hover:bg-gray-100'
                >
                  <Suspense
                    fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}
                  >
                    <Flag
                      height={20}
                      width={30}
                      className='mr-2'
                      code={country.flag}
                    />
                  </Suspense>
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedCountry && (
          <div className='relative mt-4'>
            <button
              type='button'
              onClick={() => setShowDocumentDropdown(!showDocumentDropdown)}
              className='flex w-full items-center rounded-lg border border-gray-300 p-4'
            >
              {selectedDocument ? (
                <span className='text-gray-700'>{selectedDocument}</span>
              ) : (
                <span className='text-gray-500'>
                  Selecione o tipo de documento
                </span>
              )}
              <span className='ml-auto'>▼</span>
            </button>

            {showDocumentDropdown && (
              <div className='absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg'>
                {countries
                  .find(c => c.name === selectedCountry)
                  ?.documents.map(doc => (
                    <button
                      key={doc}
                      onClick={() => handleDocumentSelect(doc)}
                      className='w-full p-4 text-left hover:bg-gray-100'
                    >
                      {doc}
                    </button>
                  ))}
              </div>
            )}
          </div>
        )}

        {selectedDocument && (
          <div>
            <input
              type='text'
              placeholder='Número do documento'
              className='w-full rounded-lg border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400'
            />
          </div>
        )}

        <p className='text-sm text-gray-500'>
          Selecione o país e tipo de documento
        </p>

        {/* Terms checkbox */}
        <label className='mt-4 flex items-start'>
          <input type='checkbox' className='mt-1 mr-2 accent-primary-orange' />
          <span className='text-sm text-gray-600'>
            Li e concordo com os termos da{' '}
            <a href='#' className='text-primary-orange'>
              termos da política de privacidade
            </a>
          </span>
        </label>

        {/* Continue button */}
        <button
          type='submit'
          className='mt-20 w-full rounded-lg bg-[#2B4420] py-4 text-white'
          onClick={nextStep}
        >
          Seguir para validação
        </button>
      </div>

      {/* Progress bar */}
      <div className='mt-6 h-1 w-1/3 bg-primary-orange' />
    </div>
  )
}

export default Step2
