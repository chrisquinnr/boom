if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Template.boom.helpers({
    gif: function () {
      return Boom.find().fetch();
    }
  });

  Template.boom.events({
    'click #boom': function () {
      Meteor.call('setGif', true);
    },
    'click #reset': function () {
      Session.set('trigger', true);
      Meteor.call('setGif', false);
    }
  });
}

Boom = new Meteor.Collection('boom');

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Boom.remove({});
  });
  Meteor.methods({
    setGif:function(gif){
      Boom.remove({});
      if(gif){
        return Boom.insert({gifpath: '/giphy.gif'})
      }
    }
  })
}
