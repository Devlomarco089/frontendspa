import axios from "axios"

export const getServicios = () => {
    return axios.get("http://localhost:8000/api/servicios/")
}