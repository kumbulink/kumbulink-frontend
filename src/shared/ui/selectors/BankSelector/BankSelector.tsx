import { useRef, useState, useEffect } from 'react'

import { useClickOutside } from '@shared/hooks'
import { AddIcon } from '@shared/ui'
import { http } from '@shared/utils'

import { useUserStore } from '@/store/userStore'

interface Bank {
  id: number
  title: {
    rendered: string
  }
  acf: {
    bank: string
  }
}

export const BankSelector = ({
  addBank,
  setBank,
  refreshList
}: {
  addBank: () => void
  setBank: (bankId: number) => void
  refreshList?: number
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const user = useUserStore(state => state.user)

  const [selectedBank, setSelectedBank] = useState<string>('')
  const [isBankListOpen, setIsBankListOpen] = useState(false)
  const [banks, setBanks] = useState<Bank[]>([])
  const [loadingBanks, setLoadingBanks] = useState(false)
  const [errorBanks, setErrorBanks] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.id) return
    setLoadingBanks(true)
    setErrorBanks(null)
    http
      .get(`/wp/v2/banks?author=${user.id}`)
      .then(res => setBanks(res.data as Bank[]))
      .catch(() => setErrorBanks('Erro ao buscar bancos cadastrados.'))
      .finally(() => setLoadingBanks(false))
  }, [user?.id, refreshList])

  useClickOutside(dropdownRef, () => setIsBankListOpen(false))

  const handleBankInputClick = () => {
    setIsBankListOpen(true)
    inputRef.current?.focus()
  }

  const handleBankSelect = (bankName: string, bankId: number) => {
    setSelectedBank(bankName)
    setBank(bankId)
    setIsBankListOpen(false)
  }

  return (
    <div className='relative flex items-center'>
      <input
        ref={inputRef}
        type='text'
        value={selectedBank}
        onClick={handleBankInputClick}
        readOnly
        placeholder='Selecione uma conta cadastrada'
        className={`w-full rounded-lg border border-gray-300 p-4 text-gray-600 appearance-none bg-white cursor-pointer ${
          selectedBank ? 'pl-16' : 'pl-4'
        }`}
      />
      <span className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
        ▼
      </span>

      {isBankListOpen && (
        <div
          ref={dropdownRef}
          className='absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg'
        >
          {loadingBanks && (
            <div className='p-4 text-center text-gray-400'>
              Carregando bancos...
            </div>
          )}
          {errorBanks && (
            <div className='p-4 text-center text-red-500'>{errorBanks}</div>
          )}
          {!loadingBanks && !errorBanks && banks.length === 0 && (
            <div className='p-4 text-center text-gray-400'>
              Nenhuma conta cadastrada
            </div>
          )}
          {!loadingBanks &&
            !errorBanks &&
            banks.map(bank => (
              <button
                key={bank.id}
                onClick={() =>
                  handleBankSelect(
                    bank.acf?.bank || bank.title?.rendered || 'Banco',
                    bank.id
                  )
                }
                className='flex w-full items-center p-4 hover:bg-gray-100'
              >
                <span>{bank.acf?.bank || bank.title?.rendered || 'Banco'}</span>
              </button>
            ))}
          <button
            key={123}
            onClick={() => addBank()}
            className='flex justify-between w-full items-center p-4 hover:bg-gray-100 text-gray-400'
          >
            <span>Adicionar uma conta</span>
            <AddIcon className='w-3 h-3 text-gray-400' />
          </button>
        </div>
      )}
    </div>
  )
}
