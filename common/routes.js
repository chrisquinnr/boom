import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  action: function(params, queryParams) {
    if(queryParams.id){
      BlazeLayout.render('layout', {content: 'joined'});
    } else {
      BlazeLayout.render('layout', {content: 'welcome'});
    }
  },
  subscriptions: function(params, queryParams) {
  },
});


FlowRouter.route('/creator', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {content: 'creator'});
  },
  subscriptions: function(params, queryParams) {
  },
});

FlowRouter.route('/stager', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {content: 'stager'});
  },
  subscriptions: function(params, queryParams) {
  },
});
