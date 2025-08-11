import { useEffect, useState, useCallback } from 'react';
import { HousesFilter, AllHouses } from '../components';
import axios from 'axios';
import { BASE_URL } from '../utils/consts';
import { useSelector } from 'react-redux';
import { getRegularFilterType } from '../features/filter/FilterSlice';

const AllHousesPage = () => {
  const typeFilter = useSelector(getRegularFilterType);
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);

  // Fetch and prepare data
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchHouses = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/house/get/by-neighborhood?name=aura`
      );

      // Ensure structure exists
      const data = Array.isArray(response.data.houseDtoList)
        ? response.data.houseDtoList
        : [];

        // Sort by building letter + number
        data.sort((a, b) => {
          const parseName = (str) => {
            const match = str?.match(/^([A-Za-z]+)(\d+)$/);
            return match ? [match[1], parseInt(match[2], 10)] : [str || '', 0];
          };
          const [buildingA, numA] = parseName(a.name);
          const [buildingB, numB] = parseName(b.name);

          if (buildingA < buildingB) return -1;
          if (buildingA > buildingB) return 1;
          return numA - numB;
        });

        setHouses(data);
        applyFilters(data, typeFilter);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };

    fetchHouses();
  }, []);

  // Apply filters whenever typeFilter or houses change
  useEffect(() => {
    applyFilters(houses, typeFilter);
  }, [typeFilter, houses]);

  const applyFilters = useCallback((housesList, types) => {
    if (!Array.isArray(housesList)) return;

    let filtered = housesList.filter(h => !h.isSold);

    if (types.length && !types.includes('all')) {
      filtered = filtered.filter(h => types.includes(h.type));
    }

    setFilteredHouses(filtered);
  }, []);

  return (
    <div className="mt-12 bg-bckS">
      <HousesFilter available={filteredHouses.length} />
      <AllHouses filteredHouses={filteredHouses} />
    </div>
  );
};

export default AllHousesPage;
