import axios from 'axios'

export async function getApiHealth() {
  const response = await axios.get('/api/health', { timeout: 5000 })

  if (!response.data.success || !response.data.message) {
    throw new Error('The API returned an invalid health response.')
  }

  return response.data
}