import { Meteor } from 'meteor/meteor';
import { TransactionCollection } from '/imports/api/collections';

Meteor.methods({
  'transactions.postTransaction': function ({
    borrowerId,
    lenderId,
    amount,
    interestRate,
    loanStatus,
    repayStatus,
  }) {
    const transaction = TransactionCollection.insert({
      borrowerId,
      lenderId,
      amount,
      interestRate,
      loanStatus,
      repayStatus,
    });

    this.setUserId(transaction);

    return transaction;
  },
});
