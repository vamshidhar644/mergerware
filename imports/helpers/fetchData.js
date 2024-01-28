import { Meteor } from 'meteor/meteor';
import { UseAuthContext } from '../../client/context/AuthContext';
import { useState } from 'react';

const fetchData = () => {
  const { user } = UseAuthContext();
  const [data, setData] = useState();
  const [lenders, setLenders] = useState([]);

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

  return { getUserDate, getLendersData, data, lenders };
};

export default fetchData;
