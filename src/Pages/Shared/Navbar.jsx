import { FaRegBell } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import logo from '../../../public/logo.png'
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { AiOutlineDashboard } from "react-icons/ai";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const [isClicked, setIsClicked] = useState(false);
    const axiosPublic = useAxiosPublic();

    const { data: announcements = [] } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/announcements`);
            return res.data
        }
    })
    const handleClick = () => {
        setIsClicked(true);
    };

    const handleLogout = () => {
        logout()
            .then(() => {
                toast.success('Logged Out');

            })
            .catch(() => {
                toast.error("Unsuccessful");
            });
    }
    const navLinks = (
        <>
            <li><NavLink className={({ isActive }) => isActive ? 'text-violet-600 text-lg font-bold border-b-2 rounded-none bg-violet-200 border-violet-600 ' : 'text-lg font-bold'} to='/'>Home</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? 'text-violet-600 text-lg font-bold border-b-2 rounded-none bg-violet-200 border-violet-600 ' : 'text-lg font-bold'} to='/membership'>Membership</NavLink></li>
        </>
    )

    return (
        <div className="container mx-auto">
            <div className="navbar lg:fixed container z-10 opacity-80">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <img src={logo} className="h-10 w-10 mr-2" alt="" />
                    <h2 className="lg:text-4xl font-bold p-1 text-violet-500">Topic Talk</h2>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>


                <div className="navbar-end">
                    {
                        user ? <></> :
                            <div className="lg:mx-4">
                                <Link to='/login'><button className="btn border-none bg-violet-600 text-white font-bold px-3">Join Now</button></Link>
                            </div>
                    }

                    {/* Profile */}
                    {user ?
                        <div className="flex items-center ">
                            <div className="dropdown dropdown-bottom dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="relative mr-4 flex items-center"
                                    onClick={handleClick}
                                >
                                    <div className="relative">
                                        <FaRegBell className="text-2xl" />
                                        <span className={`absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ${isClicked ? 'hidden' : ''}`}>
                                            {announcements.length}
                                        </span>
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow rounded-box w-80 bg-violet-200">
                                    {announcements.map(announcement => (
                                        <li key={announcement._id} className="border-b-2 border-black">
                                            <h2 className="text-lg">{announcement.title}</h2>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        {user && user.photoURL ? (
                                            <img type="button" className="w-full h-full object-cover" src={user?.photoURL} referrerPolicy='no-referrer' alt="Profile" />
                                        ) : (
                                            <CgProfile className="lg:w-full lg:h-full object-cover" />
                                        )}

                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 -z-[2] p-2 shadow bg-violet-300 rounded-box w-52">
                                    {
                                        user && user.displayName ? <li className="disabled"><a className="text-lg"><CgProfile /> {user.displayName}</a></li> : <li className="disabled"><a className="text-lg"><CgProfile /> Name</a></li>
                                    }
                                    <Link to='/dashboard/myProfile' className="flex items-center"><AiOutlineDashboard className="text-lg ml-3 " /><li className="text-lg px-3"> Dashboard</li></Link>
                                    <li><button onClick={handleLogout} className="text-lg"><MdOutlineLogout /> Logout</button></li>
                                </ul>
                            </div>
                        </div> : <></>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;