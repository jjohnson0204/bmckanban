import React, { useEffect } from "react"

import SearchIcon from "../Assets/search.png"
import { useAppDispatch, useAppSelector } from "../Hooks/useRedux"
import {
  clearFilters,
  filterCards,
  setSearchText
} from "./Card"
import { Container } from "../CSS/SearchSytle"

const SearchInput = () => {
  const { searchText } = useAppSelector(state => state.cards)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (searchText.length === 0) {
      dispatch(clearFilters())
      return
    } else {
      dispatch(filterCards({}))
    }
  }, [searchText])

  return (
    <Container>
      <input
        type="search"
        placeholder="Search for cards titles..."
        value={searchText}
        onChange={e => dispatch(setSearchText(e.target.value))}
      />
      <img src={SearchIcon} alt="Search icon" />
    </Container>
  )
}

export default SearchInput