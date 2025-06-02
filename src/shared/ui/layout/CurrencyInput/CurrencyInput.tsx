import { lazy, Suspense, useEffect, useRef, useState } from 'react'

import { useClickOutside } from '@/shared/hooks/useClickOutside'
import { formatCurrency, countries } from '@/shared/utils'

const Flag = lazy(() => import('react-world-flags'))

interface CurrencyInputProps {
  value: string
  onValueChange: (value: string) => void
  onCountryChange?: (locale: string) => void
}

export const CurrencyInput = ({
  value = '0',
  onValueChange,
  onCountryChange
}: CurrencyInputProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('')
  const [isCurrencyListOpen, setIsCurrencyListOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const selectedCountryData = countries.find(c => c.name === selectedCurrency)

  useEffect(() => {
    onCountryChange?.(selectedCountryData?.currency ?? 'AOA')
  }, [selectedCountryData])

  useClickOutside(dropdownRef, () => setIsCurrencyListOpen(false))

  const handleCurrencySelect = (countryName: string) => {
    setSelectedCurrency(countryName)
    setIsCurrencyListOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '')
    onValueChange(rawValue || '0')
  }

  const numericValue = parseInt(value || '0', 10)
  const formattedValue = formatCurrency(
    numericValue,
    selectedCountryData?.currency ?? 'AOA'
  )

  return (
    <div>
      <div className='flex items-center w-full rounded-md border border-gray-300 p-1 text-gray-600 appearance-none bg-white cursor-pointer pl-4'>
        <div className='relative flex items-center w-20' ref={dropdownRef}>
          <button
            type='button'
            className='flex items-center py-3 pr-8 pl-3 text-sm min-w-[120px]'
            onClick={() => setIsCurrencyListOpen(!isCurrencyListOpen)}
          >
            <Suspense fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}>
              <Flag
                code={selectedCountryData?.iso ?? 'AGO'}
                height={20}
                width={30}
                className='mr-2'
              />
            </Suspense>
            <span className='absolute right-2 pointer-events-none'>▼</span>
          </button>

          {isCurrencyListOpen && (
            <div className='absolute z-10 bg-white border border-gray-300 mt-1 -left-4 top-full w-27 max-h-60 overflow-auto shadow-md rounded-md'>
              {countries.map(country => (
                <button
                  key={country.iso}
                  onClick={() => handleCurrencySelect(country.name)}
                  className='flex items-center w-full px-3 py-2 hover:bg-gray-100 text-sm'
                >
                  <Suspense
                    fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}
                  >
                    <Flag
                      code={country?.iso}
                      height={20}
                      width={30}
                      className='mr-2'
                    />
                  </Suspense>
                  {country.currency}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className='w-px h-8 bg-gray-300 mx-2' />

        <input
          type='text'
          inputMode='numeric'
          value={formattedValue}
          onChange={handleInputChange}
          className='flex-1 p-3 text-right outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          placeholder='0,00'
        />
      </div>
      <span className='text-gray-400 text-xs'>
        {selectedCountryData?.currency ?? 'BRL'}
      </span>
    </div>
  )
}
