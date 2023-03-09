import React, { useState, useContext } from "react"
import "./search.scss"
import { BiSearch } from "react-icons/bi"
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore"

import { db } from "../firebase/initializeFirebase"
import { AuthContext } from "../context/AuthContext"
import debounce from "../hooks/useDebounce"

const Search = () => {
  const [searchText, setSearchText] = useState("")
  const [queryResults, setQueryResults] = useState(null)
  const { currentUser } = useContext(AuthContext)

  const updateDebounce = debounce(text => {
    handleSearch(text)
  })

  const handleSearch = async (text) => {
    const usersRef = collection(db, "users")

    // Create a query against the collection.
    const q = query(usersRef, where("displayName", "==", text))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      //filter the login user
      if (doc.data().uid !== currentUser.uid) setQueryResults(doc.data())
      else setQueryResults(null)
    })

    //if empty sets to null queryresults
    if (querySnapshot.empty) setQueryResults(null)
  }

  const handleSelectResult = async () => {
    // check whether the user chats with the current exists, if not create new one
    const combinedId =
      currentUser.uid > queryResults.uid
        ? currentUser.uid + queryResults.uid
        : queryResults.uid + currentUser.uid

    const res = await getDoc(doc(db, "chats", combinedId))

    if (!res.exists()) {
      //create a chats between selected user and current user
      await setDoc(doc(db, "chats", combinedId), { messages: [] })
      //create user chats
      await updateDoc(doc(db, "userFriends", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: queryResults.uid,
          displayName: queryResults.displayName,
          photoURL: queryResults.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      })
      await updateDoc(doc(db, "userFriends", queryResults.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      })
    }

    setQueryResults(null)
    setSearchText("")
  }

  // useEffect(() => {
  //   handleSearch(searchText)
  // }, [searchText])

  return (
    <div className="search card">
      <div className="search-container">
        <BiSearch />{" "}
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setSearchText(e.target.value)
            updateDebounce(e.target.value)
          }}
          value={searchText}
        />
      </div>

      <div className="results">
        <div className="title">Search for "{searchText}"</div>

        {/*query results from search */}
        {queryResults && (
          <div className="user" onClick={handleSelectResult}>
            <div className="profile-picture">
              <img src={queryResults.photoURL} alt="" />
            </div>
            <div className="user-info">
              <div className="username">{queryResults.displayName}</div>
              <div className="email">{queryResults.email}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
