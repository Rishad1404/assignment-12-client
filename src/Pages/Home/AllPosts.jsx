import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Layout/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllPosts = () => {
    const axiosPublic=useAxiosPublic();
    const { data: posts = []} = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/posts');
            return res.data
        }

    

    })
    console.log(posts)
    

    return (
        <div>
            <SectionTitle heading='Posts'></SectionTitle>
            <h2>{posts.length}</h2>
        </div>
    );
};

export default AllPosts;