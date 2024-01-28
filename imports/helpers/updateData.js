import { Meteor } from 'meteor/meteor';
import { UseAuthContext } from '../../client/context/AuthContext';

const updateData = () => {
  const { user } = UseAuthContext();

  const updateLoanStatus = ({ id, status }) => {
    if (user) {
      // console.log()
      Meteor.call(
        'transactions.updateLoan',
        { id: id, status: status },
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

  const updateRepayStatus = ({ id, status }) => {
    if (user) {
      // console.log()
      Meteor.call(
        'transactions.updateRepay',
        { id: id, status: status },
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

  return { updateLoanStatus, updateRepayStatus };
};

export default updateData;
