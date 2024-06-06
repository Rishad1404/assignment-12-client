import { useForm } from "react-hook-form";
import { IoCreateOutline } from "react-icons/io5";
const AddPost = () => {
    const { register, handleSubmit } = useForm()
    return (
        <div className="bg-violet-100 p-10 rounded-lg">
            <h2 className="text-6xl text-center font-bold text-violet-800">Add A post</h2>
            <div>
                <form onSubmit={handleSubmit}>
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
                                <option value="salad">JavaScript</option>
                                <option value="pizza">React</option>
                                <option value="soup">MongoDB</option>
                                <option value="dessert">Express JS</option>
                                <option value="drinks">Python</option>
                                <option value="drinks">NodeJS</option>
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