import { useState, useEffect } from 'react'
import { useRegisterStore } from '@/shared/model'

export const Step4: React.FC = () => {
  const [code, setCode] = useState(['', '', '', ''])
  const [countdown, setCountdown] = useState(52)
  const { currentStep, prevStep, nextStep } = useRegisterStore()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        nextInput?.focus()
      }
    }
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
        <h1 className='text-2xl font-light mb-16'>
          Vamos validar sua identidade
        </h1>

        <div className='flex justify-between mb-6'>
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type='text'
              maxLength={1}
              value={digit}
              onChange={e => handleCodeChange(index, e.target.value)}
              className='w-[72px] h-[72px] text-center text-2xl border-b-2 border-gray-300 focus:border-gray-400 outline-none'
            />
          ))}
        </div>

        {/* Timer Text */}
        <p className='text-sm text-gray-600'>
          Em <span className='text-gray-900'>{countdown}</span> segundos, você
          receberá o código de validação no número{' '}
          <span className='text-gray-900'>(+44) 123-4321</span>.
        </p>

        {/* Resend Link */}
        <div className='mt-4 text-sm'>
          <span className='text-gray-600'>Não recebeu o código? </span>
          <button className='text-primary-orange'>Reenviar o código</button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='mt-auto mb-6'>
        {/* Button */}
        <button
          onClick={() => {
            nextStep()
          }}
          className='w-full bg-primary-green text-white py-4 rounded-md mb-6'
        >
          Validar
        </button>

        {/* Progress Bar */}
        <div className='h-1 w-1/3 bg-primary-orange' />
      </div>
    </div>
  )
}

export default Step4
