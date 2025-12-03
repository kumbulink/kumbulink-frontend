import { useState, useEffect } from 'react'

import { useClickOutside } from '@/shared/hooks'
import { AddIcon } from '@/shared/ui'
import { http } from '@/shared/lib'

import { useUserStore } from '@/shared/model/providers/userStore'

// Floating UI
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate
} from '@floating-ui/react'

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
  const user = useUserStore(state => state.user)

  const [selectedBank, setSelectedBank] = useState<string>('')
  const [isBankListOpen, setIsBankListOpen] = useState(false)
  const [banks, setBanks] = useState<Bank[]>([])
  const [loadingBanks, setLoadingBanks] = useState(false)
  const [errorBanks, setErrorBanks] = useState<string | null>(null)

  // FLOATING UI
  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    middleware: [
      offset(8), // distância do input
      flip(),    // abre pra cima se não couber
      shift({ padding: 8 }) // respiro das bordas
    ],
    whileElementsMounted: autoUpdate
  })

  useClickOutside(refs.floating, () => setIsBankListOpen(false))

  useEffect(() => {
    if (!user?.id) return

    setLoadingBanks(true)
    setErrorBanks(null)

    http
      .get(`/wp/v2/banks?author=${user.id}`)
      .then(res => {
        const banks = res.data as Bank[]
        setBanks(banks)
        
        if(banks.length > 0) {
          setSelectedBank(banks[0].acf?.bank || banks[0].title?.rendered)
          setBank(banks[0].id)
        }
      })
      .catch(() => setErrorBanks('Erro ao buscar bancos cadastrados.'))
      .finally(() => setLoadingBanks(false))
  }, [user?.id, refreshList])

  const handleBankInputClick = () => {
    setIsBankListOpen(true)
    // inputRef.current?.focus()
  }

  const handleBankSelect = (bankName: string, bankId: number) => {
    setSelectedBank(bankName)
    setBank(bankId)
    setIsBankListOpen(false)
  }

  return (
    <div className='relative flex items-center'>
      <input
        ref={refs.setReference}
        type='text'
        value={selectedBank}
        onClick={handleBankInputClick}
        readOnly
        placeholder='Selecione uma conta cadastrada'
        className={`w-full rounded-md border border-gray-300 p-4 text-gray-600 appearance-none bg-white cursor-pointer pl-4`}
      />
      <span className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
        ▼
      </span>

      {isBankListOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className='absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-auto rounded-md border border-gray-300 bg-white shadow-lg'
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
