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

  const postTransaction = (data) => {
    if (user) {
      // console.log(data);
      Meteor.call(
        'transactions.postTransaction',
        {
          amount: data.amount,
          borrowerId: data.borrowerId,
          borrowerInfo: data.borrowerInfo,
          interestRate: data.interestRate,
          lenderId: data.lenderId,
          lenderInfo: data.lenderInfo,
          loanStatus: data.loanStatus,
          repayStatus: data.repayStatus,
        },
        (err, res) => {
          if (err) {
            alert(err.reason || 'Error sending data.');
          } else {
            console.log('Updated succesfully');
          }
        }
      );
    }
  };

  return { postPersonalInfo, postLendingInfo, postTransaction };
};

export default postData;
