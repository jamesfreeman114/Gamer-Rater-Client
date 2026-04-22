export const baseUrl = 'http://localhost:8000'

export const getAuthHeader = () => ({
  Authorization: `Token ${localStorage.getItem('auth_token')}`,
  'Content-Type': 'application/json'
})
