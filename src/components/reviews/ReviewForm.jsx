import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { createReview } from "../../services/reviewService"

export const ReviewForm = () => {
    const { gameId } = useParams()
    const navigate = useNavigate()
    const [content, setContent] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        createReview({ game_id: gameId, content }).then(() => {
            navigate(`/games/${gameId}`)
        })
    }

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Write a Review</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <textarea
                    className="border rounded p-3 h-40 resize-none"
                    placeholder="Write your review here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Submit Review
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/games/${gameId}`)}
                        className="border px-4 py-2 rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
