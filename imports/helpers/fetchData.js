import { Meteor } from 'meteor/meteor';
import { UseAuthContext } from '../../client/context/AuthContext';
import { useState } from 'react';

const fetchData = () => {
  const { user } = UseAuthContext();
  const [data, setData] = useState();
  const [lenders, setLenders] = useState([]);
  const [singleLender, setSingleLender] = useState();

  const getUserDate = () => {
    if (user) {
      Meteor.call('users.getUserData', { id: user }, (error, result) => {
        if (error) {
          alert(error.reason || 'Error Fetching user data.');
        } else {
          setData(result);
        }
      });
    }
  };

  const getLendersData = () => {
    if (user) {
      Meteor.call('users.getLendersData', (error, result) => {
        if (error) {
          alert(error.reason || 'Error Fetching user data.');
        } else {
          setLenders(result);
        }
      });
    }
  };

  const getSingleLender = ({ id }) => {
    Meteor.call('users.getLender', { id }, (error, result) => {
      if (error) {
        alert(error.reason || 'Error Fetching user data.');
      } else {
        setSingleLender(result);
      }
    });
  };

  return {
    getUserDate,
    getLendersData,
    getSingleLender,
    data,
    lenders,
    singleLender,
  };
};

export default fetchData;
