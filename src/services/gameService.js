import { baseUrl } from "./serviceHelpers";
import { getAuthHeader } from "./serviceHelpers";

export const getGames = () => {
  return fetch(`${baseUrl}/games`, {
    headers: getAuthHeader()
  }).then(r => r.json())
}

export const getGame = (id) => {
  return fetch(`${baseUrl}/games/${id}`, {
    headers: getAuthHeader()
  }).then(r => r.json())
}

export const createGame = (game) => {
  return fetch(`${baseUrl}/games`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify(game)
  }).then(r => r.json())
}
