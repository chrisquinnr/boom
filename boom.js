if (Meteor.isClient) {
  Template.boom.helpers({
    gif: function () {
      return Boom.find().fetch();
    },
    first: function(){
      var id = Session.get('id');
      if(!id){
        Session.set('id', Random.id());
      }
      return ReactiveMethod.call('getFirst', Session.get('id'));
    }
  });

  Template.boom.events({
    'click #boom': function () {
      Meteor.call('setGif', true);
    },
    'click #reset': function () {
      Meteor.call('setGif', false);
    }
  });
}

Boom = new Meteor.Collection('boom');
First = new Meteor.Collection('track');

if (Meteor.isServer) {
  Meteor.startup(function () {
    Boom.remove({});
    First.remove({});
  });
  Meteor.methods({
    setGif:function(gif){
      Boom.remove({});
      if(gif){
        return Boom.insert({gifpath: '/giphy.gif'})
      }
    },
    getFirst:function(marker){

      var check = First.find({}).count();
      if(check < 1){
        return First.insert({_id:marker});
      } else {
        return false;
      }
    }
  });
}
