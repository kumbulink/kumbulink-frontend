import { useRef, useState } from 'react'
import { CountrySelector } from '@/shared/ui/selectors/CountrySelector'

import { useClickOutside } from '@shared/hooks'

import { http, banks } from '@shared/utils'

export const AddBankPopup = ({
  onClose,
  setBank
}: {
  onClose: () => void
  setBank: (bank: string) => void
}) => {
  const [PopupForm, setPopupForm] = useState({
    accountName: '',
    country: 'Portugal',
    bank: '',
    recipientName: '',
    agency: '',
    account: '',
    paymentKey: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isBankListOpen, setIsBankListOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleBankInputClick = () => {
    setIsBankListOpen(true)
    inputRef.current?.focus()
  }

  useClickOutside(dropdownRef, () => setIsBankListOpen(false))

  const isPopupFormValid =
    PopupForm.country &&
    PopupForm.bank &&
    PopupForm.recipientName &&
    PopupForm.accountName &&
    PopupForm.paymentKey

  const handleBankSelect = (bankName: string) => {
    setPopupForm(f => ({ ...f, bank: bankName }))
    setIsBankListOpen(false)
  }

  const handleSubmit = async () => {
    if (!isPopupFormValid) return
    setLoading(true)
    setError(null)
    try {
      await http.post('https://api.kumbulink.com/wp-json/wp/v2/banks', {
        title: PopupForm.accountName,
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
      setBank(PopupForm.bank)
      onClose()
    } catch {
      setLoading(false)
      setError('Erro ao adicionar banco. Tente novamente.')
    }
  }

  return (
    <div className='bg-white rounded-md p-6 w-[360px] max-w-full relative'>
      <h2 className='text-title font-small mt-6 mb-6'>Conta de destino</h2>
      <form
        className='space-y-3'
        onSubmit={e => {
          e.preventDefault()
          void handleSubmit()
        }}
      >
        <div>
          <label className='sr-only'>Nome da conta</label>
          <input
            type='text'
            value={PopupForm.accountName}
            onChange={e =>
              setPopupForm(f => ({ ...f, accountName: e.target.value }))
            }
            placeholder='Nome da conta. Ex: Conta principal, conta da mãe, minha conta da familia...'
            className='w-full rounded-md border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400'
          />
        </div>
        <div>
          <label className='sr-only'>País</label>
          <CountrySelector
            handleSelect={countryName => {
              setPopupForm(f => ({ ...f, country: countryName, bank: '' }))
              setPaymentMethod(null)
            }}
          />
        </div>
        <div className='relative flex'>
          <label className='sr-only'>Selecione o banco</label>
          <input
            ref={inputRef}
            type='text'
            value={PopupForm.bank}
            onClick={handleBankInputClick}
            readOnly
            placeholder='Selecione o banco'
            className='w-full rounded-md border border-gray-300 p-4 text-gray-600 appearance-none bg-white cursor-pointer pl-4'
          />
          <span className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
            ▼
          </span>

          {isBankListOpen && (
            <div
              ref={dropdownRef}
              className='absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-auto rounded-md border border-gray-300 bg-white shadow-lg'
            >
              {banks
                .filter(bank => bank.country === PopupForm.country)
                .map(
                  (bank: {
                    code: string
                    name: string
                    payment_method: string
                  }) => (
                    <button
                      key={bank.name}
                      onClick={() => {
                        handleBankSelect(bank.name)
                        setPaymentMethod(bank.payment_method)
                      }}
                      className='flex w-full items-center p-4 hover:bg-gray-100'
                    >
                      <span>
                        {bank.code ? `${bank.code} - ${bank.name}` : bank.name}
                      </span>
                    </button>
                  )
                )}
            </div>
          )}
        </div>

        <div>
          <label className='sr-only'>Nome completo do destinatário</label>
          <input
            type='text'
            className='w-full rounded-md border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400'
            placeholder='Nome completo do destinatário'
            value={PopupForm.recipientName}
            onChange={e =>
              setPopupForm(f => ({ ...f, recipientName: e.target.value }))
            }
          />
        </div>
        <div className='flex space-x-2'>
          <div className='flex-1'>
            <label className='sr-only'>Agência</label>
            <input
              type='text'
              className='w-full rounded-md border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400'
              placeholder='Agência'
              value={PopupForm.agency}
              onChange={e =>
                setPopupForm(f => ({ ...f, agency: e.target.value }))
              }
            />
            <span className='text-xs text-gray-400'>Opcional</span>
          </div>
          <div className='flex-1'>
            <label className='sr-only'>Conta</label>
            <input
              type='text'
              className='w-full rounded-md border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400'
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
          <label className='sr-only'>Digite o {paymentMethod ?? 'PIX'}</label>
          <input
            type='text'
            className='w-full rounded-md border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400'
            placeholder={`Digite o ${
              paymentMethod?.toUpperCase() ?? 'código de pagamento'
            }`}
            value={PopupForm.paymentKey}
            onChange={e =>
              setPopupForm(f => ({ ...f, paymentKey: e.target.value }))
            }
          />
        </div>
        <div className='flex justify-between mt-6'>
          <button
            type='button'
            className='px-8 py-2 border border-primary-orange text-primary-orange rounded-md font-medium'
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type='submit'
            className={`px-8 py-2 rounded-md font-medium text-white ${
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
