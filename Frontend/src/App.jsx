import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './App.css'

import Index from './pages/Index'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Category from './pages/Category'
import Product from './pages/Product'

function App() {
  const { user } = useAuthContext()

  document.title = "store"

  return (
    <>
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/home" 
              element={user ? <Home /> : <Navigate to="/" />} 
            />
            <Route 
              path="/sign-in" 
              element={!user ? <Login /> : <Navigate to={`/`} />} 
            />
            <Route 
              path="/sign-up" 
              element={!user ? <Signup /> : <Navigate to={`/`} />} 
            />
            <Route 
              path="/" 
              element={<Index />} 
            />
            <Route 
              path="/info" 
              element={<Index/>} 
            />
            <Route
              path='/product/:productId'
              element={<Product/>}
            />
            <Route
              path='/:type'
              element={<Category/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App