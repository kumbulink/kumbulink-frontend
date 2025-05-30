import { Link, useNavigate } from 'react-router-dom'

export const ConfirmedOfferDialog = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate()

  return (
    <div className='bg-white rounded-md p-6 w-full max-w-xs relative'>
      <div className='text-green-700 font-bold mb-2 text-sm'>
        ANÚNCIO PUBLICADO!
      </div>
      <div className='mb-6 text-black text-base'>
        Iremos avisar-te assim que alguém aceitar a tua proposta. Confere a{' '}
        <Link
          to='/my-offers'
          className='text-primary-orange underline font-medium'
        >
          Meus anúncios.
        </Link>
      </div>
      <div className='flex justify-end'>
        <button
          className='bg-primary-orange text-white rounded px-8 py-2 font-medium'
          onClick={() => {
            onClose()
            void navigate('/')
          }}
        >
          Ok
        </button>
      </div>
    </div>
  )
}

export default ConfirmedOfferDialog
