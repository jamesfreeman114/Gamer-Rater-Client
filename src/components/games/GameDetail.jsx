import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getGame } from "../../services/gameService"


export const GameDetail = () => {
    const { id } = useParams()
    const [game, setGame] = useState(null)
    const navigate = useNavigate()

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
                <div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick= {()=>navigate(`/games/${id}/review`)}>Leave a Review

                    </button>
                    
                </div>

            </div>
        </div>
    )
}
