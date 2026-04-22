import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGames } from "../../services/gameService";

export const GameList = () => {

    const [games, setGames] = useState([])

    useEffect(()=>{
        getGames().then((allGames) => setGames(allGames))
    },[])

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Games</h1>
                <Link to="/games/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add a Game
                </Link>
            </div>

            <ul className="flex flex-col gap-3">
                {games.map((game) => (
                    <li key={game.id} className="border rounded p-4 hover:bg-gray-50">
                        <Link to={`/games/${game.id}`} className="text-blue-600 text-lg font-medium hover:underline">
                            {game.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )


}
