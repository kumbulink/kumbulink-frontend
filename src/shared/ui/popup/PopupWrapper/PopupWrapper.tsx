import { ReactNode } from 'react'

import { CloseIcon } from '@/shared/ui/utils'

interface PopupWrapperProps {
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
}

export const PopupWrapper = ({
  isOpen,
  onClose,
  children
}: PopupWrapperProps) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='fixed inset-0 bg-black opacity-50' onClick={onClose} />
      <div
        className={`relative h-auto max-h-[90vh]`}
      >
        <button
          onClick={onClose}
          className='absolute right-5 top-5 p-1 cursor-pointer h-5 w-5 z-9'
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  )
}
