import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Layout/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { SlLike, SlDislike } from "react-icons/sl";
import { GoComment } from "react-icons/go";
import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import '../Home/AllPosts.css'
import { FaListAlt } from "react-icons/fa";
import { useSearch } from "../../hooks/useSearch";

const AllPosts = () => {
    const axiosPublic = useAxiosPublic();
    const{search}=useSearch()
    const { count } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0);
    // const [sort, setSort] = useState()


    const itemPerPage = 5;
    const numberOfPages = Math.ceil(count / itemPerPage);

    const pages = [...Array(numberOfPages).keys()];

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }


    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['posts', currentPage,itemPerPage,search],
        queryFn: async () => {
            const res = await axiosPublic.get(`/posts?page=${currentPage}&size=${itemPerPage}&search=${search}`);
            return res.data
        }
    })
    if (isLoading) return <span className="loading loading-bars loading-lg"></span>


    return (
        <div className="mb-10">
            <SectionTitle heading='Posts'></SectionTitle>
            <div className="flex justify-center my-10">
                <button className="btn bg-violet-200"><FaListAlt></FaListAlt> Sort by Popularity</button>
            </div>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    posts.map(post => <div key={post._id} className="hover:scale-105 transition-transform">
                        <Link to={`/posts/${post._id}`}>
                            <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-violet-600">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-light text-gray-600 dark:text-gray-100">{post.postTime}</span>
                                    <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabIndex="0" role="button">{post.postTag}</a>
                                </div>

                                <div className="mt-2">
                                    <a href="#" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabIndex="0" role="link">{post.postTitle}</a>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <a href="#" className="text-blue-600 dark:text-blue-100 hover:underline" tabIndex="0" role="link">View Details</a>
                                    <div className="flex gap-4">
                                        <h2 className="flex items-center gap-1 text-white"><SlLike className="text-2xl " />{post.upVote}</h2>
                                        <h2 className="flex items-center gap-1 text-white"><SlDislike className="text-2xl" />{post.downVote}</h2>
                                        <h2 className="flex items-center gap-1 text-white"><GoComment className="text-2xl" />{post.commentCount}</h2>
                                    </div>

                                    <div className="flex items-center">
                                        <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={post.authorImage} alt="avatar" />
                                        <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabIndex="0" role="link">{post.authorName}</a>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>)
                }
            </div>
            {/* Pagination */}
            <div className="pagination my-5">
                <button onClick={handlePreviousPage} className="btn">Previous</button>
                {
                    pages.map(page => <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        type="button" title="Page 1" className={currentPage === page ? 'selected' : undefined}>{page}</button>)
                }
                <button onClick={handleNextPage} className="btn">Next</button>
            </div>

        </div>
    );
};

export default AllPosts;