import { Meteor } from 'meteor/meteor';
import {
  UsersCollection,
  TransactionCollection,
} from '/imports/api/collections';

import './userMethods';
import './transactionMethods';

Meteor.startup(async () => {
  Meteor.publish('users', function () {
    return UsersCollection.find();
  });

  Meteor.publish('transactions', function () {
    return TransactionCollection.find();
  });
});
