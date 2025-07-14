import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useRegisterStore } from '@/shared/model'

import validator from 'validator'

export const Step1: React.FC = () => {
  const { currentStep, nextStep, formData, setFormData } = useRegisterStore()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>(formData.step1.email)
  const [validations, setValidations] = useState({
    minLength: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecial: false,
    isEmailValid: false
  })

  const validateEmail = (value: string) => {
    setValidations(prev => ({
      ...prev,
      isEmailValid: !!validator.isEmail(value) || false
    }))
  }

  const validatePassword = (value: string) => {
    setValidations(prev => ({
      ...prev,
      minLength: value.length >= 6,
      hasUpperCase: /[A-Z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSpecial: /[*!$&]/.test(value)
    }))
  }

  useEffect(() => {
    validatePassword(password)
    setFormData('step1', {
      password
    })
  }, [password])

  useEffect(() => {
    validateEmail(email)
    setFormData('step1', {
      email
    })
  }, [email])

  const isPasswordValid = Object.values({
    minLength: validations.minLength,
    hasUpperCase: validations.hasUpperCase,
    hasNumber: validations.hasNumber,
    hasSpecial: validations.hasSpecial
  }).every(Boolean)

  const isFormValid = isPasswordValid && validations.isEmailValid

  return (
    <div className='flex min-h-screen flex-col bg-white px-4'>
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
          <span className='text-title'>Cadastro</span>
        </Link>
      </div>

      <h1
        className='text-title font-light mt-20 mb-8'
        role='heading'
        aria-level={1}
      >
        Crie seu login e senha
      </h1>

      <div className='space-y-4'>
        <div>
          <label htmlFor='email' className='sr-only'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Digite seu melhor email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={`w-full rounded-md border focus:outline-primary-green border-gray-300 p-4 text-gray-600 placeholder:text-gray-400 ${
              !validations.isEmailValid && email.length > 0
                && 'focus:outline-red-400 border-red-400'
            }`}
            aria-label='Digite seu email para cadastro'
            aria-required='true'
            aria-invalid={!validations.isEmailValid && email.length > 0}
            aria-describedby='email-error'
          />
          {!validations.isEmailValid && email.length > 0 && (
            <span
              id='email-error'
              className='text-red-500 text-sm mt-1'
              role='alert'
            >
              Por favor, insira um email válido
            </span>
          )}
        </div>

        <div className='relative'>
          <label htmlFor='password' className='sr-only'>
            Senha
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'
            placeholder='Crie uma senha'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`w-full rounded-md border focus:outline-primary-green border-gray-300 p-4 text-gray-600 placeholder:text-gray-400 ${
              !isPasswordValid && password.length > 0 && 'focus:outline-red-400 border-red-400'
            }`}
            aria-label='Digite sua senha para cadastro'
            aria-required='true'
            aria-invalid={!isPasswordValid && password.length > 0}
            aria-describedby='password-requirements'
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
          <div
            className='rounded-md bg-gray-100 p-4'
            id='password-requirements'
            role='region'
            aria-label='Requisitos da senha'
          >
            <p className='mb-2 text-sm font-medium text-gray-900'>
              A senha deve conter:
            </p>
            <div className='space-y-2'>
              <div className='flex items-center gap-2' role='status'>
                <div
                  className={`h-2 w-2 rounded-full ${
                    validations.minLength ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  aria-hidden='true'
                ></div>
                <span className='text-sm text-gray-600'>
                  No mínimo 6 caracteres
                </span>
              </div>
              <div className='flex items-center gap-2' role='status'>
                <div
                  className={`h-2 w-2 rounded-full ${
                    validations.hasUpperCase ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  aria-hidden='true'
                ></div>
                <span className='text-sm text-gray-600'>
                  Ao menos um caractere maiúsculo
                </span>
              </div>
              <div className='flex items-center gap-2' role='status'>
                <div
                  className={`h-2 w-2 rounded-full ${
                    validations.hasNumber ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  aria-hidden='true'
                ></div>
                <span className='text-sm text-gray-600'>
                  Ao menos um número
                </span>
              </div>
              <div className='flex items-center gap-2' role='status'>
                <div
                  className={`h-2 w-2 rounded-full ${
                    validations.hasSpecial ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  aria-hidden='true'
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
            className={`mt-20 w-full rounded-md py-4 text-white ${
              isFormValid
                ? 'bg-primary-green'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isFormValid}
            onClick={nextStep}
            aria-label='Continuar para o próximo passo'
          >
            Continuar
          </button>
        )}
      </div>

      <div className='mt-6 h-1 w-1/4 bg-primary-orange' role='presentation' />
    </div>
  )
}

export default Step1
