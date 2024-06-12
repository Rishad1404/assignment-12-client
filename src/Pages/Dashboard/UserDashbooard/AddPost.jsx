import { useForm } from "react-hook-form";
import { IoCreateOutline } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import usePost from "../../../hooks/usePost";
import { Link } from "react-router-dom";
import { useRef } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddPost = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [post] = usePost();
    const modalRef = useRef();
    console.log(post);

    const onSubmit = async (data) => {

        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // Now send the menu item data to the server with menu url
            const postItem = {
                authorName: user.displayName,
                authorEmail: user.email,
                authorImage: user.photoURL,
                postTitle: data.title,
                postTag: data.tag,
                postDescription: data.description,
                postImage: res.data.data.display_url,
                postTime: new Date().toUTCString(),
                upVote: 0,
                downVote: 0,
                commentCount: {},

            }
            // 
            const postRes = await axiosSecure.post('/posts', postItem);
            console.log(postRes.data);
            if (postRes.data.insertedId) {
                // Show sucess Popup
                Swal.fire({
                    position: "center",
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

                    {post.length >= 5 ? (
                        <button type="button" onClick={() => modalRef.current.showModal()} className="btn bg-violet-500 text-white mt-10">Add Item <IoCreateOutline className="text-xl" /></button>
                    ) : (
                        <button type="submit" className="btn bg-violet-500 text-white mt-10">Add Item <IoCreateOutline className="text-xl" /></button>
                    )}
                </form>
            </div>
            <dialog ref={modalRef} id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-xl my-3 text-center">You have reached the maximum post limit for normal users.</h3>
                    <Link to='/membership'><button className="btn bg-violet-400 text-xl ml-32 text-white">Become a Member</button></Link>
                </div>
            </dialog>

        </div>
    );
};

export default AddPost;