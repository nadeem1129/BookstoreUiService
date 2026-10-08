import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BooksPage from './pages/BooksPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import {AuthProvider} from './context/AuthContext';
import {CartProvider} from './context/CartContext';

function App() {
  
  return (
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>  
        <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      </CartProvider>
    </AuthProvider>
      
    </BrowserRouter>
  )
}

export default App
