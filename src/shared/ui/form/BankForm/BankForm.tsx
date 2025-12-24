import { useRef, useState, useEffect } from 'react'

import { CountrySelector } from '@/shared/ui'
import { useClickOutside } from '@/shared/hooks'
import { http, banks } from '@/shared/lib'

interface BankResponse {
  id: number
  title: {
    rendered: string
  }
  acf: {
    account_name: string
    country: string
    bank: string
    recipient_name: string
    branch: string
    account_number: string
    payment_key: string
  }
}

export const BankForm = ({
  title = 'Conta de Destino',
  bankId,
  onCancel,
  onSuccess
}: {
  title?: string | null
  bankId?: number | null
  onCancel?: () => void
  onSuccess: () => void
}) => {
  const [BankForm, setBankForm] = useState({
    id: 0,
    accountName: '',
    country: '',
    bank: '',
    recipientName: '',
    branch: '',
    account: '',
    paymentKey: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isBankListOpen, setIsBankListOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const buttonLabel = bankId ? 'Guardar' : 'Adicionar'
  const buttonLoadingLabel = bankId ? 'Guardando...' : 'Adicionando...'

  useEffect(() => {
    const fetchBank = async () => {
      if (bankId) {
        try {
          const {
            data: {
              title: { rendered: accountName },
              acf: {
                country,
                bank,
                recipient_name: recipientName,
                branch,
                account_number: account,
                payment_key: paymentKey
              }
            }
          } = await http.get<BankResponse>(`/wp/v2/banks/${bankId}`)

          setBankForm({
            id: bankId,
            accountName,
            country,
            bank,
            recipientName,
            branch,
            account,
            paymentKey
          })
        } catch {
          setBankForm(f => ({ ...f, id: bankId }))
        }
      }
    }
    void fetchBank()
  }, [bankId])

  useClickOutside(dropdownRef, () => setIsBankListOpen(false))

  const handleBankInputClick = () => {
    setIsBankListOpen(true)
    inputRef.current?.focus()
  }

  const isBankFormValid =
    BankForm.country &&
    BankForm.bank &&
    BankForm.recipientName &&
    BankForm.accountName &&
    BankForm.paymentKey

  const handleBankSelect = (bankName: string) => {
    setBankForm(f => ({ ...f, bank: bankName }))
    setIsBankListOpen(false)
  }

  const handleSubmit = async () => {
    if (!isBankFormValid) return
    setLoading(true)
    setError(null)

    let url = `/wp/v2/banks`

    if (bankId) {
      url = `/wp/v2/banks/${bankId}`
    }

    try {
      await http.post(url, {
        title: BankForm.accountName,
        acf: {
          country: BankForm.country,
          recipient_name: BankForm.recipientName,
          bank: BankForm.bank,
          branch: BankForm.branch,
          account_number: BankForm.account,
          payment_key: BankForm.paymentKey
        },
        status: 'publish'
      })
      setLoading(false)
      onSuccess?.()
    } catch {
      setLoading(false)
      setError('Erro ao adicionar banco. Tente novamente.')
    }
  }

  return (
    <div className='bg-white rounded-md p-6 w-full max-w-full relative'>
      <h2 className='text-title font-small mt-6 mb-6'>{title}</h2>
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
            value={BankForm.accountName}
            onChange={e =>
              setBankForm(f => ({ ...f, accountName: e.target.value }))
            }
            placeholder='Nome da conta. Ex: Conta principal, conta da mãe, minha conta da familia...'
            className='w-full rounded-md border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400'
          />
        </div>
        <div>
          <label className='sr-only'>País</label>
          <CountrySelector
            defaultCountry={BankForm.country ?? null}
            handleSelect={countryName => {
              setBankForm(f => ({ ...f, country: countryName, bank: '' }))
              setPaymentMethod(null)
            }}
          />
        </div>
        <div className='relative flex'>
          <label className='sr-only'>Selecione o banco</label>
          <input
            ref={inputRef}
            type='text'
            value={BankForm.bank}
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
                .filter(bank => bank.country === BankForm.country)
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
            value={BankForm.recipientName}
            onChange={e =>
              setBankForm(f => ({ ...f, recipientName: e.target.value }))
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
              value={BankForm.branch}
              onChange={e =>
                setBankForm(f => ({ ...f, branch: e.target.value }))
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
              value={BankForm.account}
              onChange={e =>
                setBankForm(f => ({ ...f, account: e.target.value }))
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
            value={BankForm.paymentKey}
            onChange={e =>
              setBankForm(f => ({ ...f, paymentKey: e.target.value }))
            }
          />
        </div>
        <div className='flex justify-between mt-6'>
          <button
            type='button'
            className='px-8 py-2 border border-primary-orange text-primary-orange rounded-md font-medium'
            onClick={() => onCancel?.()}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type='submit'
            className={`px-8 py-2 rounded-md font-medium text-white ${
              isBankFormValid && !loading
                ? 'bg-primary-orange'
                : 'bg-gray-200 text-gray-400'
            }`}
            disabled={!isBankFormValid || loading}
          >
            {loading ? buttonLoadingLabel : buttonLabel}
          </button>
        </div>
        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
      </form>
    </div>
  )
}

export default BankForm
