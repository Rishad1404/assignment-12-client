import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../public/logo.png'
import toast from 'react-hot-toast';
import { useContext, } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import SocialLogin from './SocialLogin';
const Login = () => {
    const { signIn,user,loading } = useContext(AuthContext)
    const navigate = useNavigate();
    const location=useLocation();

    const from=location.state?.from?.pathname || '/'


    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        const email = form.get('email')
        const password = form.get('password')
        console.log(email, password)

        signIn(email, password)
            .then(result => {
                console.log(result.user)
                toast.success('Login Successful')
                navigate(from,{replace:true});
            })
            .catch(error => {
                toast.error("Incorrect Information")
                console.log(error)
            })
    }
    if(user||loading) return
    return (
        <div>
            <div className="container mx-auto mb-20 my-20">
                <div className='flex justify-center items-center'>
                    <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-base-200 rounded-lg shadow-lg lg:h-[600px] lg:max-w-7xl'>
                        <div
                            className='hidden bg-cover bg-center lg:block lg:w-1/2'
                            style={{
                                backgroundImage: `url('https://i.imgur.com/AlS0Z6K.jpg')`,
                            }}
                        ></div>

                        <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>
                            <div className='flex justify-center mx-auto'>
                                <img
                                    className='w-auto h-7 sm:h-8'
                                    src={logo}
                                    alt=''
                                />
                            </div>

                            <p className='mt-3 text-xl text-center dark:text-blue '>
                                Welcome back!
                            </p>

                           <SocialLogin/>

                            <div className='flex items-center justify-between mt-4'>
                                <span className='w-1/5 border-b  lg:w-1/4'></span>

                                <div className='text-xs text-center text-gray-00 uppercase  hover:underline'>
                                    or login with email
                                </div>

                                <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
                            </div>
                            <form onSubmit={handleLogin}>
                                <div className='mt-4'>
                                    <label
                                        className='block mb-2 text-sm font-medium text-gray-600 '
                                        htmlFor='LoggingEmailAddress'
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id='LoggingEmailAddress'
                                        autoComplete='email'
                                        name='email'
                                        placeholder="Email"
                                        className='block w-full px-4 py-4 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                        type='email'
                                    />
                                </div>

                                <div className='mt-4'>
                                    <div className="space-y-1">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium  dark:text-gray-600">Password</label>

                                        <div className=" dark:text-gray-600 relative">
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Password"
                                                className="block w-full px-4 py-4 text-gray-700 bg-white border rounded-lg dark:text-gray-300 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" required />
                                            
                                        </div>
                                    </div>


                                </div>
                                <div className='mt-6'>
                                    <button
                                        type='submit'
                                        className='w-full px-6 py-4 text-lg font-bold tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </form>

                            <div className='flex items-center justify-between mt-4'>
                                <span className='w-1/5 border-b  md:w-1/4'></span>

                                <Link
                                    to='/registration'
                                    className='text-xs font-bold text-gray-500 uppercase  hover:underline'
                                >
                                    or sign up
                                </Link>

                                <span className='w-1/5 border-b  md:w-1/4'></span>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;