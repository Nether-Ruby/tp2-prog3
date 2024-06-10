import React from 'react';
import { TextField } from '@mui/material';

const CityInput = ({ city, setCity, error }) => (
  <TextField
    id="city"
    label="Ciudad"
    variant="outlined"
    size="small"
    required
    value={city}
    onChange={(e) => setCity(e.target.value)}
    error={error.error}
    helperText={error.message}
  />
);

export default CityInput;
