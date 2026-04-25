import { getAuthHeader, baseUrl } from "./serviceHelpers"

export const createReview = (review) => {
  return fetch(`${baseUrl}/reviews`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify(review)
  }).then(r => r.json())
}
