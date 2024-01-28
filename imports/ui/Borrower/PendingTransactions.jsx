import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const PendingTransactions = ({ transaction, fetchAgain }) => {
  useEffect(() => {
    fetchAgain();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Interest Rate (p.a.)</TableCell>
            <TableCell align="center">Lender Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Loan acceptance Status</TableCell>
            <TableCell align="center">Repayment status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transaction &&
            transaction.map((row) => {
              return (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">{row.interestRate}%</TableCell>
                  <TableCell align="center">{row.lenderInfo.name}</TableCell>
                  <TableCell align="center">{row.lenderInfo.email}</TableCell>
                  <TableCell align="center">{row.lenderInfo.phone}</TableCell>
                  <TableCell align="center">{row.loanStatus}</TableCell>
                  <TableCell align="center">{row.repayStatus}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PendingTransactions;
