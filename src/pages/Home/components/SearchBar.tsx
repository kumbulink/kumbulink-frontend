import { SearchIcon, FilterIcon } from '@shared/icons'

export const SearchBar = () => (
  <div className='relative'>
    <input
      type='text'
      placeholder='Digite o valor, moeda ou localidade'
      className='w-full bg-white rounded-lg py-3 px-10 shadow-sm'
    />
    <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
    <FilterIcon className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
  </div>
)
