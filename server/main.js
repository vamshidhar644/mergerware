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
    const user = UsersCollection.findOne({ email, password });

    if (user) {
      return user._id;
    } else {
      throw new Meteor.Error(
        'authentication-failed',
        'Invalid email or password'
      );
    }
  },

  'users.getUserData': function ({ id }) {
    const user = UsersCollection.findOne({ _id: id });

    if (user) {
      return user;
    } else {
      throw new Meteor.Error('error', 'Invalid User');
    }
  },

  'users.personalInfo': function ({ id, personalInfo }) {
    const user = UsersCollection.findOne({ _id: id });
    if (!user) {
      throw new Meteor.Error('user-not-found', 'User not found.');
    }

    UsersCollection.update(
      { _id: id },
      {
        $set: {
          personalInfo: personalInfo,
        },
      }
    );
  },

  'users.lendingInfo': function ({ id, lendingInfo }) {
    const user = UsersCollection.findOne({ _id: id });
    if (!user) {
      throw new Meteor.Error('user-not-found', 'User not found.');
    }

    UsersCollection.update(
      { _id: id },
      {
        $set: {
          lenderInfo: lendingInfo,
        },
      }
    );
  },

  'users.getLendersData': function () {
    const lenders = UsersCollection.find({
      role: 'lender',
      $and: [
        { personalInfo: { $exists: true } },
        { lenderInfo: { $exists: true } },
      ],
    }).fetch();

    if (lenders) {
      return lenders;
    } else {
      throw new Meteor.Error('error', 'Invalid User');
    }
  },
});

Meteor.startup(async () => {
  Meteor.publish('users', function () {
    return UsersCollection.find();
  });
});
