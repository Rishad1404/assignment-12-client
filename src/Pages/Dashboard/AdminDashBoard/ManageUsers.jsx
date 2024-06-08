import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Layout/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [],refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }

    })
    const handleMakeAdmin=user=>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res=>{
            console.log(res.data)
            if(res.data.modifiedCount>0){
                refetch()
                toast.success(`${user.name} is an admin now`)
            }
        })
    }

    const handleDeleteUser=user=>{
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
    return (
        <div>
            <SectionTitle heading='Manage Users'></SectionTitle>
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
                                <th>Role</th>
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
                                    <td>
                                        {user.role === 'admin' ? 'Admin' :
                                            <button onClick={() => handleMakeAdmin(user)} className="btn bg-orange-400"><FaUsers className="text-white text-2xl" /></button>}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost bg-red-600"><FaTrashAlt className="text-white text-xl" /></button>
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

export default ManageUsers;