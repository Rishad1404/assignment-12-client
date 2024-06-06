import { FaRegBell } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import logo from '../../../public/logo.png'
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
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


                {/* Notification */}

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
                            <button className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <FaRegBell className="text-2xl"></FaRegBell>
                                </div>
                            </button>
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
                                        user && user.displayName ? <li className="disabled"><a className="text-lg">{user.displayName}</a></li> : <li className="disabled"><a className="text-lg">Name</a></li>
                                    }
                                    <Link to='/dashboard/myProfile'><li className="text-lg px-3">Dashboard</li></Link>
                                    <li><button onClick={handleLogout} className="text-lg">Logout</button></li>
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