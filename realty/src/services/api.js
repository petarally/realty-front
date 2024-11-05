import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
})

export const fetchHome = async (lang) => {
  try {
    const response = await api.get(`/${lang}`)
    return response.data
  } catch (error) {
    console.error('Error fetching home data:', error)
    throw error
  }
}
