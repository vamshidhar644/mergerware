import React, { useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import updateData from '../../helpers/updateData';

const UpdateRepayStatus = ({ row, fetchAgain }) => {
  const [status, setStatus] = useState();
  const { updateRepayStatus } = updateData();

  const handleUpdate = async () => {
    updateRepayStatus({ id: row._id, status: status });
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
            label={row.repayStatus}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button variant="contained" onClick={() => handleUpdate()}>
        Update
      </Button>
    </>
  );
};

export default UpdateRepayStatus;
