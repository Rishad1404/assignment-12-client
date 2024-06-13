import { CgProfile } from "react-icons/cg";
import { BiSolidCalendarPlus } from "react-icons/bi";
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaList, FaPhone, FaAddressBook } from "react-icons/fa";
import { TfiAnnouncement } from "react-icons/tfi";
import useAuth from "../hooks/useAuth.jsx";
import useAdmin from "../hooks/useAdmin.jsx";

const Dashboard = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-96 min-h-screen bg-violet-300">
                <div className="px-6 py-10 md:px-14">
                    <img src={user.photoURL} className="h-24 w-24 md:h-56 md:w-56 rounded-full object-cover mx-auto md:mx-0" alt="" />
                    <h2 className="text-xl md:text-3xl font-bold p-1 text-violet-500 text-center md:text-left">Welcome, {user.displayName}</h2>
                </div>
                <ul className="menu p-5">
                    {isAdmin ? (
                        <>
                            <li className="text-lg"><NavLink to='/dashboard/adminProfile'><CgProfile className="text-xl" />Admin Profile</NavLink></li>
                            <li className="text-lg"><NavLink to='/dashboard/manageUsers'><FaAddressBook className="text-lg" />Manage Users</NavLink></li>
                            <li className="text-lg"><NavLink to='/dashboard/activities'><FaList className="text-lg" />Activities</NavLink></li>
                            <li className="text-lg"><NavLink to='/dashboard/makeAnnouncement'><TfiAnnouncement className="text-lg" />Make Announcement</NavLink></li>
                        </>
                    ) : (
                        <>
                            <li className="text-lg"><NavLink to='/dashboard/myProfile'><CgProfile className="text-xl" />My Profile</NavLink></li>
                            <li className="text-lg"><NavLink to='/dashboard/addPost'><BiSolidCalendarPlus className="text-lg" />Add Post</NavLink></li>
                            <li className="text-lg"><NavLink to='/dashboard/myPosts'><FaList className="text-lg" />My Posts</NavLink></li>
                        </>
                    )}

                    {/* Shared nav Links */}
                    <div className="divider"></div>
                    <li className="text-lg">
                        <NavLink to='/'><FaHome />Home</NavLink>
                    </li>
                    <li className="text-lg">
                        <NavLink to='/dashboard/contact'><FaPhone /> Contact</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-4 md:p-10">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
