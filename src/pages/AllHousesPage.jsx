import React, { useEffect, useState } from 'react';
import { HousesFilter, AllHouses } from '../components';
import axios from 'axios';
import { BASE_URL } from '../utils/consts';
import { useSelector } from 'react-redux';
import { getRegularRoomFilter, getRegularFloorFilter, getRegularSquareFilter } from '../features/filter/FilterSlice';

const AllHousesPage = () => {
  window.scrollTo({ top: 0 })
  const [apartments, setApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [filterState, setFilterState] = useState(false);

  const roomFilter = useSelector(getRegularRoomFilter);
  const floorFilter = useSelector(getRegularFloorFilter);
  const squareFilter = useSelector(getRegularSquareFilter);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/house/get/by-neighborhood?name=aura`);
        let data = response.data.flatMap(b => b.apartmentList || []);
        data = data.sort((a, b) => {
          const parse = (str) => {
            const match = str.match(/^([A-Za-z]+)(\d+)$/);
            if (!match) return [str, 0];
            return [match[1], parseInt(match[2], 10)];
          };
          const [buildingA, numA] = parse(a.name || '');
          const [buildingB, numB] = parse(b.name || '');
          if (buildingA < buildingB) return -1;
          if (buildingA > buildingB) return 1;
          return numA - numB;
        });
        setApartments(data);
        applyFilters(data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };

    fetchApartments();
  }, []);

  useEffect(() => {
    applyFilters(apartments);
  }, [filterState, roomFilter, floorFilter, squareFilter]);

  const applyFilters = (apartments) => {
    let filtered = apartments;

    filtered = filtered.filter(apartment => !apartment.isSold);

    if (roomFilter.length && !roomFilter.includes('all')) {
      filtered = filtered.filter(apartment => roomFilter.includes(apartment.rooms));
    }

    if (floorFilter.startVal !== undefined && floorFilter.endVal !== undefined) {
      filtered = filtered.filter(apartment => apartment.floorNumber >= floorFilter.startVal && apartment.floorNumber <= floorFilter.endVal);
    }

    if (squareFilter.startVal !== undefined && squareFilter.endVal !== undefined) {
      filtered = filtered.filter(apartment => apartment.netoSquare >= squareFilter.startVal && apartment.netoSquare <= squareFilter.endVal);
    }

    setFilteredApartments(filtered);
  };

  return (
    <div className='mt-30'>
      <HousesFilter setFilterState={setFilterState} available={filteredApartments?.length} />
      <AllHouses filteredHouses={filteredApartments} />
    </div>
  );
};

export default AllHousesPage;