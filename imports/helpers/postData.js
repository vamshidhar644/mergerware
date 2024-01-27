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
            alert(error.reason || 'Error Fetching user data.');
          } else {
            console.log('Updated succesfully');
          }
        }
      );
    }
  };

  return { postPersonalInfo };
};

export default postData;
