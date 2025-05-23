import { useState } from 'react'
import { CountrySelector } from '@components/CountrySelector'
import http from '@shared/utils/http'

export const AddBankPopup = ({ onClose }: { onClose: () => void }) => {
  const [PopupForm, setPopupForm] = useState({
    country: 'Portugal',
    bank: '',
    recipientName: '',
    agency: '',
    account: '',
    paymentKey: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isPopupFormValid =
    PopupForm.country && PopupForm.bank && PopupForm.recipientName

  const handleSubmit = async () => {
    if (!isPopupFormValid) return
    setLoading(true)
    setError(null)
    try {
      await http.post('https://api.kumbulink.com/wp-json/wp/v2/banks', {
        title: PopupForm.bank,
        acf: {
          country: PopupForm.country,
          recipient_name: PopupForm.recipientName,
          bank: PopupForm.bank,
          branch: PopupForm.agency,
          account_number: PopupForm.account,
          payment_key: PopupForm.paymentKey
        },
        post_status: 'publish'
      })
      setLoading(false)
      onClose()
    } catch {
      setLoading(false)
      setError('Erro ao adicionar banco. Tente novamente.')
    }
  }

  return (
    <div className='bg-white rounded-xl p-6 w-[360px] max-w-full relative'>
      <h2 className='text-lg font-medium mb-6 text-center'>Conta de destino</h2>
      <form
        className='space-y-3'
        onSubmit={e => {
          e.preventDefault()
          void handleSubmit()
        }}
      >
        <div>
          <label className='block text-sm mb-1'>País</label>
          <CountrySelector
            handleSelect={countryName =>
              setPopupForm(f => ({ ...f, country: countryName }))
            }
          />
        </div>
        <div>
          <label className='block text-sm mb-1'>Selecione o banco</label>
          <select
            className='w-full rounded-lg border border-gray-200 p-3 text-gray-500 bg-gray-50'
            value={PopupForm.bank}
            onChange={e => setPopupForm(f => ({ ...f, bank: e.target.value }))}
          >
            <option value=''>Selecione o banco</option>
            <option value='Banco de Portugal'>Banco de Portugal</option>
            <option value='Millennium BCP'>Millennium BCP</option>
            <option value='Santander'>Santander</option>
          </select>
        </div>
        <div>
          <label className='block text-sm mb-1'>
            Nome completo do destinatário
          </label>
          <input
            type='text'
            className='w-full rounded-lg border border-gray-200 p-3 text-gray-500 bg-gray-50'
            placeholder='Nome completo do destinatário'
            value={PopupForm.recipientName}
            onChange={e =>
              setPopupForm(f => ({ ...f, recipientName: e.target.value }))
            }
          />
        </div>
        <div className='flex space-x-2'>
          <div className='flex-1'>
            <label className='block text-xs text-gray-400 mb-1'>Agência</label>
            <input
              type='text'
              className='w-full rounded-lg border border-gray-200 p-3 text-gray-500 bg-gray-50'
              placeholder='Agência'
              value={PopupForm.agency}
              onChange={e =>
                setPopupForm(f => ({ ...f, agency: e.target.value }))
              }
            />
            <span className='text-xs text-gray-400'>Opcional</span>
          </div>
          <div className='flex-1'>
            <label className='block text-xs text-gray-400 mb-1'>Conta</label>
            <input
              type='text'
              className='w-full rounded-lg border border-gray-200 p-3 text-gray-500 bg-gray-50'
              placeholder='Conta'
              value={PopupForm.account}
              onChange={e =>
                setPopupForm(f => ({ ...f, account: e.target.value }))
              }
            />
            <span className='text-xs text-gray-400'>Opcional</span>
          </div>
        </div>
        <div>
          <label className='block text-sm mb-1'>Digite o MBWAY</label>
          <input
            type='text'
            className='w-full rounded-lg border border-gray-200 p-3 text-gray-500 bg-gray-50'
            placeholder='Digite o MBWAY'
            value={PopupForm.paymentKey}
            onChange={e =>
              setPopupForm(f => ({ ...f, paymentKey: e.target.value }))
            }
          />
        </div>
        <div className='flex justify-between mt-6'>
          <button
            type='button'
            className='px-8 py-2 border border-primary-orange text-primary-orange rounded-lg font-medium'
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type='submit'
            className={`px-8 py-2 rounded-lg font-medium text-white ${
              isPopupFormValid && !loading
                ? 'bg-primary-orange'
                : 'bg-gray-200 text-gray-400'
            }`}
            disabled={!isPopupFormValid || loading}
          >
            {loading ? 'Adicionando...' : 'Adicionar'}
          </button>
        </div>
        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
      </form>
    </div>
  )
}

export default AddBankPopup
