import { Link } from 'react-router'

import SuccessIcon from '/icons/success.svg'

export const Success: React.FC = () => {
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
          Agora você faz parte da rede Kumbulink, você poderá enviar e receber
          dinheiro de onde estiver.
        </p>

        <div className='space-y-4 w-full mt-16'>
          <Link to={{ pathname: '/login' }}>
            <button
              type='submit'
              className='w-full rounded-lg py-4 text-white bg-primary-orange'
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Success
