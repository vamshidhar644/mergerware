import React, { useEffect } from 'react';
import fetchData from '../../helpers/fetchData';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

const RequestLoan = () => {
  const { getLendersData, lenders } = fetchData();

  useEffect(() => {
    getLendersData();
  }, []);
  console.log(lenders);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableCell align="center">Available Funds</TableCell>
          <TableCell align="center">Intrest Rate</TableCell>
          <TableCell align="center">Name of the Lender</TableCell>
          <TableCell align="center">Email</TableCell>
          <TableCell align="center">Phone</TableCell>
          <TableCell align="center"></TableCell>
        </TableHead>
        <TableBody>
          {lenders &&
            lenders.map((row) => (
              <TableRow
                key={row.name}
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
                    onClick={() => handleLoanRequest(row)}
                    variant="contained"
                  >
                    Request Loan
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RequestLoan;
