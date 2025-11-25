import validator from 'validator'
import countries from './countries.json'

const customValidators = {
  isPassportNumber: (passport: string, countryCode: string) => {
    // validator doesn't support Angola passport number validation
    if (countryCode === 'AO') {
      // Angolan passport format: 2 letters followed by 7 digits
      return /^[A-Z]{1}\d{7}$/.test(passport.toUpperCase())
    }
    return validator.isPassportNumber(passport, countryCode)
  },
  isBrazilianIdNumber: (registry: string) => {
    return /(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/.test(registry)
  }
}

/**
 * Passaport Validation
 */
export const validatePassport = (
  passport: string,
  country: string
): boolean => {
  const countryCode = countries.find(c => c.name === country)?.passportLocale
  if (!countryCode) return false

  return customValidators.isPassportNumber(passport, countryCode)
}

export const validateAngolanID = (biNumber: string): boolean => {
  // Angolan ID format: 9 digits, 2 letters, 3 digits
  return /\d{9}[A-Za-z]{2}\d{3}$/.test(biNumber.toUpperCase())
}

/**
 * Brazilian ID Validation
 */
export const validateBrazilianID = (id: string): boolean => {
  return customValidators.isBrazilianIdNumber(id)
}

/**
 * Password Validation
 */
export interface PasswordValidation {
  minLength: boolean
  hasUpperCase: boolean
  hasNumber: boolean
  hasSpecial: boolean
}

export const validatePassword = (password: string): PasswordValidation => ({
  minLength: password.length >= 6,
  hasUpperCase: /[A-Z]/.test(password),
  hasNumber: /[0-9]/.test(password),
  hasSpecial: /[*!$&]/.test(password)
})

export const isPasswordValid = (validations: PasswordValidation): boolean =>
  Object.values(validations).every(Boolean)

/**
 * Email Validation
 */
export const validateEmail = (email: string): boolean =>
  validator.isEmail(email)

/**
 * Phone Validation
 */
export const validatePhone = (phone: string): boolean => {
  // Basic phone validation - can be enhanced based on your needs
  return /^\+?[\d\s-()]{10,}$/.test(phone)
}

/**
 * Name Validation
 */
export const validateFullName = (name: string): boolean => {
  const trimmedName = name.trim()
  return trimmedName.length >= 3 && trimmedName.includes(' ')
}

/**
 * Document Validation
 */
export const validateDocument = (
  documentNumber: string,
  documentType: string,
  country: string
): boolean => {
  if (country === 'Angola') {
    if (documentType === 'Passaporte') {
      return validatePassport(documentNumber, country)
    } else if (documentType === 'Bilhete de Identidade') {
      return validateAngolanID(documentNumber)
    }
  }
  return validatePassport(documentNumber, country)
}

/**
 * Currency/Amount Validation
 */
export const validateAmount = (amount: string): boolean => {
  const numericValue = amount.replace(/\D/g, '')
  return numericValue !== '' && parseInt(numericValue, 10) > 0
}

/**
 * Date Validation
 */
export const validateBirthDate = (date: Date | null): boolean => {
  if (!date) return false
  const today = new Date()
  return date < today
}
