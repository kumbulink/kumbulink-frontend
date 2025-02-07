import { create } from 'zustand';

interface RegisterStore {
  currentStep: number;
  formData: {
    step1: { field1: string; field2: string };
    step2: { field1: string; field2: string };
    step3: { field1: string; field2: string };
    step4: { field1: string; field2: string };
  };
  nextStep: () => void;
  prevStep: () => void;
  resetSteps: () => void;
  updateStepData: (step: number, data: unknown) => void;
}

export const useRegisterStore = create<RegisterStore>((set) => ({
  currentStep: 1,
  formData: {
    step1: { field1: '', field2: '' },
    step2: { field1: '', field2: '' },
    step3: { field1: '', field2: '' },
    step4: { field1: '', field2: '' },
  },
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
  resetSteps: () => set({ currentStep: 1 }),
  updateStepData: (step, data) => {
    set((state) => {
      const updatedData = { ...state.formData, [`step${step}`]: data };
      return { formData: updatedData };
    });
  }
}));
