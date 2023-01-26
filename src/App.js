import { useContext } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

//pages
import Register from "./pages/Register/"
import Login from "./pages/Login"
import Home from "./pages/Home/Home"
import { AuthContext } from "./context/AuthContext"

function App() {
  const { currentUser } = useContext(AuthContext)
  console.log()
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
