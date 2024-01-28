import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RequestLoan from './RequestLoan';
import PendingTransactions from './PendingTransactions';

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

const Borrower = ({ data }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [pendingTransaction, setPendingTransaction] = useState([]);
  const [completedTransaction, setCompletedTransaction] = useState([]);

  const fetchPendings = () => {
    Meteor.call(
      'transactions.getPending',
      { id: data._id },
      (error, result) => {
        if (error) {
          alert(error.reason || 'Error Fetching user data.');
        } else {
          setPendingTransaction(
            result.filter((item) => item.loanStatus === 'pending')
          );
          setCompletedTransaction(
            result.filter(
              (item) =>
                item.repayStatus === 'paid' || item.loanStatus === 'rejected'
            )
          );
        }
      }
    );
  };

  useEffect(() => {
    fetchPendings();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="dashboard">
          <div>
            <Typography variant="h3">Borrower Dashboard</Typography>
            <Typography variant="p">
              Welcome, {data.personalInfo.firstName}!
            </Typography>
          </div>
          <div></div>
        </div>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Request For loan" {...a11yProps(0)} />
              <Tab label="Pending Transactions" {...a11yProps(1)} />
              <Tab label="Completed Transactions" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <RequestLoan data={data} fetchAgain={fetchPendings} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <PendingTransactions
              transaction={pendingTransaction}
              fetchAgain={fetchPendings}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <PendingTransactions
              transaction={completedTransaction}
              fetchAgain={fetchPendings}
            />
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

export default Borrower;
