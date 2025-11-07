import { Search } from 'lucide-react'

const SearchBar = () => {
  return (
    <div className='hidden sm:flex items-center gap-2 shadow-md px-2 py-1 rounded-md ring-1 ring-gray-200'>
      <Search className='w-4 h-4 text-gray-500'/>
      <input id='search' placeholder='Search...' className='outline-0 text-sm'/>
    </div>
  )
}

export default SearchBar