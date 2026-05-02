import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getGame } from "../../services/gameService"
import { createRating } from "../../services/ratingService"
import { createGamePicture } from "../../services/pictureService"

export const GameDetail = () => {
    const { id } = useParams()
    const [game, setGame] = useState(null)
    const currentUserId = parseInt(localStorage.getItem('user_id'))
    const [rating, setRating] = useState(0)
    const [pictureString, setPictureString] = useState('')
    const navigate = useNavigate()

    const createGameImageString = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            setPictureString(reader.result)
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        getGame(id).then((data) => setGame(data))
    }, [id])

    if (!game) return <p className="p-8">Loading...</p>

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <Link to="/games" className="text-blue-600 hover:underline text-sm">
                &larr; Back to Games
            </Link>

            <h1 className="text-3xl font-bold mt-4 mb-6">{game.title}</h1>

            <div className="flex flex-col gap-4">
                <div>
                    <span className="font-semibold">Description: </span>
                    <span>{game.description}</span>
                </div>
                <div>
                    <span className="font-semibold">Designer: </span>
                    <span>{game.designer}</span>
                </div>
                <div>
                    <span className="font-semibold">Year Released: </span>
                    <span>{game.year_released}</span>
                </div>
                <div>
                    <span className="font-semibold">Number of Players: </span>
                    <span>{game.num_players}</span>
                </div>
                <div>
                    <span className="font-semibold">Estimated Time: </span>
                    <span>{game.estimated_time} minutes</span>
                </div>
                <div>
                    <span className="font-semibold">Age Recommendation: </span>
                    <span>{game.age_recommendation}+</span>
                </div>
                <div>
                    <span className="font-semibold">Reviews: </span>
                    <div>
                        {game.reviews.map((review) => (
                            <p key={review.id}>{review.content}</p>
                        ))}
                    </div>
                </div>

                {game.pictures && game.pictures.length > 0 && (
                    <div>
                        <span className="font-semibold">Pictures: </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {game.pictures.map((pic) => (
                                <img
                                    key={pic.id}
                                    src={`http://localhost:8000${pic.action_pic}`}
                                    alt="Game action"
                                    className="w-40 h-40 object-cover rounded"
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div>
                    <span className="font-semibold">Average Rating: </span>
                    <span>{game.average_rating}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="border rounded px-2 py-1 w-20"
                    />
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={() => createRating({ game_id: id, rating: parseInt(rating) }).then(() => getGame(id).then(setGame))}
                    >Rate Game
                    </button>
                </div>

                <div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick= {()=>navigate(`/games/${id}/review`)}>Leave a Review
                    </button>
                </div>
                <div>

                    <input type="file" id="game_image" onChange={createGameImageString} />
                    <input type="hidden" name="game_id" value={game.id} />
                    <button
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                        onClick={() => {
                            if (!pictureString) return
                            createGamePicture({ game_id: id, image: pictureString })
                                .then(() => getGame(id).then(setGame))
                        }}
                    >Upload</button>
                </div>

                {game.user_id === currentUserId && (
                    <div>
                        <button
                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                            onClick={() => navigate(`/games/${id}/edit`)}
                        >
                            Edit Game
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}
