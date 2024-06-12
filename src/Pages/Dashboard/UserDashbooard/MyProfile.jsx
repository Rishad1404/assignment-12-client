import usePost from "../../../hooks/usePost";
import useUser from "../../../hooks/useUser";
import { SlBadge } from "react-icons/sl";

const MyProfile = () => {

    const { mainUser } = useUser()
    const user = mainUser[0];
    const [posts] = usePost()
    const recentPosts = posts.slice(0, 3);

    return (
        <div className="max-w-9xl mx-auto p-8 bg-violet-100 shadow-lg rounded-lg">
            <h2 className="text-4xl text-center font-bold mb-8">My Profile</h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-48 h-48 rounded-full overflow-hidden shadow-md">
                    <img src={user.photo} alt={`${user.name}'s profile`} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                    <div className="mb-6">
                        <label className="block text-lg font-bold mb-2">Name</label>
                        <div className="bg-gray-50 text-2xl p-4 rounded">{user.name}</div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-bold mb-2">Email</label>
                        <div className="bg-gray-50 text-2xl p-4 rounded">{user.email}</div>
                    </div>
                    <div>
                        <label className="block text-lg font-bold mb-2">Badge</label>
                        <div className="bg-gray-50 text-2xl p-4 rounded flex items-center">
                            {user.badge === 'bronze' && <SlBadge className="text-slate-400 font-bold text-4xl" />}
                            {user.badge === 'gold' && <SlBadge className="text-yellow-600 font-bold text-4xl" />}
                            <span className="ml-4">{user.badge.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-3xl font-bold mb-6 text-center my-10">Recent Posts</h3>
                <div className="space-y-6">
                    {recentPosts.map((post, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-start gap-4">
                            <div className="flex-1">
                                <h4 className="text-2xl font-bold mb-2">{post.postTitle}</h4>
                                <p className="text-gray-700 mb-2">{post.postDescription}</p>
                                <span className="text-gray-500 text-xs font-bold">{post.postTime}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;