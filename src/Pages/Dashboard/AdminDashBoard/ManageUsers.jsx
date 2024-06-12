import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Layout/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('')
    const { count } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0);
    const itemPerPage = 10;
    const numberOfPages = Math.ceil(count / itemPerPage);

    const pages = [...Array(numberOfPages).keys()];

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${currentPage}&size=${itemPerPage}&search=${search}`);
            return res.data
        }

    })
    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    toast.success(`${user.name} is an admin now`)
                }
            })
    }

    const handleSearch = e => {
        e.preventDefault();
        const text = e.target.search.value;
        setSearch(text)
    }

    const handleDeleteUser = user => {
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

                axiosSecure.delete(`/users/${user._id}`)
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

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }
    return (
        <div>
            <SectionTitle heading='Manage Users'></SectionTitle>
            <div className="text-center my-5">
                <div className=" max-w-xs lg:ml-[40%]">
                    <form onSubmit={handleSearch}>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" name="search" className="grow" placeholder="Search" />
                            <FaMagnifyingGlass className="text-black" />
                        </label>
                        <button type="submit" className="btn bg-violet-600 text-lg mt-2 text-white px-5"><FaMagnifyingGlass /> Search User</button>
                    </form>
                </div>
            </div>
            <div>
                <div className="overflow-x-auto max-w-6xl border-2 rounded-xl lg:ml-64">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-slate-200 text-lg">
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Badge</th>
                                <th className="text-center">Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, idx) => <tr key={user}>
                                    <th>{idx}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.badge === 'bronze' ? (
                                        <span>Bronze</span>
                                    ) : user.badge === 'gold' ? (
                                        <span>Gold</span>
                                    ) : (
                                        <></>
                                    )}</td>
                                    <td className="text-center">
                                        {user.role === 'admin' ? <p className="text-xl font-bold">Admin</p> :
                                            <button onClick={() => handleMakeAdmin(user)} className="btn bg-violet-500 text-white">Make Admin</button>}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost bg-red-600"><FaTrashAlt className="text-white text-xl" /></button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="pagination my-10">
                    <button onClick={handlePreviousPage} className="btn">Previous</button>
                    {
                        pages.map(page => <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            type="button" title="Page 1" className={currentPage === page ? 'selected' : undefined}>{page}</button>)
                    }
                    <button onClick={handleNextPage} className="btn">Next</button>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;