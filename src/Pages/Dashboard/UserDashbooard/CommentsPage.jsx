import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CommentsPage = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: post = {} } = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/post/${id}`);
            return res.data;
        }
    });

    console.log('Post ID:', id); // Log the post ID to verify it's correct
    console.log('Post Data:', post); // Log the post data to verify the query result

    return (
        <div>
            <h2>Comments for Post {post.length}</h2>
            {/* Add comments table and other functionalities here */}
        </div>
    );
};

export default CommentsPage;
