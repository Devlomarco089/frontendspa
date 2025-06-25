import axios from "axios"

export const getServicios = () => {
    return axios.get("https://web-production-5825.up.railway.app/api/servicios/")
}