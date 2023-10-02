import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  isSearched: false,
  setIsSearched: () => {},
  setSearchInput: () => {},
})

export default SearchContext
