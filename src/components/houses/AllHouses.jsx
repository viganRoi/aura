import { useNavigate } from 'react-router-dom';
import HouseCard from './HouseCard';

const AllHouses = ({ filteredHouses }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex flex-col items-center justify-center content-center py-12 md:py-24 bg-white">
            <div className="w-11/12 flex-col align-center justify-center">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
                    {filteredHouses.map((el) => {
                        return (
                            <HouseCard
                                key={el.id}
                                name={el.name}
                                type={el.type}
                                image={el.name}
                                totalSquare={el.totalSquare}
                                navigateTo={() => navigate(`/houses/${el.id}`)}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AllHouses