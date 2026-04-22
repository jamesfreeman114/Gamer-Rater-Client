import { baseUrl, getAuthHeader } from "./serviceHelpers";

export const getCategories = () => {
  return fetch(`${baseUrl}/categories`, {
    headers: getAuthHeader()
  }).then(r => r.json())
}
