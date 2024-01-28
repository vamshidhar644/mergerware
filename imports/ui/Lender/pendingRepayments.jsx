import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import UpdateStatus from './UpdateLoanStatus';
import UpdateRepayStatus from './UpdateRepayStatus';

const PendingTransactions = ({ transactions, fetchPendings }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Borrower Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Update Repay Status</TableCell>
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
                  <TableCell align="center">{row.borrowerInfo.name}</TableCell>
                  <TableCell align="center">{row.borrowerInfo.email}</TableCell>
                  <TableCell align="center">{row.borrowerInfo.phone}</TableCell>
                  <TableCell
                    sx={{
                      display: 'flex',
                      gap: '4px',
                      justifyContent: 'center',
                    }}
                  >
                    <UpdateRepayStatus row={row} fetchAgain={fetchPendings} />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PendingTransactions;
