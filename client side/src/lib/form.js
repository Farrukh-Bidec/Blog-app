import axios from "axios"

export const Login = async (email, password) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}login`,
            { email, password },
            { withCredentials: true }

        )
        return response.data
    } catch (error) {
        console.error("Catch : " + error)
        throw error
    }
}

export const Logout = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}logout`,
              {withCredentials: true }

        )
        return response.data
    } catch (error) {
        console.error("Catch : " + error)
        throw error
    }
}
export const Signup = async (name, email, password) => {
    try {
        const response = await axios.post(`
            ${import.meta.env.VITE_BASE_URL}signup`,
            { name, email, password },
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        console.error("Catch : " + error)
        throw error
    }
}