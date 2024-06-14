import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import { TbMessageReport } from "react-icons/tb";
import { MdErrorOutline } from "react-icons/md";

const CommentsPage = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [feedback, setFeedback] = useState({});
    const [reportDisabled, setReportDisabled] = useState(true);
    const [selectedComment, setSelectedComment] = useState(null);

    const { data: postData, isLoading: postLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/comment/${id}`);
            return res.data;
        }
    });

    const handleFeedbackChange = (commentId, value) => {
        setFeedback(prev => ({ ...prev, [commentId]: value }));
        setReportDisabled(!value); 
    };

    const handleReport = async (commentId) => {
        const selectedFeedback = feedback[commentId];
        const commentText = comments.find(comment => comment._id === commentId).comment;
            await axiosPublic.post('/reports', {
                commentId,
                comment:commentText,
                feedback: selectedFeedback,
                reportedBy: user?.email,
            });
            toast.success('Comment reported');
            setReportDisabled(true);
        
    };

    const handleReadMore = (comment) => {
        setSelectedComment(comment);
    };

    const handleCloseModal = () => {
        setSelectedComment(null);
    };

    if (postLoading) return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>;

    const { post, comments } = postData;

    return (
        <div className="container mx-auto my-10">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-4xl font-bold mb-4 text-gray-800 text-center ">{post.postTitle}</h3>
                <h3 className="text-sm font-bold mb-4 text-gray-800 text-center ">{post.postTime}</h3>
            </div>

            <h2 className="text-4xl font-bold mb-8 text-violet-800 bg-violet-100 p-5 text-center">Comments</h2>
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-violet-500 text-white">
                        <tr>
                            <th className="py-3 px-4 text-center">Email</th>
                            <th className="py-3 px-4 text-center">Comment</th>
                            <th className="py-3 px-4 text-center">Feedback</th>
                            <th className="py-3 px-4 text-center">Report</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {comments.map(comment => (
                            <tr key={comment._id} className="bg-white">
                                <td className="py-4 px-6 whitespace-nowrap text-center">{comment.email}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-center">
                                    {comment.comment.length > 20 ? (
                                        <>
                                            {comment.comment.slice(0, 20)}...
                                            <button
                                                onClick={() => handleReadMore(comment)}
                                                className="text-violet-500 hover:underline ml-1 font-bold"
                                            >
                                                Read More
                                            </button>
                                        </>
                                    ) : (
                                        comment.comment
                                    )}
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-center">
                                    <select
                                        value={feedback[comment._id] || ''}
                                        onChange={(e) => handleFeedbackChange(comment._id, e.target.value)}
                                        className="border p-2 focus:outline-none font-bold"
                                    >
                                        <option value="">Select Feedback</option>
                                        <option value="Inappropriate Content">Inappropriate</option>
                                        <option value="Spam">Spam</option>
                                        <option value="Harassment">Harassment</option>
                                    </select>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-center">
                                    <button
                                        onClick={() => handleReport(comment._id)}
                                        disabled={reportDisabled}
                                        className={`px-3 py-1 rounded text-white ${reportDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 focus:outline-none'}`}
                                    >
                                        {reportDisabled ? <MdErrorOutline className="inline-block mr-1 text-lg" /> : <TbMessageReport className="inline-block mr-1 text-lg" />}
                                        Report
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedComment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-700">{selectedComment.comment}</p>
                        <button
                            onClick={handleCloseModal}
                            className="mt-4 px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentsPage;
