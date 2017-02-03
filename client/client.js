import { Boom } from '../common/collections';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.home.helpers({

  create: () => {
    if (FlowRouter.getRouteName() === 'creator') {
      return true;
    }
  }
});

Template.welcome.events({
  'click .gocreate':()=>{
    FlowRouter.go('/creator');
  }
});

Template.home.events({
  'click .create': ( event ) => {
    FlowRouter.go('/creator')
  }
});

Template.boring.helpers({
  gif: function() {
    return Boom.findOne({ _id:FlowRouter.getQueryParam("id"), active: true });
  },
})

Template.boring.onRendered(()=>{
  console.log(FlowRouter.getQueryParam("id"));
});

Template.creater.events({
  'click #boom': ( event ) => {
    Meteor.call('setGif', true);
  },
  'click #reset': ( event ) => {
    Meteor.call('setGif', false);
  },
  'click .loadGif': ( event ) => {
    Session.set('loadGif', event.currentTarget.id);
    let url = "http://chris.gw:5050/?id=" + event.currentTarget.id;
    Session.set('url', url);
    FlowRouter.go('/stager')
  }
});

Template.creater.helpers({
  uploads: () => {
    return Boom.find({}).fetch();
  }
});

Template.stager.helpers({
  getURL:()=>{
    return Session.get('url');
  }
});

Template.stager.events({
  'click .boom': ( event ) => {
    Meteor.call('setGif', Session.get('loadGif'));
  },
  'click .close': ( event ) => {
    if (Session.get('loadGif')) {
      Meteor.call('closeGif', Session.get('loadGif'));
    } else {
      FlowRouter.go('/creator')
    }
  },
  'click .back': ( event ) => {
    FlowRouter.go('/creator')
  }
});