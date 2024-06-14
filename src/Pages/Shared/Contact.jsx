/* eslint-disable react/no-unescaped-entities */

import { Helmet } from "react-helmet-async";

const Contact = () => {
    return (
        <div>
             <Helmet>  
                <title>Contact</title>
            </Helmet>
            <div className="container mx-auto px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="p-8 flex flex-col justify-between">
                        <div className="space-y-4">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">Let's talk!</h2>
                            <p className="text-lg text-gray-700 dark:text-gray-300">Contact us for any kind of support.</p>
                        </div>
                        <img src="https://i.imgur.com/LBO0Ikz.jpeg" alt="Doodle" className="lg:h-72 md:h-64 object-cover" />
                    </div>
                    <form className="p-8 space-y-10">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-sm font-medium text-gray-800 dark:text-gray-200">Full Name</label>
                            <input id="name" type="text" className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-600 focus:outline-none focus:ring focus:ring-indigo-500" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-medium text-gray-800 dark:text-gray-200">Email</label>
                            <input id="email" type="email" className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-600 focus:outline-none focus:ring focus:ring-indigo-500" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="message" className="text-sm font-medium text-gray-800 dark:text-gray-200">Message</label>
                            <textarea id="message" rows="3" className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"></textarea>
                        </div>
                        <button type="submit" className="w-full py-3 bg-indigo-600 text-white text-sm font-semibold uppercase rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
