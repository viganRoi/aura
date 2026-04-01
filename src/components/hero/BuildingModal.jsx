

const BuildingModal = ({ title, mousePosition }) => {
    return (
        <div
            className='relative z-10 h-32 w-64 p-6 bg-white rounded-xl'
            style={{
                position: "fixed",
                pointerEvents: "none",
                top: mousePosition.y + 32 + "px",
                left: mousePosition.x - 128 + "px",
            }}
        >
            <div className="absolute -top-3 right-28 w-8 h-8 bg-white rotate-45 -z-1 rounded"></div>
            <img
                src="/assets/images/hero/bck/bck3.png"
                alt=""
                className="h-5/6 absolute bottom-0 right-0"
            />
            <div className='relative flex flex-col justify-between items-start w-full h-full'>
                <div className='flex flex-col'>
                    <h1 className="valky text-3xl text-secondary">{title.title}</h1>
                </div>
            </div>
        </div>

    );
};

export default BuildingModal;