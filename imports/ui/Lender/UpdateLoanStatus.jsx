import React, { useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import updateData from '../../helpers/updateData';

const updateLoanStatuss = ({ row, fetchAgain }) => {
  const [status, setStatus] = useState();
  const { updateLoanStatus } = updateData();

  const handleUpdate = async () => {
    await updateLoanStatus({ id: row._id, status: status });
    fetchAgain();
  };
  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {row.loanStatus}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Reject</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button variant="contained" onClick={() => handleUpdate()}>
        Update
      </Button>
    </>
  );
};

export default updateLoanStatuss;
