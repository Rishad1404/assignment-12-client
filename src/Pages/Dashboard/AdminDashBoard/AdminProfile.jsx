import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AdminProfile = () => {

    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()

    const {data:stats=[]}=useQuery({
        queryKey:['admin-stats'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/admin-stats');
            return res.data
        }
    })

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="text-center mb-8">
                <h2 className="text-6xl font-bold text-gray-800">Admin Profile</h2>
            </div>
            <div className="flex items-center mb-8">
                <img src={user.photoURL} alt="Admin" className="rounded-full w-36 h-36 mr-6" />
                <div>
                    <h3 className="text-3xl font-semibold text-gray-700">{user.displayName}</h3>
                    <p className="text-lg text-gray-600">Email: {user.email}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-violet-100 shadow-md rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-gray-700">{stats.posts}</div>
                    <div className="text-lg text-gray-500">Posts</div>
                </div>
                <div className="bg-violet-100 shadow-md rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-gray-700">{stats.comments}</div>
                    <div className="text-lg text-gray-500">Comments</div>
                </div>
                <div className="bg-violet-100 shadow-md rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-gray-700">{stats.users}</div>
                    <div className="text-lg text-gray-500">Users</div>
                </div>
            </div>
            <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add Tags</h3>
                <form className="flex flex-col">
                    <input type="text" placeholder="Enter new tag" className="p-2 mb-4 border border-gray-300 rounded" />
                    <button type="submit" className="p-2 bg-violet-500 text-white rounded hover:bg-violet-400">Add Tag</button>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;
