import { countries } from '@shared/utils'

export const useCountryInfo = (countryLabel: string) => {
  const match = countries.find(c => c.name === countryLabel)

  return {
    code: match?.iso ?? 'BR',
    currency: match?.currency ?? 'BRL',
    passportLocale: match?.passportLocale ?? 'BR',
    name: match?.name ?? 'Brasil',
    iso: match?.iso ?? 'BR'
  }
}
