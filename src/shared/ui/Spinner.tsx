export const Spinner = () => {
  return (
    <div className='fixed inset-0 bg-white opacity-40 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='relative'>
        <div className='animate-spin rounded-full h-16 w-16 border-4 border-gray-200'></div>
        <div className='animate-spin rounded-full h-16 w-16 border-4 border-primary-orange border-t-transparent absolute top-0'></div>
      </div>
    </div>
  )
}
