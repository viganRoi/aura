import { Euro } from '@mui/icons-material';
import { Box, Button, Divider, Grid, InputAdornment, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { BASE_URL, EURO_SYMBOL } from '../../utils/consts';
import axios from 'axios';
import { toast } from 'react-toastify';

const SalesModal = ( { open, handleClose, apartmentData } ) => {
  const [parkingPrice, setParkingPrice] = useState(0.00);
  const [totalPrice, setTotalPrice] = useState(0.00);
  const [warehousePrice, setWarehousePrice] = useState(0.00);
  const [apartmentPrice, setApartmentPrice] = useState(0.00);
  const [warehouseSquare, setWarehouseSquare] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = {}
    form.forEach((value, key) => {
      data[key] = value;
  });

  // Append additional data to the object
  data.warehouseTotalPrice = warehousePrice;
  data.warehouseSquare = warehouseSquare;
  data.apartmentPrice = apartmentPrice;
  data.parkingPrice = parkingPrice;
  data.total = parseFloat(apartmentPrice) + parseFloat(warehousePrice) + parseFloat(parkingPrice);
  data.apartmentId = apartmentData.id;

  // Send the data as a JSON payload
  // axios.post(`${BASE_URL}/api/v1/sales`, data, {
  //     headers: {
  //         'Content-Type': 'application/json',  // Indicate that you're sending JSON
  //     }
  // })
  // .then(res => {
  //     toast.success('U ruajt me sukses!');
  // })
  // .catch(err => {
  //     console.log('err', err);
  // });
};

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "100%",
            md: "70%",
            lg: "50%",
          },
          bgcolor: "background.paper",
          borderRadius: "10px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5">Shitje</Typography>
        <Divider sx={{ my: 1 }} />
        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={4}>
                <TextField fullWidth size="small" type="text" name='clientName' label="Bleresi" />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Numri i telefonit"
                  name='phoneNumber'
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField fullWidth size="small" type="text" name='address' label="Adresa" />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField fullWidth size="small" type="text" name='refNr' label="REF/NR" />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name='lrpNr'
                  label="LRP / NR"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  defaultValue={apartmentData?.name}
                  fullWidth
                  size="small"
                  type="text"
                  name='apartmentName'
                  label="Banesa"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  defaultValue={new Date().toISOString().slice(0, 16)}
                  size="small"
                  type="datetime-local"
                  name='createdAt'
                  label="Data e shitjes"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  defaultValue={apartmentData?.apartmentNumber}
                  fullWidth
                  size="small"
                  type="text"
                  name='building'
                  label="Llamella"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  defaultValue={apartmentData?.square}
                  fullWidth
                  size="small"
                  type="text"
                  name='apartmentSquare'
                  label="Sip. Baneses"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Shuma e Banesës"
                  value={apartmentPrice}
                  onChange={(e) => {
                    setApartmentPrice(e.currentTarget.value)
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Euro fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Nr. i Parkingut"
                  name='parkingNumber'
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Shuma e Parkingut"
                  value={parkingPrice}
                  onChange={(e) => {
                    setParkingPrice(e.currentTarget.value)
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Euro fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name='warehouseNumber'
                  label="Nr. i Depos"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  value={warehouseSquare}
                  onChange={(e) => {
                    setWarehouseSquare(e.currentTarget.value)
                  }}
                  label="Siperfaqja i Depos"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name='warehousePricePerSquare'
                  label="Cmimi i m2 te Depos"
                  onChange={(e) => {
                    if(parseFloat(warehouseSquare) > 0) {
                      setWarehousePrice(
                        parseFloat(warehouseSquare) * parseFloat(e.currentTarget.value)
                      )
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Shuma e Depos"
                  onChange={(e) => setWarehousePrice(parseFloat(e.currentTarget.value))}
                  value={warehousePrice}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Euro fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Pagesa klientit"
                  name='paid'
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Typography sx={{fontWeight: 'bold'}}>Shuma totale e shitjes</Typography>
                <Typography sx={{fontWeight: 'bold'}} variant='h6'>{
                    (parseFloat(apartmentPrice) + parseFloat(warehousePrice) + parseFloat(parkingPrice)).toFixed(2)
                  } {EURO_SYMBOL}</Typography>
              </Grid>
            </Grid>
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
              <Button type='submit' variant="contained">Ruaj</Button>
              <Button onClick={() => handleClose()} variant="outlined">Anulo</Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default SalesModal