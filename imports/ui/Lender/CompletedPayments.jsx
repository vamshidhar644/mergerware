import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CompletedTransactions = ({ transactions, fetchAgain }) => {
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
            <TableCell align="center">Borrower Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Loan acceptance Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions &&
            transactions.map((row) => {
              return (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">{row.interestRate}%</TableCell>
                  <TableCell align="center">{row.borrowerInfo.name}</TableCell>
                  <TableCell align="center">{row.borrowerInfo.email}</TableCell>
                  <TableCell align="center">{row.borrowerInfo.phone}</TableCell>
                  <TableCell align="center">{row.loanStatus}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompletedTransactions;
