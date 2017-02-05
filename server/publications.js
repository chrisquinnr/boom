import { Meteor } from 'meteor/meteor';
import { Boom, Stats } from '/common/collections';

Meteor.publish('stats', (boomID) => {
  return Stats.find({ boomID: boomID });
});
Meteor.publish('boom', ()=> {
  return Boom.find({});
});
