import { Meteor } from 'meteor/meteor';
import { UsersCollection } from '/imports/api/users';

Meteor.methods({
  'users.register': function ({ email, password, role }) {
    if (UsersCollection.findOne({ email })) {
      throw new Meteor.Error('email-exists', 'Email already exists');
    }

    const userId = UsersCollection.insert({ email, password, role });

    this.setUserId(userId);

    return userId;
  },

  'users.login': function ({ email, password }) {
    // Find the user with the provided email and password in the UsersCollection
    const user = UsersCollection.findOne({ email, password });

    if (user) {
      return user._id;
    } else {
      // If the user is not found, return an error message
      throw new Meteor.Error(
        'authentication-failed',
        'Invalid email or password'
      );
    }
  },

  'users.getUserData': function ({ id }) {
    // Find the user with the provided email and password in the UsersCollection
    const user = UsersCollection.findOne({ _id: id });

    if (user) {
      return user;
    } else {
      // If the user is not found, return an error message
      throw new Meteor.Error('error', 'Invalid User');
    }
  },

  'users.personalInfo': function ({ id, personalInfo }) {
    // Check if the user with the given id exists
    const user = UsersCollection.findOne({ _id: id });
    if (!user) {
      throw new Meteor.Error('user-not-found', 'User not found.');
    }

    // Update the personalInfo in the UsersCollection

    // console.log(personalInfo);
    UsersCollection.update(
      { _id: id },
      {
        $set: {
          personalInfo: personalInfo,
        },
      }
    );
  },
});

Meteor.startup(async () => {
  Meteor.publish('users', function () {
    return UsersCollection.find();
  });
});
