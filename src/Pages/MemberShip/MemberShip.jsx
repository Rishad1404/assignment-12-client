import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from "./CheckOutForm";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const MemberShip = () => {
    const { user } = useAuth();
    const handleFreePlan = () => {
        Swal.fire({
            position: "center",
            icon: "info",
            title: "You are already a Bronze Member",
            showConfirmButton: false,
            timer: 1500
        });
    }

    return (
        <div>
            <div className=" w-full h-full">
                <div className=" hidden w-full bg-gray-50 h-20 lg:block" />
                <div className=" px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                            <span className=" inline-block">
                                <svg
                                    viewBox="0 0 52 24"
                                    fill="currentColor"
                                    className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-gray-400 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                                >
                                    <defs>
                                        <pattern
                                            id="2c67e949-4a23-49f7-bf27-ca140852cf21"
                                            x="0"
                                            y="0"
                                            width=".135"
                                            height=".30"
                                        >
                                            <circle cx="1" cy="1" r=".7" />
                                        </pattern>
                                    </defs>
                                    <rect
                                        fill="url(#2c67e949-4a23-49f7-bf27-ca140852cf21)"
                                        width="52"
                                        height="24"
                                    />
                                </svg>
                                <span className="relative">Affordable</span>
                            </span>{' '}
                            for everyone
                        </h2>
                        <p className="text-base text-gray-700 md:text-lg">
                            Be a gold badged member of our website
                        </p>
                    </div>
                    <div className="grid max-w-screen-md gap-10 md:grid-cols-2 sm:mx-auto">
                        <div>
                            <div className="p-8 bg-violet-400 rounded">
                                <div className="mb-4 text-center">
                                    <p className="text-xl font-medium tracking-wide text-white">
                                        Free Plan
                                    </p>
                                    <div className="flex items-center justify-center">
                                        <p className="mr-2 text-5xl font-semibold text-white lg:text-6xl">
                                            $0
                                        </p>
                                    </div>
                                </div>
                                <ul className="mb-8 space-y-2">
                                    <li className="flex items-center">
                                        <div className="mr-3">
                                            <svg
                                                className="w-4 h-4 text-teal-accent-400"
                                                viewBox="0 0 24 24"
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                            >
                                                <polyline
                                                    fill="none"
                                                    stroke="currentColor"
                                                    points="6,12 10,16 18,8"
                                                />
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    fill="none"
                                                    r="11"
                                                    stroke="currentColor"
                                                />
                                            </svg>
                                        </div>
                                        <p className="font-medium text-white">Add maximum 5 posts</p>
                                    </li>
                                </ul>
                                {
                                    user ? <button
                                        onClick={handleFreePlan}
                                        type="submit"
                                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-violet-100 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                    >
                                        Get Now
                                    </button> :
                                        <></>
                                }
                            </div>
                            <div className="w-11/12 h-2 mx-auto bg-violet-400 rounded-b opacity-75" />
                            <div className="w-10/12 h-2 mx-auto bg-violet-400 rounded-b opacity-50" />
                            <div className="w-9/12 h-2 mx-auto bg-violet-400 rounded-b opacity-25" />
                        </div>
                        <div>
                            <div className="p-8 bg-violet-400 rounded">
                                <div className="mb-4 text-center">
                                    <p className="text-xl font-medium tracking-wide text-white">
                                        Gold Plan
                                    </p>
                                    <div className="flex items-center justify-center">
                                        <p className="mr-2 text-5xl font-semibold text-white lg:text-6xl">
                                            $10
                                        </p>
                                    </div>
                                </div>
                                <ul className="mb-8 space-y-2">
                                    <li className="flex items-center">
                                        <div className="mr-3">
                                            <svg
                                                className="w-4 h-4 text-teal-accent-400"
                                                viewBox="0 0 24 24"
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                            >
                                                <polyline
                                                    fill="none"
                                                    stroke="currentColor"
                                                    points="6,12 10,16 18,8"
                                                />
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    fill="none"
                                                    r="11"
                                                    stroke="currentColor"
                                                />
                                            </svg>
                                        </div>
                                        <p className="font-medium text-white">Add maximum 10 posts</p>
                                    </li>
                                </ul>
                                <button
                                    onClick={() => document.getElementById('my_modal_3').showModal()}
                                    type="submit"
                                    className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-black transition duration-200 rounded shadow-md bg-violet-100 hover:bg-teal-accent-700 focus:shadow-outline focus:outline-none"
                                >
                                    Get Now
                                </button>
                            </div>
                            <div className="w-11/12 h-2 mx-auto bg-violet-400 rounded-b opacity-75" />
                            <div className="w-10/12 h-2 mx-auto bg-violet-400 rounded-b opacity-50" />
                            <div className="w-9/12 h-2 mx-auto bg-violet-400 rounded-b opacity-25" />
                        </div>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-violet-100">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <Elements stripe={stripePromise}>
                        <CheckOutForm></CheckOutForm>
                    </Elements>
                </div>
            </dialog>
        </div>
    );
};

export default MemberShip;