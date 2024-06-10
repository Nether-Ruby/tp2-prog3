import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

export default function DataPopupButton({ fetchData }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/History', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  const handleButtonClick = async () => {
    try {
      const fetchedData = await fetchDataFromAPI();
      setData(fetchedData);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Historial
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ciudades buscadas</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ciudad</TableCell>
                  <TableCell>País</TableCell>
                  <TableCell>Temperatura</TableCell>
                  <TableCell>Condición</TableCell>
                  <TableCell>Fecha y hora</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{data.map((row, index) => (
                <TableRow key={index}>
                    <TableCell>{row.city || 'N/A'}</TableCell>
                    <TableCell>{row.country || 'N/A'}</TableCell>
                    <TableCell>{row.temperature || 'N/A'}</TableCell>
                    <TableCell>{row.condition || 'N/A'}</TableCell>
                    <TableCell>{row.createdAt || 'N/A'}</TableCell>
                </TableRow>
  ))}
</TableBody>

            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
