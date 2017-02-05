import { Mongo } from 'meteor/mongo';

export let Boom = new Mongo.Collection('boom');
export let Stats = new Mongo.Collection('stats');
export let Subs = new Mongo.Collection('subs');
