import { Meteor } from 'meteor/meteor';
import {
  TransactionCollection,
  UsersCollection,
} from '/imports/api/collections';

Meteor.methods({
  'transactions.postTransaction': function ({
    amount,
    borrowerId,
    borrowerInfo,
    interestRate,
    lenderId,
    lenderInfo,
    loanStatus,
    repayStatus,
  }) {
    const transaction = TransactionCollection.insert({
      amount,
      borrowerId,
      borrowerInfo,
      interestRate,
      lenderId,
      lenderInfo,
      loanStatus,
      repayStatus,
    });

    this.setUserId(transaction);

    return transaction;
  },

  'transactions.getAll': function () {
    const transactions = TransactionCollection.find().fetch();

    if (transactions) {
      return transactions;
    } else {
      throw new Meteor.Error('error', 'Invalid User');
    }
  },

  'transactions.getPending': function ({ id }) {
    const transactions = TransactionCollection.find({
      $or: [{ borrowerId: id }, { lenderId: id }],
    }).fetch();

    if (transactions) {
      return transactions;
    } else {
      throw new Meteor.Error('error', 'Invalid User');
    }
  },

  'transactions.updateLoan': function ({ id, status }) {
    const user = TransactionCollection.findOne({ _id: id });
    if (!user) {
      throw new Meteor.Error('user-not-found', 'Transaction not found.');
    }

    TransactionCollection.update(
      { _id: id },
      {
        $set: {
          loanStatus: status,
          repayStatus: 'pending',
        },
      }
    );
  },

  'transactions.updateRepay': function ({ id, status }) {
    const user = TransactionCollection.findOne({ _id: id });
    if (!user) {
      throw new Meteor.Error('user-not-found', 'Transaction not found.');
    }

    TransactionCollection.update(
      { _id: id },
      {
        $set: {
          repayStatus: status,
        },
      }
    );
  },
});
