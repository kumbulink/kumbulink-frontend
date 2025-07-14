import { useNavigate } from 'react-router-dom'

import { useRegisterStore } from '@/shared/model'

import SuccessIcon from '/icons/success.svg'

export const Success: React.FC = () => {
  const navigate = useNavigate()
  const { resetSteps } = useRegisterStore()

  const handleEnter = () => {
    resetSteps()
    void navigate('/login')
  }

  return (
    <div className='flex min-h-screen flex-col items-center bg-white px-6'>
      <div className='flex flex-col items-center justify-center flex-1'>
        <img
          src={SuccessIcon}
          alt='Success'
          className='w-16 h-16 mb-6 text-primary-orange'
        />

        <h1 className='text-primary-green text-3xl font-medium mb-4'>
          Boas Vindas!
        </h1>

        <p className='text-center text-gray-600 text-base leading-relaxed'>
        Agora fazes parte da rede Kumbulink. Encontre pessoas para receber e enviar dinheiro com segurança, transparência e a partir de qualquer lugar.
        </p>

        <div className='space-y-4 w-full mt-16 text-center'>
          <button
            onClick={handleEnter}
            type='submit'
            className='w-[345px] h-[56px] rounded-md py-4 text-white bg-primary-green text-lg font-bold'
          >
            Entrar
          </button>
        </div>
      </div>
      <div className='mt-6 h-1 w-4/4 bg-primary-orange' role='presentation' />
    </div>
  )
}

export default Success
