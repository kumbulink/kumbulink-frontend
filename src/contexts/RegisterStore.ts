import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface RegisterData {
  step1: {
    email: string
    password: string
  }
  step2: {
    fullName: string
    birthDate: Date | null
    country: string
    documentType: string
    documentNumber: string
    termsAccepted: boolean
  }
  step3: {
    phoneNumber: string
  }
  step4: {
    verificationCode: string
  }
}

type StepKey = keyof RegisterData

interface RegisterStore {
  currentStep: number
  formData: RegisterData
  setFormData: <T extends StepKey>(
    step: T,
    data: Partial<RegisterData[T]>
  ) => void
  nextStep: () => void
  prevStep: () => void
}

export const useRegisterStore = create<RegisterStore>()(
  devtools(
    persist(
      set => ({
        currentStep: 1,
        formData: {
          step1: {
            email: '',
            password: ''
          },
          step2: {
            fullName: '',
            birthDate: null,
            country: '',
            documentType: '',
            documentNumber: '',
            termsAccepted: false
          },
          step3: {
            phoneNumber: ''
          },
          step4: {
            verificationCode: ''
          }
        },
        setFormData: (step, data) =>
          set(state => ({
            formData: {
              ...state.formData,
              [step]: {
                ...state.formData[step],
                ...data
              }
            }
          })),
        nextStep: () => set(state => ({ currentStep: state.currentStep + 1 })),
        prevStep: () => set(state => ({ currentStep: state.currentStep - 1 }))
      }),
      {
        name: 'register-storage',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)
