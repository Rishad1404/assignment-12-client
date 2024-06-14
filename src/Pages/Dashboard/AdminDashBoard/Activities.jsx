import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import SectionTitle from '../../../Layout/SectionTitle';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const Activities = () => {
    const axiosPublic = useAxiosPublic();
    const [selectedReport, setSelectedReport] = useState(null);

    const { data: reports = [], isLoading, refetch } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await axiosPublic.get('/reports');
            return res.data;
        }
    });


    const handleDeleteComment = report => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/report/${report._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "The comment has been deleted.",
                                icon: "success"

                            });
                        }
                    })
            }
        });
    }


    if (isLoading) return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>;

    return (
        <div>
            <Helmet>  
                <title>Activities</title>
            </Helmet>
            <div className="container mx-auto my-10">
                <SectionTitle heading='Reported Comments' />
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-violet-500 text-white">
                            <tr>
                                <th className="py-3 px-4 text-center">Reporter</th>
                                <th className="py-3 px-4 text-center">Comment</th>
                                <th className="py-3 px-4 text-center">Feedback</th>
                                <th className="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {reports.map(report => (
                                <tr key={report._id} className="bg-white">
                                    <td className="py-4 px-6 whitespace-nowrap text-center">{report.reportedBy}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-center">
                                        {report.comment && report.comment.length > 20 ? (
                                            <>
                                                {report.comment.slice(0, 20)}...
                                                <button
                                                    onClick={() => setSelectedReport(report)}
                                                    className="text-violet-500 hover:underline ml-1"
                                                >
                                                    Read More
                                                </button>
                                            </>
                                        ) : (
                                            report.comment || 'No comment'
                                        )}
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap text-center">{report.feedback}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-center">
                                        <button
                                            onClick={() => handleDeleteComment(report)}
                                            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 focus:outline-none ml-2"
                                        >
                                            Delete Comment
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedReport && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Full Comment</h3>
                            <p className="text-gray-700">{selectedReport.comment}</p>
                            <button
                                onClick={() => setSelectedReport(null)}
                                className="mt-4 px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Activities;
