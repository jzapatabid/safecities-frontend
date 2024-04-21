import axios from 'axios'

const api = axios.create({
  baseURL: 'http://4.153.179.70:5000/'
})

export const useApi = () => ({
  validateToken: async (problemId: string) => {
    const response = await api.post(`/city/1/problem/${problemId}/cause`, {})
    return response.data
  }
})
