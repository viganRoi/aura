import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchHouseById } from "../../../features/house/HouseApi";
import { getHouseData, getHouseLoading } from "../../../features/house/HouseSlice";
import { Box, Modal } from "@mui/material";

const AdmHouseModal = () => {
  const dispatch = useDispatch();
  const { houseId } = useParams();

  const currentHouse = useSelector(getHouseData);
    const loading = useSelector(getHouseLoading);
    // const error = useSelector(getHouseError);
    // const success = useSelector(getHouseSuccess);

  const [formData, setFormData] = useState({
    houseId: "",
    name: "",
    number: "",
    houseType: "",
    totalSquare: "",
    totalNetoSquare: "",
    totalGrossySquare: "",
    numberOfRooms: "",
    image2dUrl: "",
    image3dUrl: "",
    pdfUrl: "",
    orientationImageUrl: "",
    description: "",
    isSold: false,
    isReserved: false,
    houseFloors: [],
  });

  useEffect(() => {
    dispatch(fetchHouseById(houseId));
  }, [dispatch, houseId]);

  useEffect(() => {
    if (currentHouse) {
      const {
        houseId,
        name,
        number,
        houseType,
        totalSquare,
        totalNetoSquare,
        totalGrossySquare,
        numberOfRooms,
        image2dUrl,
        image3dUrl,
        pdfUrl,
        orientationImageUrl,
        description,
        isSold,
        isReserved,
        houseFloors,
      } = currentHouse;

      setFormData({
        houseId,
        name,
        number,
        houseType,
        totalSquare,
        totalNetoSquare,
        totalGrossySquare,
        numberOfRooms,
        image2dUrl,
        image3dUrl,
        pdfUrl,
        orientationImageUrl,
        description,
        isSold,
        isReserved,
        houseFloors: houseFloors || [],
      });
    }
  }, [currentHouse]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFloorChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFloors = [...formData.houseFloors];
    updatedFloors[index][name] = value;
    setFormData({ ...formData, houseFloors: updatedFloors });
  };

  const addFloor = () => {
    const newFloor = {
      floor: "",
      floorNumber: "",
      planUrl: "",
      plan3dUrl: "",
      virtualTourUrl: "",
      square: "",
      netoSquare: "",
      grossySquare: "",
      type: "",
      numberOfRooms: "",
    };
    setFormData({
      ...formData,
      houseFloors: [...formData.houseFloors, newFloor],
    });
  };

  const removeFloor = (index) => {
    const updatedFloors = [...formData.houseFloors];
    updatedFloors.splice(index, 1);
    setFormData({ ...formData, houseFloors: updatedFloors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateHouseThunk({ houseId, houseData: formData }))
    //   .unwrap()
    //   .then(() => {
    //     alert("House updated!");
    //     navigate("/houses");
    //   })
    //   .catch((err) => alert("Failed to update: " + err.message));
  };

  if (loading || !currentHouse) return <div>Loading...</div>;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -45%)",
    width: 900,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 40,
    p: 2,
    };

  return (
    <Modal open={true}>
      <Box sx={style}>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <h2 className="text-xl font-semibold">Edit House</h2>
          <div className="grid grid-cols-2 gap-4 [&>input]:p-2">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Number"
            />
            <input
              name="houseType"
              value={formData.houseType}
              onChange={handleChange}
              placeholder="House Type"
            />
            <input
              name="totalSquare"
              value={formData.totalSquare}
              onChange={handleChange}
              placeholder="Total Square"
            />
            <input
              name="totalNetoSquare"
              value={formData.totalNetoSquare}
              onChange={handleChange}
              placeholder="Neto Square"
            />
            <input
              name="totalGrossySquare"
              value={formData.totalGrossySquare}
              onChange={handleChange}
              placeholder="Grossy Square"
            />
            <input
              name="numberOfRooms"
              value={formData.numberOfRooms}
              onChange={handleChange}
              placeholder="Number of Rooms"
            />
            <input
              name="image2dUrl"
              value={formData.image2dUrl}
              onChange={handleChange}
              placeholder="2D Image URL"
            />
            <input
              name="image3dUrl"
              value={formData.image3dUrl}
              onChange={handleChange}
              placeholder="3D Image URL"
            />
            <input
              name="pdfUrl"
              value={formData.pdfUrl}
              onChange={handleChange}
              placeholder="PDF URL"
            />
            <input
              name="orientationImageUrl"
              value={formData.orientationImageUrl}
              onChange={handleChange}
              placeholder="Orientation Image URL"
            />
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2"
          />

          <div className="flex gap-4">
            <label>
              <input
                type="checkbox"
                name="isSold"
                checked={formData.isSold}
                onChange={handleChange}
              />
              Sold
            </label>
            <label>
              <input
                type="checkbox"
                name="isReserved"
                checked={formData.isReserved}
                onChange={handleChange}
              />
              Reserved
            </label>
          </div>

          <hr className="my-4" />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">House Floors</h3>

            {formData.houseFloors.map((floor, index) => (
              <div
                key={index}
                className="border p-4 rounded space-y-2 relative"
              >
                <button
                  type="button"
                  onClick={() => removeFloor(index)}
                  className="absolute top-1 right-1 text-red-500"
                  title="Remove floor"
                >
                  ➖
                </button>
                <input
                  name="floor"
                  value={floor.floor}
                  onChange={(e) => handleFloorChange(index, e)}
                  placeholder="Floor"
                />
                <input
                  name="floorNumber"
                  value={floor.floorNumber}
                  onChange={(e) => handleFloorChange(index, e)}
                  placeholder="Floor Number"
                />
                <input
                  name="planUrl"
                  value={floor.planUrl}
                  onChange={(e) => handleFloorChange(index, e)}
                  placeholder="Plan URL"
                />
                <input
                  name="plan3dUrl"
                  value={floor.plan3dUrl}
                  onChange={(e) => handleFloorChange(index, e)}
                  placeholder="3D Plan URL"
                />
                <input
                  name="virtualTourUrl"
                  value={floor.virtualTourUrl}
                  onChange={(e) => handleFloorChange(index, e)}
                  placeholder="Virtual Tour URL"
                />
                <input
                  name="square"
                  value={floor.square}
                  onChange={(e) => handleFloorChange(index, e)}
                  placeholder="Square"
                />
                <input
                  name="netoSquare"
                  value={floor.netoSquare}
                  onChange={(e) => handleFloorChange(index, e)}
                  placeholder="Neto Square"
                />
                <input
                  name="grossySquare"
                  value={floor.grossySquare}
                  onChange={(e) => handleFloorChange(index, e)}
                  placeholder="Grossy Square"
                />
                <input
                  name="type"
                  value={floor.type}
                  onChange={(e) => handleFloorChange(index, e)}
                  placeholder="Type"
                />
                <input
                  name="numberOfRooms"
                  value={floor.numberOfRooms}
                  onChange={(e) => handleFloorChange(index, e)}
                  placeholder="Rooms"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addFloor}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              ➕ Add Floor
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default AdmHouseModal;
