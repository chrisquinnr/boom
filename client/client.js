import {Boom} from '../common/collections'

Template.home.helpers({
    gif: function () {
      let b = Boom.findOne({active:true});
      console.log(b);
      return b;
    },
    first: function(){
      var id = Session.get('id');
      if(!id){
        Session.set('id', Random.id());
      }
      return ReactiveMethod.call('getFirst', Session.get('id'));
    },
  create:()=>{
    if(FlowRouter.getRouteName() === 'creater'){
      return true;
    }
  }
  });

Template.creater.events({
   'click #boom': function () {
     Meteor.call('setGif', true);
   },
   'click #reset': function () {
     Meteor.call('setGif', false);
   },
  'click .loadGif':(e)=>{
    Session.set('loadGif', e.currentTarget.id);
    FlowRouter.go('/stager')
  }
 });

Template.creater.helpers({
  uploads:()=>{
   return Boom.find({}).fetch();
  }
});

Template.stager.helpers({
});

Template.stager.events({
   'click .boom':(e)=>{
     //Session.set('loadGif', e.currentTarget.id);
     Meteor.call('setGif', Session.get('loadGif'));

   },
   'click .close':(e)=>{
     //Session.set('loadGif', e.currentTarget.id);

     Meteor.call('closeGif', Session.get('loadGif'));

   }
});