import axios from 'axios'

const api = axios.create({
  baseURL: 'https://safecities-backend.sndbx.run/'
})

export const useApi = () => ({
  validateToken: async (problemId: string) => {
    const response = await api.post(`/city/1/problem/${problemId}/cause`, {})
    return response.data
  }
})
