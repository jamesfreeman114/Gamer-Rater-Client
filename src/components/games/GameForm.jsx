import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createGame, getGame, updateGame } from '../../services/gameService'
import { getCategories } from '../../services/categoryService'

export const GameForm = () => {
  const navigate = useNavigate()
  const { gameId } = useParams()

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

  useEffect(() => {
    if (gameId) {
      getGame(gameId).then((data) => {
        setGame({
          title: data.title,
          description: data.description,
          designer: data.designer,
          year_released: data.year_released,
          num_players: data.num_players,
          estimated_time: data.estimated_time,
          age_recommendation: data.age_recommendation,
          category_id: data.category_id ?? ''
        })
      })
    }
  }, [gameId])

  const handleChange = (e) => {
    setGame({ ...game, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (gameId) {
      updateGame(gameId, game).then(() => navigate(`/games/${gameId}`))
    } else {
      createGame(game).then(() => navigate('/games'))
    }
  }

  return (
    <div className="flex justify-center p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
        <h1 className="text-2xl font-bold">{gameId ? 'Edit Game' : 'Add a Game'}</h1>

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
