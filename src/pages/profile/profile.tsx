import { BackButton } from '@/shared/ui/layout/BackButton'
import { useUserStore } from '@/shared/model/providers/userStore'
import { useState } from 'react'

import { http, validatePassport, validateAngolanID } from '@shared/utils'

interface EditableUserData {
  id: number
  displayName: string
  nicename: string
  email: string
  documentId: string
  documentType: string
}

interface ValidationErrors {
  documentId?: string
}

export const ProfilePage = () => {
  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [userData, setUserData] = useState<EditableUserData>({
    id: user?.id ?? 0,
    displayName: user?.displayName ?? '',
    nicename: user?.nicename ?? '',
    email: user?.email ?? '',
    documentId: user?.documentId ?? '',
    documentType: user?.documentType ?? ''
  })

  if (!user) {
    return null // or redirect to login
  }

  const validateUserData = (): boolean => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    // Validate document based on type
    let isDocumentValid = false

    if (userData.documentType === 'Bilhete de Identidade') {
      isDocumentValid = validateAngolanID(userData.documentId)
      if (!isDocumentValid) {
        newErrors.documentId =
          'Bilhete de identidade inválido. Use 9 dígitos, 2 letras e 3 dígitos.'
      }
    } else {
      // Default to Brazilian passport validation
      isDocumentValid = validatePassport(userData.documentId, 'Brasil')
      if (!isDocumentValid) {
        newErrors.documentId = 'Número de passaporte inválido.'
      }
    }

    if (!isDocumentValid) {
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange =
    (field: keyof EditableUserData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setUserData(prev => ({
        ...prev,
        [field]: value
      }))

      // Clear error when user starts typing
      if (errors[field as keyof ValidationErrors]) {
        setErrors(prev => ({
          ...prev,
          [field]: undefined
        }))
      }
    }

  const handleSave = async () => {
    if (!validateUserData()) {
      return
    }

    try {
      setIsLoading(true)

      const response = await http.post(`/wp/v2/users/${userData.id}`, {
        display_name: userData.displayName,
        email: userData.email,
        acf: {
          document_id: userData.documentId,
          document_type: userData.documentType
        }
      })

      if (response.data) {
        setUser({
          ...user,
          displayName: userData.displayName,
          nicename: userData.nicename,
          email: userData.email,
          documentId: userData.documentId,
          documentType: userData.documentType
        })
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Failed to update user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditToggle = () => {
    if (isEditing) {
      void handleSave()
    } else {
      setIsEditing(true)
      setErrors({}) // Clear any previous errors when entering edit mode
    }
  }

  return (
    <div className='p-4 max-w-lg mx-auto relative'>
      <div className='flex min-h-screen flex-col bg-white px-4'>
        <div className='flex items-center pt-4'>
          <BackButton pathname='/' />
          <span className='text-title'>Minhas Informações</span>
        </div>

        <div className='pt-3 mt-20'>
          <div className='mb-4'>
            <label className='text-xs text-[#757575] mb-1 block'>Nome</label>
            <input
              type='text'
              value={userData.displayName}
              onChange={handleInputChange('displayName')}
              disabled={!isEditing}
              className='w-full h-14 px-4 rounded-md border border-[#e0e0e0] text-medium text-neutral-900 disabled:text-neutral-900 focus:outline-none'
            />
          </div>

          <div className='mb-4'>
            <label className='text-xs text-[#757575] mb-1 block'>
              {userData.documentType === 'Bilhete de Identidade'
                ? 'Bilhete de Identidade'
                : 'Passaporte'}
            </label>
            <input
              type='text'
              value={userData.documentId}
              onChange={handleInputChange('documentId')}
              disabled={!isEditing}
              className={`w-full h-14 px-4 rounded-md border ${
                errors.documentId ? 'border-red-500' : 'border-[#e0e0e0]'
              } text-medium text-neutral-900 disabled:text-neutral-900 focus:outline-none`}
            />
            {errors.documentId && isEditing && (
              <p className='text-red-500 text-sm mt-1'>{errors.documentId}</p>
            )}
          </div>

          <div className='mb-4'>
            <label className='text-xs text-[#757575] mb-1 block'>
              E-mail de cadastro
            </label>
            <input
              type='text'
              value={userData.email}
              onChange={handleInputChange('email')}
              disabled={!isEditing}
              className='w-full h-14 px-4 rounded-md border border-[#e0e0e0] text-medium text-neutral-900 disabled:text-neutral-900 focus:outline-none'
            />
          </div>

          <div className='px-8 max-w-lg mx-auto fixed bottom-8 left-6 right-6'>
            <button
              onClick={handleEditToggle}
              disabled={isLoading}
              className={`w-full bg-white border-2 border-primary-orange text-primary-orange py-4 text-xl rounded-md disabled:opacity-50 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Salvando...' : isEditing ? 'Salvar' : 'Editar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
