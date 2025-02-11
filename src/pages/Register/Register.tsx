import { lazy, Suspense } from 'react'
import { useRegisterStore } from '../../contexts/RegisterStore'

const Step1 = lazy(() => import('./steps/Step1'))
const Step2 = lazy(() => import('./steps/Step2'))
const Step3 = lazy(() => import('./steps/Step3'))
const Step4 = lazy(() => import('./steps/Step4'))
const Success = lazy(() => import('./steps/Success'))

export const RegisterPage: React.FC = () => {
  const { currentStep } = useRegisterStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <form onSubmit={handleSubmit}>
        <div className='p-4 max-w-lg mx-auto'>
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
          {currentStep === 3 && <Step3 />}
          {currentStep === 4 && <Step4 />}
          {currentStep === 5 && <Success />}
        </div>
      </form>
    </Suspense>
  )
}
