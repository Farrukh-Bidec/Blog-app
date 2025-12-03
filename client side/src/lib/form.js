import axios from "axios"

export const Login = async (email , password) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}login` ,
            {email , password} ,
            {withCredentials : true}

        )
        return response.data
    } catch (error) {
        console.log("Error : " + error)
        return error
    }
}
export const Signup = async (name, email, password) => {
    try {
        const response = await axios.post(`
            ${import.meta.env.VITE_BASE_URL}signup`,
             {name, email, password},
             { withCredentials : true}
            )
        return response.data
    } catch (error) {
        console.log("Error : " + error)
    }
}