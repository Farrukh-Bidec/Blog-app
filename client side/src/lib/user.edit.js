import axios from "axios";

const editUser = async (userId, data) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}update/${userId}`, 
            {name :  data.name , bio : data.bio, password : data.password} ,
            { withCredentials: true }
        )
        console.log(data)
            return { success: true, message: response.data.message , data : response.data.user._doc }
    } catch (error) {
        throw { success: false, message: error.message , error }
    }
};          

export default editUser
