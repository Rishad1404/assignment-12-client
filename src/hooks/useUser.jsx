
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUser = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure()
    const{ data:mainUser={}}= useQuery({
        queryKey: ['mainUser', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/mainUser?email=${user?.email}`);
            return response.data;
        },
    });
    return {mainUser}
};

export default useUser;