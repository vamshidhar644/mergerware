import React, { useState } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import postData from '../../helpers/postData';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  gap: '2rem',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '6px',
  boxShadow: 24,
  p: 4,
};

const RequestCard = ({ open, handleClose, data }) => {
  const [amount, setAmount] = useState(0);
  const { postTransaction } = postData();

  const error = () => {
    return (
      <Typography variant="p" sx={{ color: 'red', fontSize: '12px' }}>
        should be {`<= ${data.availFunds}`}
      </Typography>
    );
  };

  const handleTransaction = async () => {
    const loanStatus = 'pending';
    const repayStatus = 'pending';

    await postTransaction({
      borrowerId: data.borrowerId,
      lenderId: data.lenderId,
      amount: amount,
      interestRate: data.interestRate,
      loanStatus: loanStatus,
      repayStatus: repayStatus,
    });

    handleClose();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Required amount:
            </Typography>
            <TextField
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              onChange={(e) => setAmount(e.target.value)}
              sx={{ width: '100%', marginTop: 1 }}
            />
            {data && amount > parseInt(data.availFunds) && error()}
          </div>

          <Button
            variant="contained"
            sx={{ width: '100%', marginTop: 2 }}
            onClick={handleTransaction}
          >
            Request & Create Transaction
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default RequestCard;
