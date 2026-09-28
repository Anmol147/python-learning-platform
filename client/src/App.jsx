import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ProblemList from './components/ProblemList.jsx'
import ProblemSolver from './pages/ProblemSolver.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/problems" element={<ProblemList />} />

        <Route
          path="/problems/:slug"
          element={<ProblemSolver />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App