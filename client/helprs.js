import axios from "axios"
export const refreshTokens = async (refreshToken) =>{
const result = await axios.post('http://localhost:3000/refresh-token',{refreshToken})
// localStorage.setItem('token',result.data)
console.log(result)
}