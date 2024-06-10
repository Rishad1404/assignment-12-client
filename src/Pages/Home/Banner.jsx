
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSearch } from "../../hooks/useSearch";

const Banner = () => {

    const {setSearch}=useSearch()

    const handleSearch = e => {
        e.preventDefault();
        const text = e.target.search.value;
        setSearch(text)
        console.log(text)

    }
    return (
        <div className="hero h-[300px] lg:h-[900px] lg:w-full  mx-auto mb-10" style={{ backgroundImage: 'url(https://i.imgur.com/saV2YJH.png)' }}>
            <div className=" bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className=" max-w-2xl">
                    <h1 className="lg:mb-14 mb-3 lg:text-5xl font-bold text-black">Your Premier Destination for Engaging Conversations</h1>
                    <form onSubmit={handleSearch}>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" name="search" className="grow" placeholder="Search" />
                            <FaMagnifyingGlass className="text-black" />
                        </label>
                        <button type="submit" className="btn bg-violet-600 text-lg mt-2 text-white px-5"><FaMagnifyingGlass /> Search</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Banner;