import React, { useEffect, useState } from 'react';
import postData from '../../helpers/postData';
import fetchData from '../../helpers/fetchData';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function BasicCard() {
  const [showForm, setShowForm] = useState(false);
  const { postLendingInfo } = postData();
  const { getUserDate, data } = fetchData();

  useEffect(() => {
    getUserDate();
  }, []);

  const [lendingInfo, setLendingInfo] = useState({
    interestRate: 0,
    availFunds: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLendingInfo({
      ...lendingInfo,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    await postLendingInfo({ lendingInfo });
    setShowForm(false);
    getUserDate();
  };

  useEffect(() => {
    if (data && data.lenderInfo) {
      setShowForm(false);
    }
  }, []);

  return (
    <Card sx={{ minWidth: 275 }}>
      {!showForm && data && data.lenderInfo ? (
        <>
          <CardContent>
            <Typography variant="h4" color="text.secondary" gutterBottom>
              Lending Info
            </Typography>
            <Typography variant="h5">
              Interest Rate(%):{' '}
              <span>{data.lenderInfo.interestRate}% p.a.</span>
            </Typography>
            <Typography variant="h5">
              Available Funds:{' '}
              <span>₹ {parseFloat(data.lenderInfo.availFunds)}</span>
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={() => setShowForm(true)}>
              Edit
            </Button>
          </CardActions>
        </>
      ) : (
        <>
          <CardContent>
            <Typography variant="h4" color="text.secondary" gutterBottom>
              Lending Info
            </Typography>
          </CardContent>
          <CardActions
            sx={{ display: 'flex', flexDirection: 'column', gap: '2em' }}
          >
            <TextField
              id="interestRate"
              label="Interest Rate"
              variant="standard"
              name="interestRate"
              onChange={handleChange}
              sx={{ width: '100%' }}
            />
            <TextField
              label="Available Funds"
              variant="standard"
              id="availFunds"
              name="availFunds"
              onChange={handleChange}
              sx={{ width: '100%', margin: 0 }}
            />
            <div className="lenderButtons">
              {data && data.lenderInfo && (
                <Button
                  variant="contained"
                  onClick={() => setShowForm(false)}
                  sx={{ width: '100%' }}
                >
                  Close
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleUpdate}
                sx={{ width: '100%' }}
              >
                Update
              </Button>
            </div>
          </CardActions>
        </>
      )}
    </Card>
  );
}
