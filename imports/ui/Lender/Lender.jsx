import React, { useEffect, useState } from 'react';
import LendingInfo from './LendingInfo';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoanRequests from './LoanRequests';
import PendingTransactions from './pendingRepayments';
import CompletedTransactions from './CompletedPayments';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const Lender = ({ id, name }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [pendingRequests, setPendingRequests] = useState([]);
  const [pendingTransactions, setPendingTransaction] = useState([]);
  const [completedTransaction, setCompletedTransaction] = useState([]);

  const fetchPendings = () => {
    Meteor.call('transactions.getPending', { id }, (error, result) => {
      if (error) {
        alert(error.reason || 'Error Fetching user data.');
      } else {
        setPendingRequests(
          result.filter((item) => item.loanStatus === 'pending')
        );
        setPendingTransaction(
          result.filter((item) => item.repayStatus === 'pending')
        );
        setCompletedTransaction(
          result.filter(
            (item) =>
              item.repayStatus === 'paid' || item.loanStatus === 'rejected'
          )
        );
      }
    });
  };
  useEffect(() => {
    fetchPendings();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="dashboard">
          <div>
            <Typography variant="h3">Lender Dashboard</Typography>
            <Typography variant="p">Welcome, {name}!</Typography>
          </div>
          <div>
            <LendingInfo />
          </div>
        </div>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Loan Requests" {...a11yProps(0)} />
              <Tab label="Pending Transactions" {...a11yProps(1)} />
              <Tab label="Completed Transactions" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <LoanRequests
              transactions={pendingRequests}
              fetchPendings={fetchPendings}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <PendingTransactions
              transactions={pendingTransactions}
              fetchPendings={fetchPendings}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <CompletedTransactions
              transactions={completedTransaction}
              fetchAgain={fetchPendings}
            />
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

export default Lender;
