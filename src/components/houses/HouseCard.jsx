import { homepage, planmetricImageUrl } from "../../utils/consts";

const HouseCard = ({
    image,
    name,
    navigateTo,
    totalSquare,
    type,
}) => {
    return (
        <div className="w-full h-[380px] md:h-[500px] relative overflow-hidden hover:shadow-xl bg-white border border-dark hover:cursor-pointer valky text-primary flex flex-col items-center p-4">
            <img
                // src={`${homepage}${planmetricImageUrl}${image}.jpg`}
                src={`/assets/images/renderat/b.png`}
                alt=''
                className="w-full h-[370px] object-contain"
                onClick={navigateTo}
            />
            <div className="absolute top-4 left-4">
                <p className="axiforma">{name}</p>
            </div>
            <div className="text-brand flex flex-col gap-4 items-center">
                <p className="text-sm md:text-lg uppercase">
                    {type}
                </p>
                <h1 className="text-5xl">
                    {totalSquare}m<sup className="text-3xl">2</sup>
                </h1>
            </div>
        </div>
    );
};

export default HouseCard;
