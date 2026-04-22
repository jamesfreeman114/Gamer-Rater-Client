import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Authorized } from './components/Authorized.jsx'
import { Login } from './components/auth/Login.jsx'
import { Register } from './components/auth/Register.jsx'
import { GameList } from './components/games/GameList.jsx'
import { GameForm } from './components/games/GameForm.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<Authorized />}>
          <Route path='/games' element={<GameList/>} />
          <Route path='/games/new' element={<GameForm/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
