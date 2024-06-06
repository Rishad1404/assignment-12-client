import { CgProfile } from "react-icons/cg";
import logo from '../../public/logo.png'
import { BiSolidCalendarPlus } from "react-icons/bi";
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaList, FaPhone } from "react-icons/fa";

const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-96 min-h-screen bg-violet-300">
                <div className="flex items-center px-4 py-4">
                    <img src={logo} className="h-10 w-10 mr-2" alt="" />
                    <h2 className="lg:text-4xl font-bold p-1 text-violet-500">Topic Talk</h2>
                </div>
                <ul className="menu p-5">
                    <li className="text-lg"><NavLink to='myProfile'><CgProfile className="text-xl" />My Profile</NavLink></li>
                    <li className="text-lg"><NavLink to='addPost'><BiSolidCalendarPlus className="text-lg" />Add Post</NavLink></li>
                    <li className="text-lg"><NavLink to='myPosts'><FaList className="text-lg" />My Posts</NavLink></li>



                    {/* Shared nav Links */}
                    <div className="divider"></div>
                    <li className="text-lg">
                        <NavLink to='/'><FaHome />Home</NavLink>
                    </li>
                    <li className="text-lg">
                        <NavLink to='/order/contact'><FaPhone></FaPhone> Contact</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;