import { lazy, Suspense, useState, useRef } from 'react'
import { useClickOutside } from '@shared/hooks/useClickOutside'

import countries from '@shared/utils/countries.json'

const Flag = lazy(() => import('react-world-flags'))

interface CountrySelectorProps {
  handleSelect: (countryName: string) => void
}

export const CountrySelector = ({ handleSelect }: CountrySelectorProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [isCountryListOpen, setIsCountryListOpen] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleCountryInputClick = () => {
    setIsCountryListOpen(true)
    inputRef.current?.focus()
  }

  const handleCountrySelect = (countryName: string) => {
    setSelectedCountry(countryName)
    handleSelect(countryName)
    setIsCountryListOpen(false)
  }

  useClickOutside(dropdownRef, () => setIsCountryListOpen(false))

  const selectedCountryData = countries.find(c => c.name === selectedCountry)

  return (
    <div className='relative flex items-center'>
      {selectedCountry && (
        <div className='absolute left-4 z-10 flex items-center pointer-events-none'>
          <Suspense fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}>
            <Flag
              code={selectedCountryData?.iso}
              height={20}
              width={30}
              className='mr-2'
            />
          </Suspense>
        </div>
      )}
      <input
        ref={inputRef}
        type='text'
        value={selectedCountry}
        onClick={handleCountryInputClick}
        readOnly
        placeholder='Selecione o país'
        className={`w-full rounded-lg border border-gray-300 p-4 text-gray-600 appearance-none bg-white cursor-pointer ${
          selectedCountry ? 'pl-16' : 'pl-4'
        }`}
      />
      <span className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
        ▼
      </span>

      {isCountryListOpen && (
        <div
          ref={dropdownRef}
          className='absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg'
        >
          {countries.map(country => (
            <button
              key={country.name}
              onClick={() => handleCountrySelect(country.name)}
              className='flex w-full items-center p-4 hover:bg-gray-100'
            >
              <Suspense fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}>
                <Flag
                  code={country.iso}
                  height={20}
                  width={30}
                  className='mr-2'
                />
              </Suspense>
              <span>{country.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
