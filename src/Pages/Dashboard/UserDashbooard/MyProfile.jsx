
// import { useParams } from "react-router-dom";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

// import useAxiosPublic from "../../../hooks/useAxiosPublic";

const MyProfile = () => {

    const {user}=useAuth()

    // const {id}=useParams();
    // const axiosSecure=useAxiosSecure();

    // const {data:user={}}=useQuery({
    //     queryKey:['user',id],
    //     queryFn:async()=>{
    //         const {data}=await axiosSecure.get(`/user/${id}`)

    //         return data
    //     }
    // })
    // console.log(user)
    
    return (
        <div>
            <h2 className="text-6xl bg-violet-200 p-6 text-center font-bold mb-10"> My Profile</h2>
            <div className="flex justify-between gap-10">
                <div className="w-full">
                    <label className="text-lg font-bold">Name</label>
                    <div className="bg-slate-300 text-6xl px-5 py-20">{user.displayName}</div>
                </div>
                <div className="w-full">
                    <label className="text-lg font-bold">Email</label>
                    <div className="bg-slate-300 text-6xl px-5 py-20">{user.email}</div>
                </div>
                <div className="w-full">
                    <label className="text-lg font-bold">Badge</label>
                    <div className="bg-slate-300 text-6xl px-5 py-20">{user.badge}Bronze</div>
                    
                </div>
            </div>
        </div>
    );
};

export default MyProfile;