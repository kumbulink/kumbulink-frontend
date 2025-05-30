export const DeleteConfirmation = ({
  handleConfirmDelete,
  handleCancelDelete
}: {
  handleConfirmDelete: () => void
  handleCancelDelete: () => void
}) => {
  return (
    <div className='flex items-center justify-center min-h-screen z-0'>
      <div className='bg-white rounded-md p-6 w-full max-w-xs'>
        <h3 className='text-red-600 font-bold mb-2'>ATENÇÃO!</h3>
        <p className='mb-6 text-black text-base'>
          Tem certeza que deseja excluir o banco cadastrado?
        </p>
        <div className='flex gap-2'>
          <button
            className='flex-1 border border-primary-orange text-primary-orange rounded py-2 font-medium'
            onClick={handleConfirmDelete}
          >
            Sim
          </button>
          <button
            className='flex-1 bg-primary-orange text-white rounded py-2 font-medium'
            onClick={handleCancelDelete}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  )
}
