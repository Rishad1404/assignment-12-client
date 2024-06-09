import { useForm } from "react-hook-form";
import { IoCreateOutline } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddPost = () => {
    const { register, handleSubmit,reset } = useForm();
    const axiosSecure=useAxiosSecure();
    const axiosPublic=useAxiosPublic();
    const {user}=useAuth();

    const onSubmit =async (data) => {
        // image upload to imgbb and then get an url
        const imageFile={image:data.image[0]}
        const res=await axiosPublic.post(image_hosting_api,imageFile,{
            headers:{
                'content-type':'multipart/form-data'
            }
        });
        if(res.data.success){
            // Now send the menu item data to the server with menu url
            const postItem={
                authorName:user.displayName,
                authorEmail:user.email,
                authorImage:user.photoURL,
                postTitle:data.title,
                postTag:data.tag,
                postDescription:data.description,
                postImage:res.data.data.display_url,
                postTime: new Date().toUTCString(),
                upVote:0,
                downVote:0,
                commentCount:0,

            }
            // 
            const postRes=await axiosSecure.post('/posts',postItem);
            console.log(postRes.data);
            if(postRes.data.insertedId){
                // Show sucess Popup
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `SuccessFully added post`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  reset();
            }
        }


    }
    return (
        <div className="bg-violet-100 p-10 rounded-lg">
            <h2 className="text-6xl text-center font-bold text-violet-800">Add A post</h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full mt-10">
                        <label className="label">
                            <span className="label-text">Post Title</span>
                        </label>
                        <input type="text" placeholder="Post Title" {...register('title', { required: true })} className="input input-bordered w-full" />
                    </div>
                        {/* Tag */}
                        <div className="form-control w-full mt-5">
                            <label className="label">
                                <span className="label-text">Tag</span>
                            </label>
                            <select defaultValue='default' {...register('tag', { required: true })} className="select select-bordered w-full ">
                                <option disabled value='default' >Select a Tag</option>
                                <option value="javascript">JavaScript</option>
                                <option value="react">React</option>
                                <option value="mongodb">MongoDB</option>
                                <option value="express">Express JS</option>
                                <option value="python">Python</option>
                                <option value="nodejs">NodeJS</option>
                            </select>
                        </div>
                       

                    <label className="form-control mt-5">
                        <div className="label">
                            <span className="label-text">Post Description</span>
                        </div>
                        <textarea {...register('description')} className="textarea textarea-bordered h-24" placeholder="Post Description"></textarea>
                    </label>
                    <div className="mt-5">
                        <label className="label">
                                <span className="label-text">Post Image</span>
                            </label>
                        <input {...register('image', { required: true })} type="file" className="file-input file-input-bordered w-full" />
                    </div>

                    <button type="submit" className="btn bg-violet-500 text-white mt-10">Add IItem <IoCreateOutline className="text-xl"/></button>
                </form>
            </div>
        </div>
    );
};

export default AddPost;