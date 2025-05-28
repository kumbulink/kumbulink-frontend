import { useCallback, useEffect, useState } from 'react'
import { AxiosError } from 'axios'

import { useUserStore } from '@/store/userStore'

import { DeleteConfirmation } from './components/DeleteConfirmation'

import {
  PopupWrapper,
  DeleteIcon,
  EditIcon,
  BankForm,
  BackButton
} from '@/shared/ui'
import { http } from '@/shared/utils'

interface Bank {
  id: number
  title: {
    rendered: string
  }
  acf: {
    bank: string
    country: string
    branch: string
    account_number: string
    payment_key: string
  }
}

export const BankListPage = () => {
  const user = useUserStore(state => state.user)
  const [banks, setBanks] = useState<Bank[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [bankToDelete, setBankToDelete] = useState<Bank | null>(null)
  const [popupContent, setPopupContent] = useState<React.ReactNode | null>(null)

  useEffect(() => {
    setLoading(true)
    http
      .get(`/wp/v2/banks?author=${user?.id}`)
      .then(res => {
        setBanks(res?.data as Bank[])
      })
      .catch(err => {
        setError((err as AxiosError).message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleOptionClick = (option: 'delete' | 'edit') => {
    if (option === 'delete') {
      setPopupContent(
        <DeletePopup
          handleConfirmDelete={handleConfirmDelete}
          handleCancelDelete={handleCancelDelete}
        />
      )
      setIsPopupOpen(true)
      return
    }

    setPopupContent(
      <EditPopup
        handleConfirmDelete={handleConfirmDelete}
        handleCancelDelete={handleCancelDelete}
      />
    )
    setIsPopupOpen(true)
  }

  // const handleDeleteClick = (bank: Bank) => {
  //   setBankToDelete(bank)
  //   setIsPopupOpen(true)
  // }

  const handleConfirmDelete = () => {
    http
      .delete(`/wp/v2/banks/${bankToDelete?.id}`)
      .then(() => {
        setBanks(banks?.filter(bank => bank.id !== bankToDelete?.id) ?? null)
      })
      .catch(err => {
        setError((err as AxiosError).message)
      })
      .finally(() => {
        setBankToDelete(null)
        setIsPopupOpen(false)
      })
  }

  const handleCancelDelete = () => {
    setIsPopupOpen(false)
    setBankToDelete(null)
  }

  return (
    <div className='p-4 max-w-lg mx-auto'>
      <div className='flex items-center pt-4 px-4'>
        <BackButton pathname='/' />
        <h1 className='text-title'>Bancos cadastrados</h1>
      </div>
      <div className='flex-1 flex flex-col justify-start mt-8'>
        {loading && <div className='px-4'>Loading...</div>}
        {error && <div className='px-4 text-red-500'>Error: {error}</div>}
        <div className='divide-y divide-gray-200'>
          {banks?.map(bank => (
            <div key={bank.id} className='pb-4 mb-4'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                  <span className='text-base'>
                    {bank.acf.bank} | {bank.acf.country}
                  </span>
                  {bank.acf.branch && (
                    <span className='text-xs'>
                      {bank.acf.branch} | {bank.acf.account_number}
                    </span>
                  )}
                  <span className='text-xs'>{bank.acf.payment_key}</span>
                </div>
                <span className='flex items-center gap-4'>
                  <button
                    className='text-primary-orange p-1'
                    title='Deletar'
                    onClick={() => handleOptionClick('delete')}
                  >
                    <DeleteIcon className='h-5 w-5' />
                  </button>
                  <button
                    className='text-green-700 p-1'
                    onClick={() => handleOptionClick('edit')}
                    title='Editar'
                  >
                    <EditIcon className='h-5 w-5' />
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='px-4 pb-8 mt-20'>
        <button className='w-full bg-primary-orange text-white rounded shadow py-3 text-base font-medium'>
          Adicionar
        </button>
      </div>

      <PopupWrapper isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        {popupContent}
      </PopupWrapper>
    </div>
  )
}
