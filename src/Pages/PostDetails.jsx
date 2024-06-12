import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { SlLike, SlDislike } from "react-icons/sl";
import { useForm } from "react-hook-form";
import { IoMdArrowBack } from "react-icons/io";
import { BiComment } from "react-icons/bi";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import ShareModal from '../Pages/Shared/ShareModal';
import toast from 'react-hot-toast';

const PostDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: post = {}, isLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/post/${id}`);
            return res.data;
        }
    });

    const shareUrl = `${window.location.origin}/post/${id}`;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const { data: comments = [], refetch } = useQuery({
        queryKey: ['comments', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/comments?postId=${id}`);
            return res.data;
        },
        enabled: !!post._id // Ensure the query is enabled only when post._id is available
    });

    const onSubmit = async (data) => {
        const commentItem = {
            email: user?.email,
            commenter: user?.displayName,
            commenterImage: user?.photoURL,
            postId: post._id,
            comment: data.comment,
        };

        try {
            const response = await axiosPublic.post('/comments', commentItem);
            if (response.data.insertedId) {
                toast.success('Comment Added');
                reset();
                refetch();
            }
        } catch (error) {
            console.error("Error posting comment:", error);
            toast.error('Failed to add comment');
        }
    };

    if (isLoading) return <span className="loading loading-bars loading-lg lg:mt-[500px] lg:ml-[1000px]"></span>;

    return (
        <div className="container mx-auto my-20">
            <div className="flex flex-col p-6 space-y-6 overflow-hidden rounded-lg shadow-lg dark:bg-gray-50 dark:text-gray-800">
                <div className="flex space-x-4">
                    <img alt="" src={post.authorImage} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                    <div className="flex flex-col space-y-1">
                        <a rel="noopener noreferrer" href="#" className="text-xl font-bold">{post.authorName}</a>
                        <span className="text-xs dark:text-gray-600 font-bold">{post.postTime}</span>
                    </div>
                </div>
                <div>
                    <img src={post.postImage} alt="" className="w-full object-cover mb-4 lg:h-[600px] sm:h-96 dark:bg-gray-500" />
                    <div className="flex justify-between items-center my-5">
                        <h2 className="mb-1 text-2xl lg:text-5xl font-semibold">{post.postTitle}</h2>
                        <h2 className="bg-violet-200 px-4 py-3 text-xl rounded-full text-violet-900"># {post.postTag}</h2>
                    </div>
                    <p className="text-lg dark:text-gray-600">{post.postDescription}</p>
                </div>
                <div className="flex flex-wrap justify-between">
                    <div className="space-x-1 flex items-center">
                        <button onClick={openModal} aria-label="Share this post" type="button" className="p-2 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 fill-current dark:text-violet-600">
                                <path d="M404,344a75.9,75.9,0,0,0-60.208,29.7L179.869,280.664a75.693,75.693,0,0,0,0-49.328L343.792,138.3a75.937,75.937,0,1,0-13.776-28.976L163.3,203.946a76,76,0,1,0,0,104.108l166.717,94.623A75.991,75.991,0,1,0,404,344Zm0-296a44,44,0,1,1-44,44A44.049,44.049,0,0,1,404,48ZM108,300a44,44,0,1,1,44-44A44.049,44.049,0,0,1,108,300ZM404,464a44,44,0,1,1,44-44A44.049,44.049,0,0,1,404,464Z"></path>
                            </svg>
                        </button>
                        <button aria-label="Bookmark this post" type="button" className="p-2 flex">
                            <Link to='/' className="bg-violet-500 text-white px-3 py-2 rounded-xl flex items-center gap-2 font-bold"><IoMdArrowBack className="text-xl" />Go Back</Link>
                        </button>
                    </div>
                    <div className="flex items-center space-x-2 text-sm dark:text-gray-600">
                        <button type="button" className="flex items-center p-1 space-x-1 text-lg ">
                            <BiComment className="text-2xl" />
                        </button>
                        <button type="button" className="flex items-center p-1 space-x-1 text-xl">
                            <SlLike className="" />
                            <span>{post.upVote}</span>
                        </button>
                        <button type="button" className="flex items-center p-1 space-x-1 text-xl">
                            <SlDislike />
                            <span>{post.downVote}</span>
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen && <ShareModal shareUrl={shareUrl} onClose={closeModal} />}
            {user ? (
                <div className="mt-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <textarea {...register('comment')} placeholder="Comment Here" className="textarea textarea-bordered textarea-lg w-full max-w-full" ></textarea>
                        <button type="submit" className="btn bg-violet-300 w-full text-lg font-bold">Comment</button>
                    </form>
                    <h2 className="text-4xl font-bold mt-10">Comments ({comments.length})</h2>
                    <hr className="mt-5" />
                    <div className="mt-10 space-y-6">
                        {comments.map((comment, index) => (
                            <div key={index} className="flex space-x-4 p-4 border rounded-lg shadow-sm">
                                <img src={comment.commenterImage} alt="User" className="w-12 h-12 rounded-full shadow-md" />
                                <div className="flex flex-col">
                                    <p className="font-bold text-violet-900">{comment.commenter}</p>
                                    <p className="text-gray-700 text-xl">{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center mt-10">
                    <h2 className="text-xl font-bold text-violet-800">Comments are turned off. Login to comment on the post. <Link to='/login' className="underline text-violet-600">Login Now</Link></h2>
                </div>
            )}
        </div>
    );
};

export default PostDetails;
