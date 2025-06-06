import { useNavigate } from 'react-router-dom'

export const OfferMatchedDialog = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate()

  return (
    <div className='relative bg-white rounded-md p-6 w-[350px] max-w-full shadow-lg'>
      <div className='font-bold text-[15px] text-primary-green mb-2 uppercase tracking-tight'>
        ANÚNCIO ACEITE!
      </div>

      <div className='text-[15px] text-black mb-6 leading-snug'>
        Tens 24 horas para transferires o valor à Kumbulink e anexar o
        comprovativo, ou perderás a negociação. Para mais informações, consulte{' '}
        <a
          href='/accepted-offers'
          className='text-primary-orange underline font-medium'
          target='_blank'
          rel='noopener noreferrer'
        >
          Anúncios aceites.
        </a>
      </div>

      <button
        className='w-full bg-primary-orange text-white font-bold rounded-md py-3 text-base'
        onClick={() => {
          onClose()
          void navigate('/accepted-offers')
        }}
      >
        OK
      </button>
    </div>
  )
}
