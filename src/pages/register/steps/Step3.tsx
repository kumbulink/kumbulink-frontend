import { useState } from 'react'
import { useRegisterStore } from '@shared/model'

import PhoneInput, {
  type Value,
  isValidPhoneNumber
} from 'react-phone-number-input'

import 'react-phone-number-input/style.css'

export const Step3: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<Value>('' as Value)
  const { currentStep, prevStep, nextStep } = useRegisterStore()

  const isPhoneValid = (phone?: Value): boolean =>
    typeof phone === 'string' && isValidPhoneNumber(phone)

  const handlePhoneChange = (value: Value) => {
    setPhoneNumber(value)
  }

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
            <span className='text-lg'>Cadastro</span>
          </>
        )}
      </div>

      <div className='mt-20'>
        <h1 className='text-2xl font-light mb-8'>
          Vamos validar sua identidade
        </h1>

        <div className='space-y-2'>
          <label className='text-gray-800 text-base'>
            Digite seu número de telefone
          </label>

          {/* Phone Input */}
          <div
            className={`flex items-center w-full border rounded-lg p-4 ${
              !phoneNumber && isPhoneValid(phoneNumber)
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          >
            <PhoneInput
              countrySelectProps={{ unicodeFlags: true }}
              placeholder='(00) 00000-0000'
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
          </div>

          {/* Error Message */}
          {!isPhoneValid(phoneNumber) && phoneNumber && (
            <p className='text-red-500 text-sm mt-1'>
              Por favor, insira um número de telefone válido
            </p>
          )}

          {/* Helper Text */}
          <p className='text-sm text-gray-600 mt-2'>
            Vamos validar seu número de telefone, enviaremos um código por SMS.
          </p>
        </div>
      </div>

      <button
        onClick={nextStep}
        disabled={!isPhoneValid(phoneNumber) || !phoneNumber}
        className={`mt-20 w-full rounded-lg py-4 text-white ${
          !isPhoneValid(phoneNumber) || !phoneNumber
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-primary-green text-white'
        }`}
      >
        Seguir para validação
      </button>

      {/* Progress Bar */}
      <div className='mt-6 h-1 w-1/3 bg-primary-orange' />
    </div>
  )
}

export default Step3
