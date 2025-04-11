import { useRef, useState } from 'react'
import { useClickOutside } from '@shared/hooks/useClickOutside'

import { AddIcon } from '@shared/ui/icons'

export const BankSelector = ({ addBank }: { addBank: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [selectedBank, setSelectedBank] = useState<string>('')
  const [isBankListOpen, setIsBankListOpen] = useState(false)

  const banks = [
    { name: 'Banco do Brasil', code: 'BB' },
    { name: 'Banco de Portugal', code: 'BP' },
    { name: 'Banco de Angola', code: 'BA' }
  ]

  useClickOutside(dropdownRef, () => setIsBankListOpen(false))

  const handleBankInputClick = () => {
    setIsBankListOpen(true)
    inputRef.current?.focus()
  }

  const handleBankSelect = (bankName: string) => {
    setSelectedBank(bankName)
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
          {banks.map(bank => (
            <button
              key={bank.name}
              onClick={() => handleBankSelect(bank.name)}
              className='flex w-full items-center p-4 hover:bg-gray-100'
            >
              <span>{bank.name}</span>
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
