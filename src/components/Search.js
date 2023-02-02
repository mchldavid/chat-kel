import React, { useEffect, useState, useContext } from "react"
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

const Search = () => {
  const [searchText, setSearchText] = useState("")
  const [queryResults, setQueryResults] = useState(null)
  const [err, setErr] = useState(false)
  const { currentUser } = useContext(AuthContext)

  const handleSearch = async (text) => {
    const usersRef = collection(db, "users")

    // Create a query against the collection.
    const q = query(usersRef, where("displayName", "==", text))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      setQueryResults(doc.data())
    })

    //if empty sets to null queryresults
    querySnapshot.empty && setQueryResults(null)
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
      await updateDoc(doc(db, "userFriends", currentUser.uid), {
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

  useEffect(() => {
    handleSearch(searchText)
  }, [searchText])

  return (
    <div className="search card">
      <div className="search-container">
        <BiSearch />{" "}
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
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
