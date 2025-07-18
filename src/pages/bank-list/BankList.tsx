import { useCallback, useEffect, useState } from 'react'
import { AxiosError } from 'axios'

import { useUserStore } from '@/shared/model/providers/userStore'

import { DeleteConfirmation } from './components/DeleteConfirmation'

import {
  PopupWrapper,
  DeleteIcon,
  EditIcon,
  BankForm,
  BackButton
} from '@/shared/ui'
import { http } from '@/shared/lib'

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

interface ClassifiedPost {
  id: number
  title: {
    rendered: string
  }
  status: string
}

export const BankListPage = () => {
  const user = useUserStore(state => state.user)
  const [banks, setBanks] = useState<Bank[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [popupContent, setPopupContent] = useState<React.ReactNode | null>(null)

  const fetchBanks = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await http.get<Bank[]>(`/wp/v2/banks?author=${user?.id}`)
      setBanks(data)
    } catch (err) {
      setError((err as AxiosError).message)
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    void fetchBanks()
  }, [fetchBanks])

  const handleOptionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    option: 'delete' | 'edit' | 'add'
  ) => {
    const bankId = e?.currentTarget?.dataset?.bankId ?? null

    if (option === 'delete') {
      setPopupContent(
        <DeleteConfirmation
          handleConfirmDelete={() => handleConfirmDelete(Number(bankId))}
          handleCancelDelete={handleCancelDelete}
        />
      )
      setIsPopupOpen(true)
      return
    }

    if (option === 'add' || option === 'edit') {
      setPopupContent(
        <BankForm
          bankId={Number(bankId)}
          onCancel={() => setIsPopupOpen(false)}
          onSuccess={handleFormSuccess}
        />
      )
      setIsPopupOpen(true)
      return
    }
  }

  const handleFormSuccess = () => {
    setIsPopupOpen(false)
    void fetchBanks()
  }

  const handleConfirmDelete = async (idToDelete: number) => {
    try {
      // First, check if the bank is associated with any active classified posts
      const response = await http.get<ClassifiedPost[]>(`/wp/v2/classifieds?meta_key=bank&meta_value=${idToDelete}&status=publish`)
      const classifiedPosts = response.data
      
      if (classifiedPosts && classifiedPosts.length > 0) {
        setError('Este banco não pode ser deletado pois está associado a anúncios ativos.')
        setIsPopupOpen(false)
        return
      }

      // If no active classified posts found, proceed with deletion
      await http.delete(`/wp/v2/banks/${idToDelete}`)
      setBanks(banks?.filter(bank => bank.id !== idToDelete) ?? null)
    } catch (err) {
      setError((err as AxiosError).message)
    } finally {
      setIsPopupOpen(false)
    }
  }

  const handleCancelDelete = () => {
    setIsPopupOpen(false)
  }

  return (
    <div className='p-4 max-w-lg mx-auto'>
      <div className='flex items-center pt-4 px-4'>
        <BackButton pathname='/' />
        <h1 className='text-title'>Bancos cadastrados</h1>
      </div>
      <div className='flex-1 flex flex-col justify-start mt-8 pt-4 px-4'>
        {loading && <div className='px-4'>Carregando...</div>}
        {error && <div className='text-red-500 mb-4'>{error}</div>}
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
                    data-bank-id={bank.id}
                    className='text-primary-orange p-1'
                    title='Deletar'
                    onClick={e => handleOptionClick(e, 'delete')}
                  >
                    <DeleteIcon className='h-5 w-5' />
                  </button>
                  <button
                    data-bank-id={bank.id}
                    className='text-green-700 p-1'
                    onClick={e => handleOptionClick(e, 'edit')}
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
        <button
          className='w-full bg-primary-orange text-white rounded shadow py-3 text-base font-medium'
          onClick={e => handleOptionClick(e, 'add')}
        >
          Adicionar
        </button>
      </div>

      <PopupWrapper isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        {popupContent}
      </PopupWrapper>
    </div>
  )
}
