import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import SuccessIcon from '/icons/success.svg'

export const Success: React.FC = () => {
  const [countdown, setCountdown] = useState(6)
  const navigate = useNavigate()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      void navigate('/login')
    }
  }, [countdown, navigate])

  return (
    <div className='flex min-h-screen flex-col items-center bg-white px-6'>
      {/* Status Bar Space */}
      <div className='h-14 w-full' />

      {/* Success Content */}
      <div className='flex flex-col items-center justify-center flex-1'>
        {/* Success Icon */}
        <img
          src={SuccessIcon}
          alt='Success'
          className='w-16 h-16 mb-6 text-[#DA7739]'
        />

        {/* Title */}
        <h1 className='text-[#2B4420] text-3xl font-medium mb-4'>
          Boas Vindas!
        </h1>

        {/* Description */}
        <p className='text-center text-gray-600 text-base leading-relaxed'>
          Agora você faz parte da rede Kumbulink, você poderá enviar e receber
          dinheiro de onde estiver.
        </p>

        <p className='text-center text-gray-400 text-sm mt-16 leading-relaxed'>
          Você será redirecionado para a página de Login em {countdown} segundos
        </p>
      </div>
    </div>
  )
}

export default Success
