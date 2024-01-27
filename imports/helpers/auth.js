import { Meteor } from 'meteor/meteor';
import { UseAuthContext } from '../../client/context/AuthContext';

const CallMethods = () => {
  const { dispatch } = UseAuthContext();

  const register = ({ email, password, role }) => {
    if ((email, password, role)) {
      Meteor.call(
        'users.register',
        { email, password, role },
        (error, result) => {
          if (error) {
            alert(error.reason || 'Error registering user.');
          } else {
            localStorage.setItem('user', JSON.stringify(result));

            // update the auth context
            dispatch({ type: 'LOGIN', payload: result });
          }
        }
      );
    }
  };

  const login = ({ email, password, role }) => {
    if ((email, password)) {
      Meteor.call('users.login', { email, password }, (error, result) => {
        if (error) {
          alert(error.reason || 'Error Logging user.');
        } else {
          localStorage.setItem('user', JSON.stringify(result));

          // update the auth context
          dispatch({ type: 'LOGIN', payload: result });
        }
      });
    }
  };
  return { register, login };
};

export default CallMethods;
