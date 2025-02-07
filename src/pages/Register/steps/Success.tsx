import SuccessIcon from '/icons/success.svg'

export const Success: React.FC = () => {
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
      </div>
    </div>
  )
}

export default Success
