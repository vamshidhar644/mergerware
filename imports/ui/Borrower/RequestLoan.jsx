import React, { useEffect, useState } from 'react';
import fetchData from '../../helpers/fetchData';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import RequestCard from './RequestCard';

const RequestLoan = ({ borrowerId }) => {
  const { getLendersData, lenders } = fetchData();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = useState();

  useEffect(() => {
    getLendersData();
  }, []);

  const handleLoanRequest = ({ _id, availFunds, interestRate }) => {
    const data = {
      borrowerId: borrowerId,
      lenderId: _id,
      availFunds: availFunds,
      interestRate: interestRate,
    };
    handleOpen();
    setData(data);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Available Funds</TableCell>
            <TableCell align="center">Interest Rate (p.a.)</TableCell>
            <TableCell align="center">Name of the Lender</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lenders &&
            lenders.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">
                  {row.lenderInfo.availFunds}
                </TableCell>
                <TableCell align="center">
                  {row.lenderInfo.interestRate}
                </TableCell>
                <TableCell align="center">
                  {row.personalInfo.firstName} {row.personalInfo.lastName}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.personalInfo.phone}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() =>
                      handleLoanRequest({
                        _id: row._id,
                        availFunds: row.lenderInfo.availFunds,
                        interestRate: row.lenderInfo.interestRate,
                      })
                    }
                    variant="contained"
                  >
                    Request Loan
                  </Button>
                  <RequestCard
                    open={open}
                    handleClose={handleClose}
                    data={data}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RequestLoan;
