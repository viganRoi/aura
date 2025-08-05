import React, { useEffect, useState } from 'react';
import { AllApartments, AllApartmentsFilter } from '../components';
import axios from 'axios';
import { BASE_URL } from '../utils/consts';
import { useSelector } from 'react-redux';
import { getRegularRoomFilter, getRegularFloorFilter, getRegularSquareFilter } from '../features/filter/FilterSlice';

const AllApartmentsPage = () => {
  window.scrollTo({ top: 0 })
  const [apartments, setApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [filterState, setFilterState] = useState(false);
  const [available, setAvailable] = useState([]);
  const [totalAvailable, setTotalAvailable] = useState(0);

  const roomFilter = useSelector(getRegularRoomFilter);
  const floorFilter = useSelector(getRegularFloorFilter);
  const squareFilter = useSelector(getRegularSquareFilter);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/apartment/get/apartment`);
        setApartments(response.data);
        applyFilters(response.data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };

    fetchApartments();
  }, []);

  useEffect(() => {
    const fetchAvailable = async () => {
      try {
        const responses = await Promise.all([
          axios.get(`${BASE_URL}/api/apartment/count/apartments/building?bid=A`),
          axios.get(`${BASE_URL}/api/apartment/count/apartments/building?bid=B`),
          axios.get(`${BASE_URL}/api/apartment/count/apartments/building?bid=C`),
          axios.get(`${BASE_URL}/api/apartment/count/apartments/building?bid=D`),
        ]);
        const combinedData = responses.map(res => res.data);
        setAvailable(combinedData);

        const total = combinedData.reduce((sum, count) => sum + count, 0);
        setTotalAvailable(total);

        applyFilters(apartments);
      } catch (error) {
        console.error('Error fetching AvailableNumber:', error);
      }
    };

    fetchAvailable();
  }, []);

  useEffect(() => {
    applyFilters(apartments);
  }, [filterState, roomFilter, floorFilter, squareFilter]);

  const applyFilters = (apartments) => {
    let filtered = apartments;

    if (roomFilter.length && !roomFilter.includes('all')) {
      filtered = filtered.filter(apartment => roomFilter.includes(apartment.rooms));
    }

    if (floorFilter.startVal !== undefined && floorFilter.endVal !== undefined) {
      filtered = filtered.filter(apartment => apartment.floorNumber >= floorFilter.startVal && apartment.floorNumber <= floorFilter.endVal);
    }

    if (squareFilter.startVal !== undefined && squareFilter.endVal !== undefined) {
      filtered = filtered.filter(apartment => apartment.square >= squareFilter.startVal && apartment.square <= squareFilter.endVal);
    }

    setFilteredApartments(filtered);
  };

  return (
    <div>
      <AllApartmentsFilter setFilterState={setFilterState} available={filteredApartments.length} />
      <AllApartments filteredApartments={filteredApartments} />
    </div>
  );
};

export default AllApartmentsPage;