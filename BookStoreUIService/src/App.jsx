import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BooksPage from './pages/BooksPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import {AuthProvider} from './context/AuthContext';
import {CartProvider} from './context/CartContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import CartPage from './pages/CartPage';

function App() {
  
  return (
    <BrowserRouter>
    <AuthProvider>
      <CartProvider> 
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={
                <ProtectedRoute>
                <CartPage />
                </ProtectedRoute>
              }
              />
          </Routes>
        </main>
      </CartProvider>
    </AuthProvider>
      
    </BrowserRouter>
  )
}

export default App
