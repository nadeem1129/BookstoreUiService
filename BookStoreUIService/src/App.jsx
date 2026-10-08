import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BooksPage from './pages/BooksPage'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BooksPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
