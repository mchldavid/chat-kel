import { useContext } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

//pages
import Register from "./pages/Register/"
import Login from "./pages/Login"
import Home from "./pages/Home/Home"
import { AuthContext } from "./context/AuthContext"

function App() {
  const { currentUser } = useContext(AuthContext)

  //protected route to prevent an unauthorized user
  const AuthenticatedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return children
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <AuthenticatedRoute>
                <Home />
              </AuthenticatedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
