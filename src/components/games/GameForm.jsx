import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createGame } from '../../services/gameService'
import { getCategories } from '../../services/categoryService'

export const GameForm = () => {
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [game, setGame] = useState({
    title: '',
    description: '',
    designer: '',
    year_released: '',
    num_players: '',
    estimated_time: '',
    age_recommendation: '',
    category_id: ''
  })

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  const handleChange = (e) => {
    setGame({ ...game, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createGame(game).then(() => navigate('/games'))
  }

  return (
    <div className="flex justify-center p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
        <h1 className="text-2xl font-bold">Add a Game</h1>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={game.title}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={game.description}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          type="text"
          name="designer"
          placeholder="Designer"
          value={game.designer}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          type="number"
          name="year_released"
          placeholder="Year Released"
          value={game.year_released}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          type="number"
          name="num_players"
          placeholder="Number of Players"
          value={game.num_players}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          type="number"
          name="estimated_time"
          placeholder="Estimated Time (minutes)"
          value={game.estimated_time}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          type="number"
          name="age_recommendation"
          placeholder="Age Recommendation"
          value={game.age_recommendation}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <select
          name="category_id"
          value={game.category_id}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">
          Save Game
        </button>
      </form>
    </div>
  )
}
