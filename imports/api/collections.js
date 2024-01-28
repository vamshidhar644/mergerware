import { Mongo } from 'meteor/mongo';

export const UsersCollection = new Mongo.Collection('user');

export const TransactionCollection = new Mongo.Collection('transactions');
