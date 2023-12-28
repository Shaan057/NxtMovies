import React from 'react'

const Context = React.createContext({
  searchInput: '',
  searchedInput: '',
  userData: {},
  searchedButtonClicked: false,
  searchButtonClicked: false,
  accountButtonClicked: false,
  setSearchInput: () => {},
  setSearchedButtonClicked: () => {},
  onAccountButtonClicked: () => {},
  setUserData: () => {},
})

export default Context
