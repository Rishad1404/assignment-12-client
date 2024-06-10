const SectionTitle = ({heading}) => {
    return (
        <div className="md:w-4/12 mx-auto text-center my-10">
            <h3 className="text-2xl lg:text-5xl uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;