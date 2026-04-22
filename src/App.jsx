import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Authorized } from './components/Authorized.jsx'
import { Login } from './components/auth/Login.jsx'
import { Register } from './components/auth/Register.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<Authorized />}>
          <Route path='/games' element={<p>Game list coming in Step 6</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
