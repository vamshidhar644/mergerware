import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Admin = ({ id, name }) => {
  const [transactions, setTransactions] = useState([]);

  const fetchPendings = () => {
    Meteor.call('transactions.getAll', { id }, (error, result) => {
      if (error) {
        alert(error.reason || 'Error Fetching user data.');
      } else {
        setTransactions(result);
      }
    });
  };
  useEffect(() => {
    fetchPendings();
  }, []);

  console.log(transactions);

  const [filter, setFilter] = useState({
    loanStatus: 'all',
    repayStatus: 'all',
  });

  const filteredLoans = transactions.filter((loan) => {
    return (
      (filter.loanStatus === 'all' || loan.loanStatus === filter.loanStatus) &&
      (filter.repayStatus === 'all' || loan.repayStatus === filter.repayStatus)
    );
  });

  return (
    <div>
      <div className="container">
        <div className="dashboard">
          <div>
            <Typography variant="h3">Lender Dashboard</Typography>
            <Typography variant="p">Welcome, {name}!</Typography>
          </div>
        </div>
        <div className="loan-container">
          <div className="filter-container">
            <label>
              Loan Status:
              <select
                value={filter.loanStatus}
                onChange={(e) =>
                  setFilter({ ...filter, loanStatus: e.target.value })
                }
              >
                <option value="all">All</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </label>
            <label>
              Repay Status:
              <select
                value={filter.repayStatus}
                onChange={(e) =>
                  setFilter({ ...filter, repayStatus: e.target.value })
                }
              >
                <option value="all">All</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </label>
          </div>
          <div className="loan-list">
            {filteredLoans &&
              filteredLoans.map((loan) => (
                <div key={loan.borrowerId} className="loan-item">
                  {/* Render loan data here */}
                  <p>Borrower Name: {loan.borrowerInfo.name}</p>
                  <p>Lender Name: {loan.lenderInfo.name}</p>
                  <p>Amount: {loan.amount}</p>
                  <p>Interest Rate: {loan.interestRate}</p>
                  {/* Add more fields as needed */}
                  <p>Loan Status: {loan.loanStatus}</p>
                  <p>Repay Status: {loan.repayStatus}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
