import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Layout/SectionTitle";
import usePost from "../../../hooks/usePost";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyPosts = () => {
    const [posts,refetch]=usePost();
    const axiosSecure=useAxiosSecure();
    const handleDeletePost= post => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/myPosts/${post._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"

                            });
                        }
                    })
            }
        });
    }
    
    return (
        <div>
            <SectionTitle heading="My Posts"/>
            <div>
                <div className="overflow-x-auto max-w-6xl border-2 rounded-xl lg:ml-64">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-slate-200 text-lg">
                                <th></th>
                                <th>Title</th>
                                <th>Number of Votes</th>
                                <th className="text-center">Comment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map((post, idx) => <tr key={post}>
                                    <th>{idx}</th>
                                    <td>{post.postTitle}</td>
                                    <td>{post.upVote}</td>
                                    <td className="text-center"><Link to={`/comment/${encodeURIComponent(post.postTitle)}`}><button className="btn bg-green-400">View Comments</button></Link></td>

                                    <td>
                                        <button onClick={() => handleDeletePost(post)} className="btn btn-ghost bg-red-600"><FaTrashAlt className="text-white text-xl" /></button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyPosts;