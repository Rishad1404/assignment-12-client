import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://topic-talk-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;