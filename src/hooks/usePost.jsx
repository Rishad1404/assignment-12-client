import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePost = () => {
    const axiosSecure=useAxiosSecure();
    const {user}=useAuth();

    const {refetch, data:post=[]}=useQuery({
        queryKey:['myPosts',user?.email],
        queryFn: async()=>{
            const res=await axiosSecure.get(`/myPosts?email=${user.email}`)
            return res.data;
        },

    })
    return [post,refetch]
};

export default usePost;