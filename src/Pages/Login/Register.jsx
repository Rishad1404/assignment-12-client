import { useForm } from 'react-hook-form';
import logo from '../../../public/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from './SocialLogin';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async data => {
        let imageUrl = '';
        if (data.photo.length > 0) {
            const formData = new FormData();
            formData.append('image', data.photo[0]);
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            imageUrl = res.data.data.display_url;
        }

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, imageUrl)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: imageUrl,
                            badge: 'bronze',
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to database');
                                    toast.success('Registration Successful');
                                }
                                navigate('/');
                            })
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-20'>
                <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-base-200 rounded-lg shadow-lg lg:h-[800px]  lg:max-w-7xl '>
                    <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>
                        <div className='flex justify-center mx-auto'>
                            <img
                                className='w-auto h-7 sm:h-8'
                                src={logo}
                                alt=''
                            />
                        </div>

                        <p className='mt-3 text-xl text-center dark:text-blue '>
                            Get Your Free Account Now.
                        </p>

                        <SocialLogin />

                        <div className='flex items-center justify-between mt-4'>
                            <span className='w-1/5 border-b  lg:w-1/4'></span>

                            <div className='text-xs text-center text-gray-500 uppercase  hover:underline'>
                                or Registration with email
                            </div>

                            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mt-4 form-control'>
                                <label
                                    className='block mb-2 text-sm font-medium dark:text-blue '
                                    htmlFor='name'
                                >
                                    Username
                                </label>
                                <input
                                    id='name'
                                    {...register("name", { required: true })}
                                    autoComplete='name'
                                    name='name'
                                    className='block w-full px-4 py-4 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                    type='text'
                                    placeholder='user name'
                                />
                                {errors.name && <span className="text-red-600">Name is Required</span>}
                            </div>
                            <div className='mt-4 form-control'>
                                <label
                                    className='block mb-2 text-sm font-medium dark:text-blue'
                                    htmlFor='photo'
                                >
                                    Upload Photo
                                </label>
                                <input
                                    id='photo'
                                    {...register("photo", { required: false })}
                                    autoComplete='photo'
                                    name='photo'
                                    className='block w-full px-4 py-4 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                    type='file'
                                    placeholder='photo URL'
                                />
                            </div>
                            <div className='mt-4 form-control'>
                                <label
                                    className='block mb-2 text-sm font-medium dark:text-blue'
                                    htmlFor='LoggingEmailAddress'
                                >
                                    Email Address
                                </label>
                                <input
                                    id='LoggingEmailAddress'
                                    autoComplete='email'
                                    {...register("email", { required: true })}
                                    name='email'
                                    className='block w-full px-4 py-4 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                    type='email'
                                    placeholder='email'
                                />
                                {errors.email && <span className="text-red-600">Email is Required</span>}
                            </div>

                            <div className='mt-4 form-control'>
                                <div className="space-y-1">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium  dark:text-blue">Password</label>

                                    <div className=" dark:text-gray-600 relative">
                                        <input
                                            type="password"
                                            name="password"
                                            {...register("password", { required: true, minLength: 6, maxLength: 20 })}
                                            id="password"
                                            placeholder="Password"
                                            className="block w-full px-4 py-4 text-gray-700 bg-white border rounded-lg dark:text-gray-300 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" required />

                                    </div>
                                </div>


                            </div>
                            <div className='mt-6 form-control'>
                                <button
                                    type='submit'
                                    className='w-full px-6 py-5 text-lg font-bold tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
                                >
                                    Sign Up
                                </button>

                            </div>
                        </form>

                        <div className='flex items-center justify-between mt-4'>
                            <span className='w-1/5 border-b  md:w-1/4'></span>

                            <Link
                                to='/login'
                                className='text-xs text-gray-500 uppercase  hover:underline'
                            >
                                or sign in
                            </Link>

                            <span className='w-1/5 border-b  md:w-1/4'></span>
                        </div>
                    </div>
                    <div
                        className='hidden bg-cover bg-center lg:block lg:w-1/2'
                        style={{
                            backgroundImage: `url('https://i.imgur.com/AlS0Z6K.jpg')`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Register;
