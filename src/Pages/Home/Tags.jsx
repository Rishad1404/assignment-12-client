import SectionTitle from "../../Layout/SectionTitle";

const Tags = () => {
    return (
        <div className="container mx-auto my-10">
            <SectionTitle heading='We Offers'></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="card  bg-base-100 shadow-xl">
                    <div className="card-body bg-violet-100 hover:bg-violet-300">
                        <h2 className="text-4xl text-center">#JavaScript</h2>     
                    </div>
                </div>
                <div className="card  bg-base-100 shadow-xl">
                    <div className="card-body bg-violet-100 hover:bg-violet-300">
                        <h2 className="text-4xl text-center">#React</h2>     
                    </div>
                </div>
                <div className="card  bg-base-100 shadow-xl">
                    <div className="card-body bg-violet-100 hover:bg-violet-300">
                        <h2 className="text-4xl text-center">#MongoDB</h2>     
                    </div>
                </div>
                <div className="card  bg-base-100 shadow-xl">
                    <div className="card-body bg-violet-100 hover:bg-violet-300">
                        <h2 className="text-4xl text-center">#Express</h2>     
                    </div>
                </div>
                <div className="card  bg-base-100 shadow-xl">
                    <div className="card-body bg-violet-100 hover:bg-violet-300">
                        <h2 className="text-4xl text-center">#Python</h2>     
                    </div>
                </div>
                <div className="card  bg-base-100 shadow-xl">
                    <div className="card-body bg-violet-100 hover:bg-violet-300">
                        <h2 className="text-4xl text-center">#NodeJS</h2>     
                    </div>
                </div>
               

            </div>
        </div>
    );
};

export default Tags;