import { Meteor } from 'meteor/meteor';
import { UseAuthContext } from '../../client/context/AuthContext';

const postData = () => {
  const { user } = UseAuthContext();

  const postPersonalInfo = ({ personalInfo }) => {
    if (user) {
      Meteor.call(
        'users.personalInfo',
        { id: user, personalInfo: personalInfo },
        (error, result) => {
          if (error) {
            alert(error.reason || 'Error sending data.');
          } else {
            console.log('Updated succesfully');
          }
        }
      );
    }
  };

  const postLendingInfo = ({ lendingInfo }) => {
    if (user) {
      Meteor.call(
        'users.lendingInfo',
        { id: user, lendingInfo: lendingInfo },
        (error, result) => {
          if (error) {
            alert(error.reason || 'Error sending data.');
          } else {
            console.log('Updated succesfully');
          }
        }
      );
    }
  };

  return { postPersonalInfo, postLendingInfo };
};

export default postData;
