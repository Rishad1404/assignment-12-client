
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUser = (userId) => {
    const axiosSecure=useAxiosSecure()
    return useQuery({
        queryKey: ['user', userId],
        queryFn: async () => {
            const response = await axiosSecure.get(`/users/${userId}`);
            return response.data;
        },
        enabled: !!userId, 
    });
};

export default useUser;