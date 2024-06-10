
import AllPosts from "./AllPosts";
// import Announcement from "./Announcement";
import Banner from "./Banner";
import Tags from "./Tags";


const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <Tags></Tags>
            {/* <Announcement></Announcement> */}
            <AllPosts></AllPosts>
        </div>
    );
};

export default Home;