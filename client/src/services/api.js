import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export async function getApiHealth() {
  const response = await axios.get(`${API_URL}/health`, {
    timeout: 5000,
  })

  if (!response.data.success || !response.data.message) {
    throw new Error('The API returned an invalid health response.')
  }

  return response.data
}