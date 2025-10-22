

export const PaymentProofPopup = ({
  onClose
}: {
  onClose: () => void
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button className="absolute top-4 right-4 text-black hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Title */}
        <h2 className="text-xl font-semibold text-primary-orange mb-4 pr-8">
          Comprovativo anexado!
        </h2>
        
        {/* Body text */}
        <p className="text-black mb-6">
          O comprovativo da transação foi anexado com sucesso, para consultar teu anúncio visite{' '}
          <a href="#" className="text-primary-orange hover:text-primary-orange-700 underline">
            Anúncios aceites.
          </a>
        </p>
        
        {/* Action button */}
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-primary-orange text-white px-6 py-2 rounded-lg hover:bg-primary-orange-700 transition-colors">
            Entendi
          </button>
        </div>
      </div>
    </div>
  )
}
