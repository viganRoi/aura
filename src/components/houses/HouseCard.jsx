import { homepage, planmetricImageUrl } from "../../utils/consts";

const HouseCard = ({
    image,
    name,
    navigateTo,
    totalSquare,
    type,
}) => {
    return (
        <div className="bg-bckS w-full h-full relative overflow-hidden hover:shadow-xl rounded-lg hover:cursor-pointer valky text-primary flex flex-col items-center p-4">
            <img
                // src={`${homepage}${planmetricImageUrl}${image}.jpg`}
                src={`/assets/images/renderat/b.png`}
                alt=''
                className="w-full h-64 object-contain"
                onClick={navigateTo}
            />
            {/* <div className="absolute top-4 left-4">
                <p className="axiforma">{name}</p>
            </div> */}
            <div className="text-brand flex flex-col gap-2 items-center">
                <p className="text-sm md:text-lg uppercase">
                    {type}
                </p>
                <h1 className="text-4xl">
                    {totalSquare}m<sup className="text-3xl">2</sup>
                </h1>
            </div>
        </div>
    );
};

export default HouseCard;
