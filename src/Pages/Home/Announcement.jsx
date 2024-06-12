import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Layout/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Announcement = () => {
    const axiosPublic = useAxiosPublic();

    const { data: announcements = [] } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/announcements`);
            return res.data
        }
    })

    return (
        <div className={announcements.length > 0 ? '' : 'hidden'}>
            <SectionTitle heading='Announcements'></SectionTitle>
            <div className="container mx-auto">
                {
                    announcements.map(announcement =>
                        <div key={announcement._id} className="w-full max-w-md px-8 py-4 mt-16 bg-violet-600 rounded-lg shadow-lg">
                            <div className="flex justify-center -mt-16 md:justify-end">
                                <img className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400" alt="Testimonial avatar" src={announcement.authorImage} />
                            </div>
                            <div className="flex justify-end mb-1">
                                <a href="#" className="text-lg font-medium text-violet-100" tabIndex="0" role="link">{announcement.authorName}</a>
                            </div>

                            <div className="border p-4">
                                <h2 className="mt-2 text-xl font-bold text-gray-800 dark:text-white md:mt-0">{announcement.title}</h2>
                                <p className="mt-2 text-base text-gray-600 dark:text-gray-200">{announcement.description}</p>
                            </div>


                        </div>)
                }
            </div>

        </div>
    );
};

export default Announcement;