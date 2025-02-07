import { useState, useEffect } from 'react'
import { useRegisterStore } from '../../../contexts/RegisterStore'

import { Link } from 'react-router'

const Step1: React.FC = () => {
  const { currentStep, nextStep } = useRegisterStore()
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [validations, setValidations] = useState({
    minLength: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecial: false
  })

  const validatePassword = (value: string) => {
    setValidations({
      minLength: value.length >= 6,
      hasUpperCase: /[A-Z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSpecial: /[*!$&]/.test(value)
    })
  }

  useEffect(() => {
    validatePassword(password)
  }, [password])

  const isPasswordValid = Object.values(validations).every(Boolean)

  return (
    <div className='flex min-h-screen flex-col bg-white px-6'>
      <div>
        <Link to={{ pathname: '/' }} className='flex items-center pt-4'>
          <button className='mr-4'>
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
        </Link>
      </div>

      <h1 className='text-2xl font-light mt-20 mb-8'>Crie seu login e senha</h1>

      <div className='space-y-4'>
        <div>
          <input
            type='email'
            placeholder='Digite seu melhor email'
            className='w-full rounded-lg border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400'
          />
        </div>

        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Crie uma senha'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='w-full rounded-lg border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400'
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-4 top-1/2 -translate-y-1/2'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              className='text-gray-400'
            >
              {showPassword ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 3l18 18M10.5 10.677a2 2 0 002.823 2.823M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.991 5.282 6 9 6 1.55 0 3.043-.523 4.395-1.35M12 6c4.008 0 6.701 3.158 9 6-1.007 1.797-2.956 3.992-4.5 5.5'
                />
              ) : (
                <>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                  />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Password requirements section */}
        {password.length > 0 && (
          <div className='rounded-lg bg-gray-100 p-4'>
            <p className='mb-2 text-sm font-medium text-gray-900'>
              A senha deve conter:
            </p>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <div
                  className={`h-2 w-2 rounded-full ${
                    validations.minLength ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></div>
                <span className='text-sm text-gray-600'>
                  No mínimo 6 caracteres
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <div
                  className={`h-2 w-2 rounded-full ${
                    validations.hasUpperCase ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></div>
                <span className='text-sm text-gray-600'>
                  Ao menos um caractere maiúsculo
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <div
                  className={`h-2 w-2 rounded-full ${
                    validations.hasNumber ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></div>
                <span className='text-sm text-gray-600'>
                  Ao menos um número
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <div
                  className={`h-2 w-2 rounded-full ${
                    validations.hasSpecial ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></div>
                <span className='text-sm text-gray-600'>
                  Ao menos um caractere especial (*!$&)
                </span>
              </div>
            </div>
          </div>
        )}
        {currentStep < 4 && (
          <button
            className={`mt-8 w-full rounded-lg py-4 text-white ${
              isPasswordValid
                ? 'bg-primary-green'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={isPasswordValid}
            onClick={nextStep}
          >
            Continuar
          </button>
        )}
      </div>

      <div className='mt-6 h-1 w-1/4 bg-primary-orange' />
    </div>
  )
}

export default Step1
