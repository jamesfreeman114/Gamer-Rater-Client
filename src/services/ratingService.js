import { getAuthHeader, baseUrl } from "./serviceHelpers"

export const createRating = (rating) => {
  return fetch(`${baseUrl}/ratings`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify(rating)
  }).then(r => r.json())
}
