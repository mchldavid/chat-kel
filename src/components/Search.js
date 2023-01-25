import React from "react"
import "./search.scss"
import { BiSearch } from "react-icons/bi"

const Search = () => {
  return (
    <div className="search card">
      <BiSearch /> <input type="text" placeholder="Search" />{" "}
    </div>
  )
}

export default Search
