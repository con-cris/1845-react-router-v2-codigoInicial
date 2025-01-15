import axios from 'axios'; //librería para hacer peticiones

export const api = axios.create({
    baseURL:"http://localhost:5000"
})

export const buscar = async (url, setData) => {
    const respuesta = await api.get(url)
    setData(respuesta.data)
}