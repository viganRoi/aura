import React, { useState } from 'react';
import axios from 'axios';
import { Done } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../utils/consts';

const HouseSvgExtractor = ({ show }) => {
  const [svgCode, setSvgCode] = useState('');
  const [numberOfFloors, setNumberOfFloors] = useState(1);
  const [neighborhood, setNeighborhood] = useState('');
  const [side, setSide] = useState(1)
  const [extractedHouses, setExtractedHouses] = useState([]);

  const handleSvgCodeChange = (e) => setSvgCode(e.target.value);
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const generateHouseFloors = (floorCount) => {
    return Array.from({ length: floorCount }, (_, i) => ({
      floor: `Kati ${i + 1}`,
      floorNumber: i + 1,
      planUrl: '',
      plan3dUrl: '',
      virtualTourUrl: '',
      square: getRandom(60, 150),
      netoSquare: getRandom(50, 130),
      grossySquare: getRandom(65, 160),
      type: 'Banesë',
      numberOfRooms: getRandom(1, 5)
    }));
  };

  const extractSvgElements = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgCode, 'image/svg+xml');
    const svg = doc.querySelector('svg');
    const image = doc.querySelector('image');
    const shapes = doc.querySelectorAll('polygon, path');

    const viewBox = svg?.getAttribute('viewBox') || '';
    const imageWidth = image?.getAttribute('width') || '';
    const imageHeight = image?.getAttribute('height') || '';
    const imageTransform = image?.getAttribute('transform') || '';

    const extracted = Array.from(shapes).map((el, idx) => {
      const isPolygon = el.tagName === 'polygon';
      const pointsAttr = isPolygon ? 'points' : 'd';
      const points = el.getAttribute(pointsAttr);

      return {
        houseId: `H-${Date.now()}-${idx}`,
        name: `Shtëpia ${idx + 1}`,
        number: `${idx + 1}`,
        type: 'Banesë',
        numberOfRooms: getRandom(2, 5),
        totalSquare: getRandom(120, 300),
        totalNetoSquare: getRandom(100, 250),
        totalGrossySquare: getRandom(130, 320),
        pointType: isPolygon ? 'polygon' : 'path',
        points,
        imageWidth,
        imageHeight,
        viewBox,
        imageTransform,
        image2dUrl: '',
        image3dUrl: '',
        side,
        pdfUrl: '',
        orientationImageUrl: '',
        isSold: false,
        isReserved: false,
        floors: Array.from({ length: numberOfFloors }, (_, i) => `Kati ${i + 1}`),
        houseFloors: generateHouseFloors(numberOfFloors),
        neighborhood
      };
    });

    setExtractedHouses(extracted);
  };

  const handleSubmit = async () => {
  const payload = {
    neighborhoodName: neighborhood,
    houseDtoList: extractedHouses
  };

  try {
    await axios.post(`${BASE_URL}/api/house/create/list`, payload);
    toast.success('Shtëpitë u ruajtën me sukses!');
  } catch (err) {
    toast.error('Dështoi ruajtja e shtëpive.');
    console.error(err);
  }
};


  return (
    <div style={{ display: !show ? 'block' : 'none', padding: 10, paddingTop: 70, backgroundColor: 'white' }}>
      <ToastContainer />
      <h2>SVG Extractor për Shtëpi</h2>

      <textarea
        rows={10}
        cols={60}
        style={{border: '1px solid #DDD', borderRadius: '10px', padding: '5px'}}
        placeholder="Ngjit SVG këtu..."
        value={svgCode}
        onChange={handleSvgCodeChange}
      />

      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label>
          Numri i kateve:
          <input
            type="number"
            value={numberOfFloors}
            onChange={(e) => setNumberOfFloors(parseInt(e.target.value))}
            min={1}
          />
        </label>

        <label>
          Emri i lagjes:
          <input
            type="text"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
        </label>
        <label style={{border: '1px solid #DDD', width: 'fit-content', padding: '5px'}}>
          Ana (Side):
          <input
            type="number"
            value={side}
            style={{marginLeft: '5px'}}
            onChange={(e) => setSide(parseInt(e.target.value))}
          />
        </label>
      </div>

      <button onClick={extractSvgElements} style={{ marginTop: 10, border: 'none', backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', cursor: 'pointer', borderRadius: 10 }}>
        Ekstrakto Shtëpitë
      </button>

      <div style={{ marginTop: 20 }}>
        <button onClick={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
          <Done /> Ruaj në server
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        <h4>Output:</h4>
        <pre>{JSON.stringify(extractedHouses, null, 2)}</pre>
      </div>
    </div>
  );
};


export default HouseSvgExtractor;
