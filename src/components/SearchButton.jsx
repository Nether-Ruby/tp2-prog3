import React from 'react';
import { LoadingButton } from '@mui/lab';

const SearchButton = ({ loading }) => (
  <LoadingButton
    type="submit"
    variant="contained"
    loading={loading}
    loadingIndicator="Buscando..."
  >
    Buscar
  </LoadingButton>
);

export default SearchButton;
