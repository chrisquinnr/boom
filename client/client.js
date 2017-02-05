import { Meteor } from 'meteor/meteor';
import {
  Boom,
  Stats
} from '/common/collections';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';

let gif = new ReactiveVar();
let url = new ReactiveVar();

Template.welcome.events({
  'click .create': ( event ) => {
    FlowRouter.go('/creator')
  }
});

Template.welcome.events({
  'click .gocreate': () => {
    FlowRouter.go('/creator');
  }
});

Template.joined.onCreated(function() {
  let self = this;
  self.autorun( function() {
    self.subscribe('boom');
  });
});

Template.joined.helpers({
  gif: function() {
    return Boom.findOne({ _id:FlowRouter.getQueryParam("id"), active: true });
  }
});

Template.joined.onRendered( () => {
  let id = localStorage.getItem('myBoomID');
  if(!id){
    Meteor.call('newSub', FlowRouter.getQueryParam("id"), (err, resp)=>{
      if(!err){
        if(resp) localStorage.setItem('myBoomID', resp);
      }
    });
  } else {
    Meteor.call('oldSub', FlowRouter.getQueryParam("id"), id);
  }
});

Template.creator.events({
  'click #boom': ( event ) => {
    Meteor.call('setGif', true);
  },
  'click #reset': ( event ) => {
    Meteor.call('setGif', false);
  },
  'click .loadGif': ( event ) => {
    gif.set(event.currentTarget.id);
    let path = "http://chris.gw:5050/?id=" + gif.get();
    url.set(path);
    FlowRouter.go('/stager')
  }
});

Template.creator.helpers({
  uploads: () => {
    return Boom.find({}).fetch();
  },
  gifUp: () => {
    return gif.get();
  },
  getStatus: () => {
    let st = Stats.find({}).fetch();
    return st.length;
  }
});

Template.creator.onCreated(function() {
  let self = this;
  self.autorun( function() {
    self.subscribe('boom');
  });
});

Template.stager.helpers({
  getURL: () => {
    return url.get();
  }
});

Template.stager.events({
  'click .boom': ( event ) => {
    Meteor.call('setGif', gif.get());
  },
  'click .close': ( event ) => {
    if (gif.get()) {
      Meteor.call('closeGif', gif.get());
    } else {
      FlowRouter.go('/creator')
    }
  },
  'click .back': ( event ) => {
    FlowRouter.go('/creator')
  }
});

Template.stager.onCreated( function() {
  let self = this;
  self.autorun( function() {
    self.subscribe('boom');
    self.subscribe('stats');
  });
});
