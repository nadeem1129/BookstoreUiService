import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BooksPage from './pages/BooksPage';
import LoginPage from './pages/LoginPage';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
