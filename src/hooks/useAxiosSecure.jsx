import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure=axios.create({
    baseURL: 'http://localhost:5000',
})

const useAxiosSecure = () => {


    const navigate=useNavigate();
    const {logout}=useAuth()

 
    axiosSecure.interceptors.request.use(function(config){
        const token=localStorage.getItem('access-token')
        // console.log('requested stopped by interceptors',token)
        config.headers.authorization = `Bearer ${token}`
        return config
    },function(error) {
        return Promise.reject(error)
    })

    // Intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function(response){
        return response;
    },async (error)=> {
        const status=error.status;
        // console.log('Status error in the interceptor', status);
        if( status === 401 || status === 403){
            await logout();
            navigate('/login')
        }
        return Promise.reject(error);
    })




    return axiosSecure
};

export default useAxiosSecure;