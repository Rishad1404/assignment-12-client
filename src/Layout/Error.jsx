import { FaBackward, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

1
const Error = () => {
    return (
        <div>
            <div className="container px-6 mx-auto lg:flex lg:items-center lg:gap-12">


                <div className="relative">
                    <img className="max-h-screen" src="https://i.imgur.com/YwdWKjp.png" alt="" />
                    <div className="flex items-center gap-10 mt-10 absolute ">
                        <Link to='/' ><span className="flex items-center gap-2"><FaBackward></FaBackward> Go back</span></Link>
                        <Link to='/'><button className="w-1/2 px-8 py-4 text-lg flex items-center gap-3 tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                           <FaHome/> Take me home
                        </button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;