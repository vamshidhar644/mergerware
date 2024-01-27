import { Meteor } from 'meteor/meteor';
import { UseAuthContext } from '../../client/context/AuthContext';
import { useState } from 'react';

const fetchData = () => {
  const { user } = UseAuthContext();
  const [data, setData] = useState();

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

  return { getUserDate, data };
};

export default fetchData;
