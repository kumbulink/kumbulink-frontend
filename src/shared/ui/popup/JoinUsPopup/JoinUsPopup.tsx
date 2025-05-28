import { Link } from 'react-router-dom'

export const JoinUsPopup = () => {
  return (
    <div className='relative bg-white w-full max-w-md p-8'>
      <div className='flex justify-end mb-8'>
        <img
          src='kumbulink-logo.svg'
          alt='Kumbulink Logo'
          className='w-40 h-40'
        />
      </div>

      <div className='space-y-4'>
        <h2 className='leading-tight'>
          <span className='text-[30px] text-primary-orange font-normal'>
            JUNTA-TE À
          </span>
          <br />
          <span className='font-bold text-[50px] font-geo'>KUMBULINK</span>
        </h2>

        <p className='text-[16px] leading-7 text-gray-700 max-w-[280px]'>
          Regista-te agora e encontra milhares de pessoas para trocar e enviar
          dinheiro de forma segura, simples e a partir de qualquer lugar.
        </p>

        <div className='pt-4'>
          <Link
            to='/register'
            className='block w-full bg-primary-green text-white py-3 rounded text-center font-medium text-lg hover:bg-primary-green/90'
          >
            Registar
          </Link>

          <Link
            to='/login'
            className='block text-primary-orange text-center mt-4 text-sm hover:underline'
          >
            Já tenho uma conta
          </Link>
        </div>
      </div>
    </div>
  )
}
