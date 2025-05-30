import { SearchIcon, FilterIcon } from '@/shared/ui'

interface SearchBarProps {
  onSearch: (value: string) => void
}

export const SearchBar = ({ onSearch }: SearchBarProps) => (
  <div className='relative'>
    <input
      type='text'
      placeholder='Digite o valor, moeda ou localidade'
      className='w-full bg-white border border-[#e0e0e0] rounded-md py-3 px-10 shadow-sm'
      onChange={e => onSearch(e.target.value)}
    />
    <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
    <FilterIcon className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
  </div>
)
