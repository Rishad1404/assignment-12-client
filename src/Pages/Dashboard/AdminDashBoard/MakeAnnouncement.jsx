import SectionTitle from "../../../Layout/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const MakeAnnouncement = () => {
    const { register, handleSubmit,reset} = useForm();
    const axiosPublic=useAxiosPublic();
    const axiosSecure=useAxiosSecure();

    const onSubmit =async (data) => {
        // image upload to imgbb and then get an url
        const imageFile={image:data.image[0]}
        const res=await axiosPublic.post(image_hosting_api,imageFile,{
            headers:{
                'content-type':'multipart/form-data'
            }
        });
        if(res.data.success){
            // Now send the announcement item data to the server with announcement url
            const announcementItem={
                authorImage:res.data.data.display_url,
                authorName:data.name,
                title:data.title,
                description:data.description,  
            }
            // 
            const announcementRes=await axiosSecure.post('/announcements',announcementItem);
            console.log(announcementRes.data);
            if(announcementRes.data.insertedId){
                // Show sucess Popup
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Announcement added Successfully`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  reset();
            }
        }
    }
    return (
        <div>
            <SectionTitle heading='Make Announcement' />
            <div className="bg-violet-100 p-10 rounded-lg">
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full mt-5">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Author Name</span>
                            </label>
                            <input type="text" placeholder="Author name" {...register('name', { required: true })} className="input input-bordered w-full" />
                        </div>
                        {/* Tag */}
                        <div className="form-control w-full mt-10">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Title</span>
                            </label>
                            <input type="text" placeholder="Title" {...register('', { required: true })} className="input input-bordered w-full" />
                        </div>
                        <div className="mt-5">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Post Image</span>
                            </label>
                            <input {...register('image', { required: true })} type="file" className="file-input file-input-bordered w-full" />
                        </div>

                        <label className="form-control mt-5">
                            <div className="label">
                                <span className="label-text text-lg font-semibold">Description</span>
                            </div>
                            <textarea {...register('description')} className="textarea textarea-bordered h-24" placeholder="Post Description"></textarea>
                        </label>
                        
                        <button type="submit" className="btn bg-violet-500 text-white w-full mt-10">Post Announcement</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MakeAnnouncement;